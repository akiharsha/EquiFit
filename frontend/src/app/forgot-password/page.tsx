"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Mail, 
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertCircle,
  Key,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const validateEmail = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const newErrors: Record<string, string> = {};
    
    if (!otp) {
      newErrors.otp = "OTP is required";
    } else if (otp.length !== 6) {
      newErrors.otp = "OTP must be 6 digits";
    } else if (!/^\d+$/.test(otp)) {
      newErrors.otp = "OTP must contain only numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors: Record<string, string> = {};
    
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateEmail()) return;

    setIsLoading(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setOtpTimer(300); // 5 minutes timer
      
      // Start countdown timer
      const timer = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 2000);
  };

  const handleVerifyOtp = async () => {
    if (!validateOtp()) return;

    setIsLoading(true);
    
    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsLoading(false);
      if (otp === "123456") { // Mock OTP for demo
        setStep('reset');
      } else {
        setErrors({ otp: "Invalid OTP. Please try again." });
      }
    }, 1500);
  };

  const handleResetPassword = async () => {
    if (!validatePassword()) return;

    setIsLoading(true);
    
    // Simulate API call to reset password
    setTimeout(() => {
      setIsLoading(false);
      alert("Password reset successfully! Redirecting to login page...");
      window.location.href = "/login";
    }, 2000);
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setErrors({});
    
    // Simulate API call to resend OTP
    setTimeout(() => {
      setIsLoading(false);
      setOtpTimer(300); // Reset timer
      alert("OTP sent successfully to your email!");
      
      // Start countdown timer
      const timer = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
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
            <Link href="/login" className="flex items-center space-x-4">
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
                {step === 'email' && <Mail className="w-10 h-10 text-white" />}
                {step === 'otp' && <Key className="w-10 h-10 text-white" />}
                {step === 'reset' && <Lock className="w-10 h-10 text-white" />}
              </motion.div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {step === 'email' && "Forgot Password?"}
                    {step === 'otp' && "Verify OTP"}
                    {step === 'reset' && "Reset Password"}
                  </h2>
                  <p className="text-gray-600">
                    {step === 'email' && "Enter your email address to receive a reset code"}
                    {step === 'otp' && "Enter the 6-digit code sent to your email"}
                    {step === 'reset' && "Create a new secure password"}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {step === 'email' && (
                <motion.div
                  key="email-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          clearError('email');
                        }}
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your registered email address"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full govt-button flex items-center justify-center space-x-2 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        <span>Send Reset Code</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}

              {step === 'otp' && (
                <motion.div
                  key="otp-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600">
                      Code sent to: <span className="font-semibold text-gray-900">{email}</span>
                    </p>
                  </div>

                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                      Enter 6-digit OTP *
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                          setOtp(value);
                          clearError('otp');
                        }}
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-center text-2xl tracking-widest ${
                          errors.otp ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="000000"
                        maxLength={6}
                      />
                    </div>
                    {errors.otp && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.otp}
                      </p>
                    )}
                  </div>

                  {otpTimer > 0 && (
                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        Code expires in: <span className="font-semibold text-orange-600">{formatTime(otpTimer)}</span>
                      </p>
                    </div>
                  )}

                  <motion.button
                    type="button"
                    onClick={handleVerifyOtp}
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
                        <span>Verify Code</span>
                      </>
                    )}
                  </motion.button>

                  {otpTimer === 0 && (
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isLoading}
                        className="text-sm text-orange-600 hover:text-orange-700 underline disabled:opacity-50"
                      >
                        Resend OTP
                      </button>
                    </div>
                  )}

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setStep('email')}
                      className="text-sm text-gray-600 hover:text-gray-700 underline"
                    >
                      Change email address
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'reset' && (
                <motion.div
                  key="reset-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      New Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          clearError('newPassword');
                        }}
                        className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                          errors.newPassword ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.newPassword}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          clearError('confirmPassword');
                        }}
                        className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                          errors.confirmPassword ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Confirm new password"
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

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Password Requirements:</h4>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Include uppercase and lowercase letters</li>
                      <li>• Include at least one number</li>
                      <li>• Include at least one special character</li>
                    </ul>
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleResetPassword}
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
                        <span>Reset Password</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Back to Login */}
            <div className="mt-8 text-center">
              <Link 
                href="/login" 
                className="text-sm text-orange-600 hover:text-orange-700 underline flex items-center justify-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Login</span>
              </Link>
            </div>

            {/* Government Notice */}
            <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-xl">
              <p className="text-xs text-gray-600 text-center">
                This is an official Government of India portal. Your data is protected with government-grade security.
              </p>
            </div>

            {/* Demo Instructions */}
            {step === 'otp' && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-xs text-blue-700 text-center">
                  <strong>Demo:</strong> Use OTP "123456" to proceed to password reset
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
