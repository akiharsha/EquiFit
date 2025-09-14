"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  User, Calendar, GraduationCap, Building, IndianRupee, FileText, 
  MapPin, Briefcase, Search, CheckCircle, AlertCircle, ArrowLeft, 
  ArrowRight, X, Plus, Trash2, Info, HelpCircle
} from "lucide-react";

interface FormData {
  name: string;
  gender: string;
  dateOfBirth: string;
  age: number;
  employeeOrStudent: string;
  educationLevel: string;
  fieldOfStudy: string;
  cgpaOrPercentage: string;
  institutionType: string;
  familyIncome: string;
  incomeCertificateId: string;
  familyGovtEmployment: string;
  sectorPreferences: string[];
  internshipMode: string;
  pastParticipation: string;
  previousInternshipSector: string;
  socialCategory: string;
  skills: string[];
  customSkill: string;
  aadharNumber: string;
  willingnessToRelocate: string;
  disabilityStatus: string;
  preferredIndustryType: string;
  locationPreference: string;
}

export default function ApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "", gender: "", dateOfBirth: "", age: 21, employeeOrStudent: "", educationLevel: "",
    fieldOfStudy: "", cgpaOrPercentage: "", institutionType: "", familyIncome: "",
    incomeCertificateId: "", familyGovtEmployment: "", sectorPreferences: [],
    internshipMode: "", pastParticipation: "", previousInternshipSector: "",
    socialCategory: "", skills: [], customSkill: "", aadharNumber: "", willingnessToRelocate: "",
    disabilityStatus: "", preferredIndustryType: "", locationPreference: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [skillSearchTerm, setSkillSearchTerm] = useState("");
  const [showEligibilityError, setShowEligibilityError] = useState(false);
  const [eligibilityMessage, setEligibilityMessage] = useState("");
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  const [showCustomSkillInput, setShowCustomSkillInput] = useState(false);

  const sectors = [
    "IT", "Manufacturing", "Healthcare", "Education", "Electrical", "Software",
    "Railway", "Finance", "Logistics", "E-commerce", "Automotive", "Telecom",
    "Energy", "Banking"
  ];

  const allSkills = [
    "python", "java", "sql", "git", "html", "css", "javascript", "react", "testing",
    "linux", "oop", "data structures", "algorithms", "docker", "api design", "cad",
    "cam", "lean", "six sigma", "cnc", "quality control", "supply chain", "first aid",
    "patient care", "record keeping", "lab techniques", "biostatistics", "lesson planning",
    "teaching", "content creation", "assessment", "classroom management", "pcb design",
    "embedded", "soldering", "power systems", "circuit analysis", "safety", "operations",
    "signal systems", "maintenance", "documentation", "excel", "tally", "accounting",
    "financial modeling", "gst", "audit", "inventory", "warehouse ops", "routing",
    "ms excel", "procurement", "cataloging", "customer support", "order management",
    "marketplace ops", "vehicle diagnostics", "quality checks", "assembly", "networking",
    "rf planning", "troubleshooting", "fiber splicing", "customer service", "communication",
    "teamwork", "problem solving", "time management", "presentation", "writing", "matlab",
    "autocad", "project management", "content writing", "research", "design basics",
    "market research", "lab safety", "basic life support", "data analysis", "statistics",
    "legal research", "drafting", "case analysis", "pharmacology", "qc", "gmp", "reporting",
    "figma", "adobe xd", "ui principles", "soil testing", "field work"
  ];

  const topTierUniversities = [
    "IIT Delhi", "IIT Bombay", "IIT Madras", "IIT Kanpur", "IIT Kharagpur", "IIT Roorkee",
    "IIT Guwahati", "IIT Hyderabad", "IISc Bangalore", "NIT Trichy", "NIT Warangal",
    "BITS Pilani", "Delhi University", "Jawaharlal Nehru University", "Banaras Hindu University"
  ];

  const locations = [
    "Maharashtra / Mumbai", "Maharashtra / Pune", "Karnataka / Bengaluru", "Tamil Nadu / Chennai",
    "Delhi / New Delhi", "Gujarat / Ahmedabad", "West Bengal / Kolkata", "Telangana / Hyderabad",
    "Kerala / Kochi", "Uttar Pradesh / Lucknow", "Rajasthan / Jaipur", "Madhya Pradesh / Indore",
    "Punjab / Chandigarh", "Haryana / Gurugram", "Bihar / Patna", "Odisha / Bhubaneswar"
  ];

  const totalSteps = 4;

  const convertPercentageToCGPA = (percentage: number): number => {
    return Math.round((percentage / 9.5) * 100) / 100;
  };

  const calculateAgeFromDOB = (dob: string): number => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }

    // Handle date of birth and age calculation
    if (field === "dateOfBirth" && value) {
      const age = calculateAgeFromDOB(value);
      setFormData(prev => ({ ...prev, dateOfBirth: value, age }));
      checkEligibility("age", age);
      return;
    }

    // Handle CGPA conversion without showing conversion text
    if (field === "cgpaOrPercentage" && typeof value === "string" && value.includes("%")) {
      const percentage = parseFloat(value.replace("%", ""));
      if (!isNaN(percentage)) {
        const cgpa = convertPercentageToCGPA(percentage);
        setFormData(prev => ({ ...prev, [field]: cgpa.toString() }));
        return;
      }
    }

    // Handle family income eligibility and validation
    if (field === "familyIncome" && value) {
      const income = parseInt(value);
      if (income > 800000) {
        // Don't update the form data if it exceeds the limit
        setShowEligibilityError(true);
        setEligibilityMessage("You are not eligible. Family income must be ≤ ₹8,00,000. Please read the eligibility criteria.");
        return; // Don't update the form data
      } else {
        // Clear any previous eligibility errors for family income
        setShowEligibilityError(false);
        setEligibilityMessage("");
      }
    }

    checkEligibility(field, value);
  };

  const checkEligibility = (field: string, value: any) => {
    let isEligible = true;
    let message = "";

    if (field === "age" && (value < 21 || value > 24)) {
      isEligible = false;
      message = "You are not eligible. Age must be between 21-24 years. Please check the eligibility criteria.";
    }

    if (field === "employeeOrStudent" && value === "Yes") {
      isEligible = false;
      message = "You are not eligible. Full-time employees/students are not allowed. Distance learning is accepted. Please check the eligibility criteria.";
    }

    if (field === "institutionType" && topTierUniversities.some(uni => value.includes(uni))) {
      isEligible = false;
      message = "You are not eligible. Students from top-tier universities (IIT, NIT, BITS, etc.) are not allowed. Please check the eligibility criteria.";
    }

    if (field === "familyGovtEmployment" && value === "Yes") {
      isEligible = false;
      message = "You are not eligible. Family members with permanent government employment are not allowed. Please check the eligibility criteria.";
    }

    if (!isEligible) {
      setShowEligibilityError(true);
      setEligibilityMessage(message);
    } else {
      setShowEligibilityError(false);
      setEligibilityMessage("");
    }
  };

  const addSkill = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
    setSkillSearchTerm("");
  };

  const addCustomSkill = () => {
    if (formData.customSkill.trim() && !formData.skills.includes(formData.customSkill.trim())) {
      setFormData(prev => ({ 
        ...prev, 
        skills: [...prev.skills, prev.customSkill.trim()],
        customSkill: ""
      }));
      setShowCustomSkillInput(false);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addSectorPreference = (sector: string) => {
    if (!formData.sectorPreferences.includes(sector) && formData.sectorPreferences.length < 4) {
      setFormData(prev => ({
        ...prev,
        sectorPreferences: [...prev.sectorPreferences, sector]
      }));
    }
  };

  const removeSectorPreference = (sectorToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      sectorPreferences: prev.sectorPreferences.filter(sector => sector !== sectorToRemove)
    }));
  };

  const filteredSkills = allSkills.filter(skill =>
    skill.toLowerCase().includes(skillSearchTerm.toLowerCase()) &&
    !formData.skills.includes(skill)
  );

  const validateStep = (step: number): boolean => {
    const stepErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.name) stepErrors.name = "Name is required";
        if (!formData.gender) stepErrors.gender = "Gender is required";
        if (!formData.age || formData.age < 21 || formData.age > 24) {
          stepErrors.age = "Age must be between 21-24 years";
        }
        if (!formData.employeeOrStudent) stepErrors.employeeOrStudent = "This field is required";
        break;
      case 2:
        if (!formData.educationLevel) stepErrors.educationLevel = "Education level is required";
        if (!formData.fieldOfStudy) stepErrors.fieldOfStudy = "Field of study is required";
        if (!formData.cgpaOrPercentage) stepErrors.cgpaOrPercentage = "CGPA/Percentage is required";
        if (!formData.institutionType) stepErrors.institutionType = "Institution type is required";
        if (!formData.familyIncome) stepErrors.familyIncome = "Family income is required";
        if (formData.familyIncome && parseInt(formData.familyIncome) > 800000) {
          stepErrors.familyIncome = "Family income must not exceed ₹8,00,000";
        }
        if (!formData.incomeCertificateId) stepErrors.incomeCertificateId = "Income certificate ID is required";
        if (!formData.familyGovtEmployment) stepErrors.familyGovtEmployment = "This field is required";
        break;
      case 3:
        if (formData.sectorPreferences.length === 0) stepErrors.sectorPreferences = "At least one sector preference is required";
        if (!formData.internshipMode) stepErrors.internshipMode = "Internship mode is required";
        if (!formData.pastParticipation) stepErrors.pastParticipation = "Past participation field is required";
        if (!formData.socialCategory) stepErrors.socialCategory = "Social category is required";
        if (formData.skills.length === 0) stepErrors.skills = "At least one skill is required";
        break;
      case 4:
        if (!formData.aadharNumber || formData.aadharNumber.length !== 12) {
          stepErrors.aadharNumber = "Aadhar number must be 12 digits";
        }
        if (!formData.willingnessToRelocate) stepErrors.willingnessToRelocate = "Willingness to relocate is required";
        if (!formData.disabilityStatus) stepErrors.disabilityStatus = "Disability status is required";
        if (!formData.preferredIndustryType) stepErrors.preferredIndustryType = "Preferred industry type is required";
        if (!formData.locationPreference) stepErrors.locationPreference = "Location preference is required";
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && !showEligibilityError) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep) || showEligibilityError) {
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      console.log("Application submitted:", formData);
      alert("Application submitted successfully! You will receive a confirmation email shortly.");
    }, 3000);
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
            <div className="flex justify-between items-center w-full">
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
              
              {/* Eligibility Criteria Button */}
              <button
                onClick={() => setShowEligibilityModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-xl transition-colors"
              >
                <Info className="w-5 h-5" />
                <span className="font-medium">Eligibility Criteria</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Eligibility Criteria Modal */}
      <AnimatePresence>
        {showEligibilityModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Eligibility Criteria</h3>
                <p className="text-gray-600">Prime Minister Internship Scheme Requirements</p>
              </div>

              <div className="space-y-4 text-left">
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Age Requirement
                  </h4>
                  <p className="text-orange-700">Only candidates aged 21-24 years (inclusive) are eligible to apply.</p>
                </div>

                <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                    <X className="w-5 h-5 mr-2" />
                    Institution Restrictions
                  </h4>
                  <p className="text-red-700">Students from top-tier universities (IIT, NIT, BITS, Manipal, SRM, VIT, etc.) are not eligible.</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Employment Status
                  </h4>
                  <p className="text-blue-700">You must not be enrolled as a full-time student or full-time employee. Distance learning is accepted.</p>
                </div>

                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <IndianRupee className="w-5 h-5 mr-2" />
                    Family Income
                  </h4>
                  <p className="text-green-700">Family income must be ≤ ₹8,00,000 per annum.</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Government Employment
                  </h4>
                  <p className="text-purple-700">No family member should be working as a permanent full-time government employee.</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Internship Details
                  </h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Monthly stipend: ₹5,000 (₹4,500 from government + ₹500 from company)</li>
                    <li>• Duration: 12 months only</li>
                    <li>• Opportunity to work with top companies and government organizations</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowEligibilityModal(false)}
                  className="govt-button px-8"
                >
                  Got it, Continue Application
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Eligibility Error Modal */}
      <AnimatePresence>
        {showEligibilityError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Eligibility Check Failed</h3>
                <p className="text-gray-700 mb-6">{eligibilityMessage}</p>
                <button
                  onClick={() => setShowEligibilityError(false)}
                  className="govt-button w-full"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Internship Application</h1>
            <span className="text-lg font-semibold text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full"
              initial={{ width: "25%" }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
                  <p className="text-gray-600">Let's start with your basic details</p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                  <div className="grid grid-cols-2 gap-4">
                    {["Male", "Female"].map((gender) => (
                      <button
                        key={gender}
                        type="button"
                        onClick={() => handleInputChange("gender", gender)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          formData.gender === gender
                            ? "border-orange-500 bg-orange-50 text-orange-700"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.gender}
                    </p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth * (Age must be 21-24 years)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      min="1999-01-01"
                      max="2003-12-31"
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {formData.dateOfBirth && (
                    <p className="mt-1 text-sm text-gray-600">Age: {formData.age} years</p>
                  )}
                  {errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>

                {/* Employee or Student */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Are you a full-time employee or full-time student? *
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Distance learning is accepted. Full-time employees/students are not eligible.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleInputChange("employeeOrStudent", option)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          formData.employeeOrStudent === option
                            ? option === "Yes" 
                              ? "border-red-500 bg-red-50 text-red-700"
                              : "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {errors.employeeOrStudent && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.employeeOrStudent}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Education & Financial Details</h2>
                  <p className="text-gray-600">Tell us about your education and family background</p>
                </div>

                {/* Education Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Education Qualification *</label>
                  <select
                    value={formData.educationLevel}
                    onChange={(e) => handleInputChange("educationLevel", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.educationLevel ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select education level</option>
                    {["10th", "12th", "ITI", "Diploma", "Graduation", "Post Graduation"].map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  {errors.educationLevel && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.educationLevel}
                    </p>
                  )}
                </div>

                {/* Field of Study */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study *</label>
                  <select
                    value={formData.fieldOfStudy}
                    onChange={(e) => handleInputChange("fieldOfStudy", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.fieldOfStudy ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select field of study</option>
                    {["Engineering", "Arts", "Commerce", "Medicine", "Science", "Law", "Pharmacy", "Management", "Design", "Agriculture", "Education"].map(field => (
                      <option key={field} value={field}>{field}</option>
                    ))}
                  </select>
                  {errors.fieldOfStudy && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.fieldOfStudy}
                    </p>
                  )}
                </div>

                {/* CGPA or Percentage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CGPA or Percentage *</label>
                  <p className="text-sm text-gray-500 mb-3">
                    Enter percentage with % symbol for automatic CGPA conversion (e.g., 85%)
                  </p>
                  <input
                    type="text"
                    value={formData.cgpaOrPercentage}
                    onChange={(e) => handleInputChange("cgpaOrPercentage", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.cgpaOrPercentage ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter CGPA (e.g., 8.5) or Percentage (e.g., 85%)"
                  />
                  {errors.cgpaOrPercentage && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.cgpaOrPercentage}
                    </p>
                  )}
                </div>

                {/* Institution Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institution Type *</label>
                  <p className="text-sm text-red-500 mb-3">
                    Note: Students from top-tier universities are not eligible
                  </p>
                  <select
                    value={formData.institutionType}
                    onChange={(e) => handleInputChange("institutionType", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.institutionType ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select institution type</option>
                    {["Govt.", "Private", "Tier-2", "Tier-3", "Rural college"].map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.institutionType && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.institutionType}
                    </p>
                  )}
                </div>

                {/* Family Income */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Family Income (INR) *</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={formData.familyIncome}
                      onChange={(e) => handleInputChange("familyIncome", e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.familyIncome ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter annual family income"
                      max="800000"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Maximum allowed: ₹8,00,000</p>
                  {errors.familyIncome && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.familyIncome}
                    </p>
                  )}
                </div>

                {/* Income Certificate ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Income Certificate ID *</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.incomeCertificateId}
                      onChange={(e) => handleInputChange("incomeCertificateId", e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.incomeCertificateId ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="e.g., MH-2024-12345678"
                    />
                  </div>
                  {errors.incomeCertificateId && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.incomeCertificateId}
                    </p>
                  )}
                </div>

                {/* Family Government Employment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Is any family member working as full-time permanent government employee? *
                  </label>
                  <p className="text-sm text-red-500 mb-3">
                    Family members with permanent government employment make you ineligible.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleInputChange("familyGovtEmployment", option)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          formData.familyGovtEmployment === option
                            ? option === "Yes" 
                              ? "border-red-500 bg-red-50 text-red-700"
                              : "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {errors.familyGovtEmployment && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.familyGovtEmployment}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Preferences & Skills</h2>
                  <p className="text-gray-600">Tell us about your interests and capabilities</p>
                </div>

                {/* Sector Preferences */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sector Preferences * (Select 2-4 sectors)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    {sectors.map((sector) => (
                      <button
                        key={sector}
                        type="button"
                        onClick={() => addSectorPreference(sector)}
                        disabled={formData.sectorPreferences.includes(sector) || formData.sectorPreferences.length >= 4}
                        className={`p-3 rounded-xl border-2 transition-all text-sm ${
                          formData.sectorPreferences.includes(sector)
                            ? "border-orange-500 bg-orange-50 text-orange-700"
                            : formData.sectorPreferences.length >= 4
                            ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {sector}
                      </button>
                    ))}
                  </div>
                  {formData.sectorPreferences.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.sectorPreferences.map((sector) => (
                        <span
                          key={sector}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
                        >
                          {sector}
                          <button
                            type="button"
                            onClick={() => removeSectorPreference(sector)}
                            className="ml-2 text-orange-600 hover:text-orange-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  {errors.sectorPreferences && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.sectorPreferences}
                    </p>
                  )}
                </div>

                {/* Internship Mode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Internship Mode *</label>
                  <div className="grid grid-cols-3 gap-4">
                    {["Remote", "In-person", "Hybrid"].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => handleInputChange("internshipMode", mode)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          formData.internshipMode === mode
                            ? "border-orange-500 bg-orange-50 text-orange-700"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                  {errors.internshipMode && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.internshipMode}
                    </p>
                  )}
                </div>

                {/* Past Participation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Past Participation *</label>
                  <div className="grid grid-cols-2 gap-4">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleInputChange("pastParticipation", option)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          formData.pastParticipation === option
                            ? "border-orange-500 bg-orange-50 text-orange-700"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {errors.pastParticipation && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.pastParticipation}
                    </p>
                  )}
                </div>

                {/* Previous Internship Sector */}
                {formData.pastParticipation === "Yes" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Previous Internship Sector *</label>
                    <select
                      value={formData.previousInternshipSector}
                      onChange={(e) => handleInputChange("previousInternshipSector", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    >
                      <option value="">Select previous sector</option>
                      {sectors.map(sector => (
                        <option key={sector} value={sector}>{sector}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Social Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Social Category *</label>
                  <div className="grid grid-cols-3 gap-4">
                    {["SC", "ST", "OBC", "PwD", "General"].map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => handleInputChange("socialCategory", category)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          formData.socialCategory === category
                            ? "border-orange-500 bg-orange-50 text-orange-700"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  {errors.socialCategory && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.socialCategory}
                    </p>
                  )}
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills * (Search and select)</label>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={skillSearchTerm}
                      onChange={(e) => setSkillSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="Search skills..."
                    />
                  </div>
                  
                  {skillSearchTerm && filteredSkills.length > 0 && (
                    <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-xl mb-4">
                      {filteredSkills.slice(0, 10).map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => addSkill(skill)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Add Others Option */}
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => setShowCustomSkillInput(!showCustomSkillInput)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Custom Skill</span>
                    </button>
                  </div>

                  {/* Custom Skill Input */}
                  {showCustomSkillInput && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={formData.customSkill}
                          onChange={(e) => handleInputChange("customSkill", e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Enter custom skill"
                        />
                        <button
                          type="button"
                          onClick={addCustomSkill}
                          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowCustomSkillInput(false)}
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  {errors.skills && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.skills}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Final Details</h2>
                  <p className="text-gray-600">Complete your application with remaining information</p>
                </div>

                {/* Aadhar Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Number *</label>
                  <input
                    type="text"
                    value={formData.aadharNumber}
                    onChange={(e) => handleInputChange("aadharNumber", e.target.value.replace(/\D/g, '').slice(0, 12))}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.aadharNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter 12-digit Aadhar number"
                    maxLength={12}
                  />
                  {errors.aadharNumber && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.aadharNumber}
                    </p>
                  )}
                </div>

                {/* Willingness to Relocate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Willingness to Relocate *</label>
                  <div className="grid grid-cols-2 gap-4">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleInputChange("willingnessToRelocate", option)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          formData.willingnessToRelocate === option
                            ? "border-orange-500 bg-orange-50 text-orange-700"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {errors.willingnessToRelocate && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.willingnessToRelocate}
                    </p>
                  )}
                </div>

                {/* Disability Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Disability Status *</label>
                  <div className="grid grid-cols-2 gap-4">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleInputChange("disabilityStatus", option)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          formData.disabilityStatus === option
                            ? "border-orange-500 bg-orange-50 text-orange-700"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {errors.disabilityStatus && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.disabilityStatus}
                    </p>
                  )}
                </div>

                {/* Preferred Industry Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Industry Type *</label>
                  <div className="grid grid-cols-2 gap-4">
                    {["PSU", "MSME", "Startup", "Corporate"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleInputChange("preferredIndustryType", type)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          formData.preferredIndustryType === type
                            ? "border-orange-500 bg-orange-50 text-orange-700"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {errors.preferredIndustryType && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.preferredIndustryType}
                    </p>
                  )}
                </div>

                {/* Location Preference */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location Preference *</label>
                  <select
                    value={formData.locationPreference}
                    onChange={(e) => handleInputChange("locationPreference", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.locationPreference ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select preferred location</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                  {errors.locationPreference && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.locationPreference}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                disabled={showEligibilityError}
                className="flex items-center space-x-2 govt-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading || showEligibilityError}
                className="flex items-center space-x-2 govt-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <CheckCircle className="w-5 h-5" />
                )}
                <span>{isLoading ? "Finding Matches..." : "Show Matches"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
