"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, Building, MapPin, Clock, Calendar, Target, Brain, Eye, 
  CheckCircle, Award, Users, GraduationCap, TrendingUp, Sparkles,
  AlertCircle, Info, Briefcase, Heart, Share2, Mail, Phone, Globe
} from "lucide-react";

export default function DetailedRecommendationPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<"overview" | "ai-analysis" | "company" | "application">("overview");
  const [isSaved, setIsSaved] = useState(false);

  // Mock data for the detailed match
  const match = {
    id: "1",
    companyName: "Ministry of Electronics & IT",
    companyLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/MeitY.png/220px-MeitY.png",
    roleName: "Digital India Intern",
    location: "New Delhi",
    duration: "12 months",
    stipend: "₹25,000/month",
    matchPercentage: 94,
    applicationDeadline: "2024-01-15",
    roleDescription: "As a Digital India Intern, you'll work on cutting-edge government technology projects that impact millions of citizens. You'll contribute to digital transformation initiatives, develop citizen-centric applications, and learn about large-scale government technology implementation.",
    responsibilities: [
      "Develop and maintain government web applications and portals",
      "Assist in Digital India campaign implementation",
      "Work on citizen service digitization projects",
      "Support data analytics and reporting for government schemes",
      "Collaborate with senior developers on e-governance solutions"
    ],
    learningOutcomes: [
      "Government technology architecture and security protocols",
      "Large-scale application development and deployment",
      "E-governance frameworks and citizen service design",
      "Data privacy and security in government systems"
    ],
    benefits: ["Government Certificate", "Mentorship", "Full-time Opportunity"],
    matchReasons: [
      "Perfect match for your Computer Science background",
      "Your programming skills align with digital initiatives",
      "Location preference matches (Delhi NCR)",
      "Academic performance exceeds minimum requirements"
    ],
    aiAnalysis: {
      profileMatch: {
        education: { score: 95, reason: "Computer Science degree perfectly aligns with digital technology requirements" },
        skills: { score: 92, reason: "Programming skills in Python and web development directly applicable" },
        experience: { score: 88, reason: "Academic projects demonstrate relevant technical capabilities" },
        location: { score: 100, reason: "Delhi NCR preference matches internship location exactly" },
        interests: { score: 90, reason: "Expressed interest in government technology and public service" }
      },
      careerGrowth: [
        "Direct pathway to government technology roles",
        "Exposure to national-level digital initiatives",
        "Network building with senior government officials"
      ],
      challenges: [
        "Government processes may be slower than private sector",
        "Need to adapt to formal government work culture"
      ]
    },
    companyStats: {
      employees: "2,000+",
      established: "2016",
      headquarters: "New Delhi",
      sectors: ["Digital Infrastructure", "Cybersecurity", "E-Governance", "Innovation"]
    },
    contactInfo: {
      email: "internships@meity.gov.in",
      phone: "+91-11-2301-3000",
      website: "https://www.meity.gov.in"
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-100";
    if (percentage >= 80) return "text-blue-600 bg-blue-100";
    return "text-orange-600 bg-orange-100";
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    return "bg-orange-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Government Header */}
      <div className="govt-header py-2 text-center text-sm font-semibold">
        <div className="max-w-7xl mx-auto px-4">
          <p>भारत सरकार | Government of India | भारत सरकार</p>
        </div>
      </div>

      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-lg border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/recommendations" className="flex items-center space-x-4">
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
                  <div className="text-sm text-gray-600">Detailed Match Analysis</div>
                </div>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 rounded-lg transition-colors ${
                  isSaved ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"
        >
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex items-start space-x-6">
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                  <Image
                    src={match.companyLogo}
                    alt={match.companyName}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{match.roleName}</h1>
                  <p className="text-xl text-gray-600 mb-4">{match.companyName}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{match.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{match.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Apply by {new Date(match.applicationDeadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center lg:text-right">
                <div className={`inline-flex items-center px-6 py-3 rounded-full font-bold text-2xl mb-4 ${getMatchColor(match.matchPercentage)}`}>
                  <Target className="w-6 h-6 mr-2" />
                  {match.matchPercentage}% Match
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{match.stipend}</div>
                <div className="text-lg text-gray-600">{match.duration}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-8"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                { id: "overview", label: "Overview", icon: Eye },
                { id: "ai-analysis", label: "AI Analysis", icon: Brain },
                { id: "company", label: "Company Details", icon: Building },
                { id: "application", label: "How to Apply", icon: Briefcase }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Role Description</h3>
                    <p className="text-gray-700 leading-relaxed">{match.roleDescription}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Key Responsibilities</h3>
                    <ul className="space-y-3">
                      {match.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {match.learningOutcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                          <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Benefits & Perks</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {match.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                          <Award className="w-5 h-5 text-green-600" />
                          <span className="text-gray-700 font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "ai-analysis" && (
                <motion.div
                  key="ai-analysis"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">AI Profile Match Analysis</h3>
                        <p className="text-gray-600">How your profile aligns with this opportunity</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(match.aiAnalysis.profileMatch).map(([category, data]) => (
                        <div key={category} className="bg-gray-50 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900 capitalize">{category}</h4>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${getScoreColor(data.score)} transition-all duration-1000`}
                                  style={{ width: `${data.score}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-bold text-gray-700">{data.score}%</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{data.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                      <Sparkles className="w-6 h-6 text-yellow-500" />
                      <span>Why AI Chose This Match</span>
                    </h3>
                    <div className="space-y-3">
                      {match.matchReasons.map((reason, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                          <Target className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                      <TrendingUp className="w-6 h-6 text-green-500" />
                      <span>Career Growth Potential</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {match.aiAnalysis.careerGrowth.map((growth, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{growth}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                      <AlertCircle className="w-6 h-6 text-orange-500" />
                      <span>Potential Challenges</span>
                    </h3>
                    <div className="space-y-3">
                      {match.aiAnalysis.challenges.map((challenge, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                          <Info className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{challenge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "company" && (
                <motion.div
                  key="company"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">About {match.companyName}</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      The Ministry of Electronics and Information Technology (MeitY) is the apex body for formulation of policy on electronics and information technology in India. It drives Digital India initiatives and promotes innovation in technology sector.
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Users className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <div className="font-semibold text-gray-900">{match.companyStats.employees}</div>
                        <div className="text-sm text-gray-600">Employees</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Calendar className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <div className="font-semibold text-gray-900">{match.companyStats.established}</div>
                        <div className="text-sm text-gray-600">Established</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <MapPin className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <div className="font-semibold text-gray-900">{match.companyStats.headquarters}</div>
                        <div className="text-sm text-gray-600">Headquarters</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Building className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <div className="font-semibold text-gray-900">{match.companyStats.sectors.length}</div>
                        <div className="text-sm text-gray-600">Key Sectors</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Key Focus Areas</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {match.companyStats.sectors.map((sector, idx) => (
                        <div key={idx} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-center font-medium">
                          {sector}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="font-medium text-gray-900">Email</div>
                            <a href={`mailto:${match.contactInfo.email}`} className="text-blue-600 hover:underline">
                              {match.contactInfo.email}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="font-medium text-gray-900">Phone</div>
                            <a href={`tel:${match.contactInfo.phone}`} className="text-blue-600 hover:underline">
                              {match.contactInfo.phone}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Globe className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="font-medium text-gray-900">Website</div>
                            <a href={match.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              Visit Website
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "application" && (
                <motion.div
                  key="application"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Application Process</h3>
                    <div className="space-y-4">
                      {[
                        "Submit online application with required documents",
                        "Initial screening based on eligibility criteria",
                        "Technical assessment (coding test and system design)",
                        "Panel interview with MeitY officials",
                        "Background verification and security clearance",
                        "Final selection and offer letter"
                      ].map((step, idx) => (
                        <div key={idx} className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {idx + 1}
                          </div>
                          <span className="text-gray-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h4 className="font-semibold text-orange-900 mb-2">Application Deadline</h4>
                    <p className="text-orange-800">
                      Applications must be submitted by <strong>{new Date(match.applicationDeadline).toLocaleDateString()}</strong>
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <button className="flex-1 govt-button">
                      Apply Now
                    </button>
                    <button className="px-6 py-3 border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-semibold">
                      Save for Later
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
