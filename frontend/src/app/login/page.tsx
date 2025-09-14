"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Phone, 
  Lock, 
  User, 
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Mobile validation
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (isSignUp) {
      // Full name validation for sign up
      if (!formData.fullName) {
        newErrors.fullName = "Full name is required";
      }

      // Confirm password validation
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      // Terms agreement validation
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = "You must agree to the terms and conditions";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log(isSignUp ? "Sign up data:" : "Sign in data:", formData);
      // Here you would typically make an API call to your backend
      alert(isSignUp ? "Account created successfully! Redirecting to application form..." : "Signed in successfully! Redirecting to application form...");
      
      // Redirect to application form after successful login/signup
      window.location.href = "/application";
    }, 2000);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      agreeToTerms: false
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 to-green-100/20"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      {/* Government Header */}
      <div className="govt-header py-2 text-center text-sm font-semibold relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <p>भारत सरकार | Government of India | भारत सरकार</p>
        </div>
      </div>

      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-lg border-b-4 border-orange-500 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-4">
              <ArrowLeft className="w-6 h-6 text-gray-600 hover:text-orange-600 transition-colors" />
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white rounded-full border-4 border-orange-500 flex items-center justify-center p-2">
                  <Image
                    src="https://www.logopeople.in/wp-content/uploads/2013/01/government-of-india.jpg"
                    alt="Government of India"
                    width={48}
                    height={48}
                    className="rounded-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold govt-orange">PMIS Portal</div>
                  <div className="text-sm text-gray-600">Prime Minister Internship Scheme</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)] px-4 py-12 relative z-10">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <Shield className="w-10 h-10 text-white" />
              </motion.div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={isSignUp ? "signup" : "signin"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {isSignUp ? "Create Account" : "Welcome Back"}
                  </h2>
                  <p className="text-gray-600">
                    {isSignUp 
                      ? "Join the Prime Minister Internship Scheme" 
                      : "Sign in to your PMIS Portal account"
                    }
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isSignUp ? "signup-form" : "signin-form"}
                  initial={{ opacity: 0, x: isSignUp ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isSignUp ? -20 : 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Full Name - Sign Up Only */}
                  {isSignUp && (
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                            errors.fullName ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your email address"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <div className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                        +91
                      </div>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className={`w-full pl-20 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                          errors.mobile ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter 10-digit mobile number"
                        maxLength={10}
                      />
                    </div>
                    {errors.mobile && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.mobile}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password - Sign Up Only */}
                  {isSignUp && (
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                            errors.confirmPassword ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Terms Agreement - Sign Up Only */}
                  {isSignUp && (
                    <div>
                      <label className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleInputChange}
                          className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">
                          I agree to the{" "}
                          <Link href="/terms" className="text-orange-600 hover:text-orange-700 underline">
                            Terms and Conditions
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-orange-600 hover:text-orange-700 underline">
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                      {errors.agreeToTerms && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.agreeToTerms}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full govt-button flex items-center justify-center space-x-2 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                  </>
                )}
              </motion.button>

              {/* Forgot Password - Sign In Only */}
              {!isSignUp && (
                <div className="text-center">
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-orange-600 hover:text-orange-700 underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              )}
            </form>

            {/* Toggle Mode */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
              </p>
              <button
                type="button"
                onClick={toggleMode}
                className="mt-2 text-orange-600 hover:text-orange-700 font-semibold underline"
              >
                {isSignUp ? "Sign In" : "Create Account"}
              </button>
            </div>

            {/* Government Notice */}
            <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-xl">
              <p className="text-xs text-gray-600 text-center">
                This is an official Government of India portal. Your data is protected with government-grade security.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
