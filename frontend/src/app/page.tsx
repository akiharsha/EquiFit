"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Brain, 
  Target, 
  Zap, 
  Users, 
  TrendingUp, 
  Shield, 
  ArrowRight, 
  Star,
  Play,
  Menu,
  X
} from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "PM Intern at Ministry of Education",
      content: "EquiFit matched me with the perfect PM Internship Scheme opportunity. The AI understood my skills and career goals better than I did!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Arjun Singh",
      role: "PM Intern at Ministry of Health",
      content: "The personalized recommendations saved me weeks of research. I found my dream government internship in just 3 days.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Kavya Reddy",
      role: "PM Intern at Ministry of Finance",
      content: "EquiFit's matching algorithm is incredible. It considers factors I never thought about. Highly recommended for young Indians!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Advanced machine learning algorithms analyze your profile and match you with the most suitable PM Internship Scheme opportunities across various ministries."
    },
    {
      icon: Target,
      title: "Government Focused",
      description: "Get matched with internships in Indian ministries, departments, and government organizations based on your skills and interests."
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Receive personalized recommendations in seconds, not weeks of manual searching through government portals."
    },
    {
      icon: Users,
      title: "Mentorship Network",
      description: "Connect with successful PM interns and government professionals for guidance and career insights."
    },
    {
      icon: TrendingUp,
      title: "Career Development",
      description: "Track your progress and get recommendations for skill development in public service and governance."
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Your data is protected with government-grade security and privacy controls, ensuring compliance with Indian regulations."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Government Header */}
      <div className="govt-header py-2 text-center text-sm font-semibold">
        <div className="max-w-7xl mx-auto px-4">
          <p>भारत सरकार | Government of India | भारत सरकार</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-lg border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-4"
              >
                {/* Leadership Photos */}
                <div className="flex items-center space-x-2">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReUmykd7By9cgPvoFEjoMjXoQFIx70Uz3sKw&s"
                    alt="PM Modi"
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-orange-300 object-cover"
                  />
                  <Image
                    src="https://data.indianexpress.com/election2019/about/images/politician/nirmala-sitharaman.jpg?w=330"
                    alt="Minister Sitharaman"
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-orange-300 object-cover"
                  />
                </div>
                
                {/* Government of India Logo */}
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
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {["Features", "How it Works", "Testimonials", "About"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <button className="text-gray-700 hover:text-orange-600 px-4 py-2 rounded text-sm font-medium transition-colors duration-200 border border-gray-300">
                  Login
                </button>
                <button className="govt-button">
                  Register Now
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-orange-600 p-2 rounded-lg transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white border-t border-gray-200 shadow-lg"
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {["Features", "How it Works", "Testimonials", "About"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-700 hover:text-orange-600 hover:bg-orange-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-4 pb-2 border-t border-gray-200 space-y-3">
                  <button className="text-gray-700 hover:text-orange-600 hover:bg-orange-50 block px-4 py-3 rounded-lg text-base font-medium w-full text-left transition-all duration-200">
                    Login
                  </button>
                  <button className="govt-button w-full justify-center">
                    Register Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-white to-green-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 to-green-100/20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        {/* Hero Background Image */}
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/hero-bg.svg"
            alt="Government internship background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="mb-6">
                <span className="text-display govt-orange">Prime Minister</span>
                <br />
                <span className="text-display govt-green">Internship Scheme</span>
              </div>
              <div className="text-hero text-gray-800 mb-6">PMIS Portal</div>
              <p className="text-body-large text-gray-700 max-w-4xl mx-auto">
                Empowering young Indians (21-24 years) with government internship opportunities across ministries and partner organizations. 
                Find your perfect match with our AI-powered recommendation system.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <button className="govt-button flex items-center space-x-3 text-lg font-semibold">
                <span>Find Internships</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="govt-button-secondary flex items-center space-x-3 text-lg font-semibold">
                <Play className="w-5 h-5" />
                <span>Watch Tutorial</span>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {[
                { number: "5K+", label: "Successful Matches" },
                { number: "50+", label: "Government Ministries" },
                { number: "98%", label: "Success Rate" }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-3">
                    {stat.number}
                  </div>
                  <div className="text-gray-800 text-base md:text-lg font-semibold">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Government Leadership Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Leadership & <span className="govt-orange">Vision</span>
            </h2>
            <p className="text-body-large text-gray-700 max-w-3xl mx-auto">
              Under the visionary leadership of our Prime Minister and dedicated ministers, the PM Internship Scheme is transforming young India's future.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* PM Modi */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative mb-6">
                <Image
                  src="https://www.thestatesman.com/wp-content/uploads/2022/09/03_Merged.jpg"
                  alt="Prime Minister Narendra Modi"
                  width={300}
                  height={400}
                  className="rounded-2xl shadow-2xl mx-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Shri Narendra Modi</h3>
              <p className="text-lg govt-orange font-semibold mb-3">Prime Minister of India</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                "The PM Internship Scheme will empower our youth with practical experience and bridge the gap between education and employment."
              </p>
            </motion.div>

            {/* Nirmala Sitharaman */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative mb-6">
                <Image
                  src="https://data.indianexpress.com/election2019/about/images/politician/nirmala-sitharaman.jpg?w=330"
                  alt="Minister Nirmala Sitharaman"
                  width={300}
                  height={400}
                  className="rounded-2xl shadow-2xl mx-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Smt. Nirmala Sitharaman</h3>
              <p className="text-lg govt-orange font-semibold mb-3">Minister of Corporate Affairs</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                "This initiative will create meaningful opportunities for young Indians to contribute to nation-building through corporate partnerships."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-hero mb-6">
              Why Choose <span className="govt-orange">PMIS Portal</span>?
            </h2>
            <p className="text-body-large text-gray-700 max-w-3xl mx-auto">
              Our advanced AI technology revolutionizes how young Indians (21-24) find and apply for Prime Minister Internship Scheme opportunities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="govt-card p-8 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-body">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Features Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center"
          >
            <div className="relative">
              <Image
                src="/internship-illustration.svg"
                alt="AI-powered internship matching illustration"
                width={400}
                height={300}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-hero mb-6">
              Success Stories from <span className="govt-orange">PM Interns</span>
            </h2>
            <p className="text-body-large text-gray-700 max-w-3xl mx-auto">
              Join thousands of successful PM Internship Scheme participants who found their dream government opportunities with PMIS Portal.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Testimonial Content */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="govt-card p-8 text-center"
                >
                  <div className="flex justify-center mb-6">
                    <Image
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                      width={80}
                      height={80}
                      className="rounded-full border-4 border-orange-200 shadow-lg"
                    />
                  </div>
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-2xl text-gray-800 mb-6 italic font-medium">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  <div className="text-gray-900 font-semibold text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-700 font-medium">
                    {testimonials[currentTestimonial].role}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Success Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <Image
                src="/student-success.svg"
                alt="Student success stories"
                width={400}
                height={300}
                className="rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentTestimonial
                    ? "bg-orange-500 scale-125"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-500 via-orange-400 to-green-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/95 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-white/20"
          >
            <h2 className="text-hero mb-6">
              Ready to Find Your <span className="govt-orange">Dream Government Internship</span>?
            </h2>
            <p className="text-body-large text-gray-800 mb-8 max-w-2xl mx-auto">
              Join thousands of young Indians (21-24) who have already found their perfect PM Internship Scheme match. 
              Start your journey in public service today with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="govt-button flex items-center justify-center space-x-3 text-lg font-semibold">
                <span>Register Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="govt-button-secondary flex items-center justify-center space-x-3 text-lg font-semibold">
                <Play className="w-5 h-5" />
                <span>Watch Tutorial</span>
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Completely Free • Government of India Initiative
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          {/* Government Logos Section */}
          <div className="text-center mb-12">
            <h3 className="text-white font-bold text-2xl mb-8">Supported By</h3>
            <div className="relative">
              <div className="flex space-x-12 justify-center items-center">
                {/* Government of India Logo */}
                <motion.div 
                  className="govt-card p-4 text-center min-w-[220px]"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <Image
                      src="https://www.logopeople.in/wp-content/uploads/2013/01/government-of-india.jpg"
                      alt="Government of India"
                      width={128}
                      height={128}
                      className="rounded-lg object-cover shadow-lg w-full h-full"
                    />
                  </div>
                  <div className="govt-orange font-bold text-lg">Government of India</div>
                  <div className="text-sm text-gray-600 mt-1">भारत सरकार</div>
                </motion.div>
                
                {/* Ministry of Corporate Affairs */}
                <motion.div 
                  className="govt-card p-4 text-center min-w-[220px]"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <Image
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh5L2DDPRjDDvINVM6ew3VxMDuuWH5tbQFUg&s"
                      alt="Ministry of Corporate Affairs"
                      width={128}
                      height={128}
                      className="rounded-lg object-cover shadow-lg w-full h-full"
                    />
                  </div>
                  <div className="govt-blue font-bold text-lg">Ministry of Corporate Affairs</div>
                  <div className="text-sm text-gray-600 mt-1">कॉर्पोरेट मामलों का मंत्रालय</div>
                </motion.div>
                
                {/* Ministry of Education */}
                <motion.div 
                  className="govt-card p-4 text-center min-w-[220px]"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <Image
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOt403MMOY5_HqAVYiPtFyS1WMNOHMfPGsAw&s"
                      alt="Ministry of Education"
                      width={128}
                      height={128}
                      className="rounded-lg object-cover shadow-lg w-full h-full"
                    />
                  </div>
                  <div className="govt-green font-bold text-lg">Ministry of Education</div>
                  <div className="text-sm text-gray-600 mt-1">शिक्षा मंत्रालय</div>
                </motion.div>
              </div>
            </div>
          </div>
            
          {/* Partner Organizations */}
          <div className="text-center">
            <h4 className="text-white font-bold text-2xl mb-8">Partner Organizations</h4>
            <div className="relative">
              <div className="flex space-x-6 justify-center items-center">
                <motion.div 
                  className="govt-card p-2 text-center min-w-[120px]"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-24 h-24 mx-auto rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB-husM1oA3cOwI6k-cBof2c24GjBN-RCqYQ&s"
                      alt="TATA Group"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="govt-card p-2 text-center min-w-[120px]"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-24 h-24 mx-auto rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://logodownload.org/wp-content/uploads/2019/10/reliance-industries-logo-0.png"
                      alt="Reliance"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="govt-card p-2 text-center min-w-[120px]"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-24 h-24 mx-auto rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://yt3.googleusercontent.com/obmBJEJqGwun7LiiHiX05azK5HJb5-TNY6tHFiJx5Me6JiSjoXlOwXyQ4z7HcphGJ8bl4laUgg=s900-c-k-c0x00ffffff-no-rj"
                      alt="Infosys"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="govt-card p-2 text-center min-w-[120px]"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-24 h-24 mx-auto rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgAzJ8PVMKYq7x49VHD9djSINOeh5X2AaNgg&s"
                      alt="TCS"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="govt-card p-2 text-center min-w-[120px]"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-24 h-24 mx-auto rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIFzptQOZyaIEhi15BkLR1IayO9l8eueIulA&s"
                      alt="Wipro"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="govt-card p-2 text-center min-w-[120px]"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-24 h-24 mx-auto rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://www.pngfind.com/pngs/m/682-6828059_axis-bank-png-logo-download-axis-mutual-fund.png"
                      alt="Axis Bank"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-gray-900 text-white py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xl font-bold text-white">PMIS Portal</span>
              </div>
              <p className="text-white mb-4 max-w-md">
                Official platform connecting young Indians (21-24) with Prime Minister Internship Scheme opportunities across government ministries and partner organizations.
              </p>
              <div className="flex space-x-4">
                {["Twitter", "LinkedIn", "YouTube"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-white hover:text-orange-300 transition-colors duration-200"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {["Internship Matching", "Career Guidance", "Mentorship", "Skill Development"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white hover:text-orange-300 transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {["Help Center", "Contact Us", "FAQ", "Guidelines"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white hover:text-orange-300 transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white">
            <p>&copy; 2025 PMIS Portal. All rights reserved. | Government of India Initiative</p>
          </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
