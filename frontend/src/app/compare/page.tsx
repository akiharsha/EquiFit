"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  ArrowLeft, Building, MapPin, Clock, Calendar, Target, Brain, 
  CheckCircle, Award, Users, TrendingUp, X, Plus, Eye,
  IndianRupee, Star, Zap, Shield, Globe, Phone, Mail
} from "lucide-react";

interface ComparisonMatch {
  id: string;
  companyName: string;
  companyLogo: string;
  roleName: string;
  location: string;
  duration: string;
  stipend: string;
  matchPercentage: number;
  department: string;
  applicationDeadline: string;
  benefits: string[];
  skillsMatched: string[];
  companyType: "ministry" | "psu" | "department";
  pros: string[];
  cons: string[];
  requirements: string[];
  workCulture: string;
  careerGrowth: string;
  learningOpportunities: string[];
}

export default function ComparisonPage() {
  const searchParams = useSearchParams();
  const [selectedMatches, setSelectedMatches] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<ComparisonMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock comparison data
  const mockMatches: Record<string, ComparisonMatch> = {
    "1": {
      id: "1",
      companyName: "Ministry of Electronics & IT",
      companyLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/MeitY.png/220px-MeitY.png",
      roleName: "Digital India Intern",
      location: "New Delhi",
      duration: "12 months",
      stipend: "₹25,000/month",
      matchPercentage: 94,
      department: "Technology & Innovation",
      applicationDeadline: "2024-01-15",
      benefits: ["Government Certificate", "Mentorship", "Full-time Opportunity", "Health Insurance"],
      skillsMatched: ["Python", "Web Development", "Database Management"],
      companyType: "ministry",
      pros: [
        "Direct government experience",
        "High-impact national projects",
        "Excellent learning opportunities",
        "Strong network building"
      ],
      cons: [
        "Slower decision-making process",
        "Formal work environment",
        "Limited flexibility in projects"
      ],
      requirements: ["Computer Science/IT Background", "Programming Skills", "Digital Literacy"],
      workCulture: "Formal government environment with structured processes and hierarchical decision-making",
      careerGrowth: "Direct pathway to permanent government positions with excellent long-term stability",
      learningOpportunities: ["Government tech architecture", "Policy implementation", "Large-scale systems"]
    },
    "2": {
      id: "2",
      companyName: "BHEL (Bharat Heavy Electricals)",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Bhel-logo.svg/1200px-Bhel-logo.svg.png",
      roleName: "Engineering Trainee",
      location: "Bhopal",
      duration: "12 months",
      stipend: "₹22,000/month",
      matchPercentage: 89,
      department: "Heavy Engineering",
      applicationDeadline: "2024-01-20",
      benefits: ["Industry Exposure", "Technical Training", "Career Growth", "Performance Bonus"],
      skillsMatched: ["AutoCAD", "Project Management", "Technical Analysis"],
      companyType: "psu",
      pros: [
        "Strong technical training",
        "Industry leadership experience",
        "Good compensation package",
        "Career advancement opportunities"
      ],
      cons: [
        "Traditional work culture",
        "Location may be limiting",
        "Heavy industry focus only"
      ],
      requirements: ["Engineering Degree", "Technical Aptitude", "Team Collaboration"],
      workCulture: "Corporate PSU environment with focus on technical excellence and team collaboration",
      careerGrowth: "Excellent opportunities for technical leadership roles in heavy engineering sector",
      learningOpportunities: ["Heavy machinery design", "Project execution", "Quality management"]
    },
    "3": {
      id: "3",
      companyName: "Department of Space (ISRO)",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Indian_Space_Research_Organisation_Logo.svg/1200px-Indian_Space_Research_Organisation_Logo.svg.png",
      roleName: "Space Technology Intern",
      location: "Bengaluru",
      duration: "12 months",
      stipend: "₹30,000/month",
      matchPercentage: 87,
      department: "Space Research",
      applicationDeadline: "2024-01-10",
      benefits: ["ISRO Certificate", "Research Experience", "Space Technology Exposure", "Publication Opportunities"],
      skillsMatched: ["MATLAB", "Data Analysis", "Research Methodology"],
      companyType: "department",
      pros: [
        "Cutting-edge technology",
        "World-class research environment",
        "Highest stipend offered",
        "International recognition"
      ],
      cons: [
        "Highly competitive environment",
        "Intense workload",
        "Limited positions available"
      ],
      requirements: ["STEM Background", "Research Aptitude", "Innovation Mindset"],
      workCulture: "Research-focused environment with emphasis on innovation and scientific excellence",
      careerGrowth: "Pathway to space research career with potential for international collaborations",
      learningOpportunities: ["Satellite technology", "Space missions", "Advanced research methods"]
    }
  };

  useEffect(() => {
    const matchIds = searchParams.get('matches')?.split(',') || [];
    setSelectedMatches(matchIds);
    
    // Simulate API call
    setTimeout(() => {
      const data = matchIds.map(id => mockMatches[id]).filter(Boolean);
      setComparisonData(data);
      setIsLoading(false);
    }, 1000);
  }, [searchParams]);

  const addMatch = (matchId: string) => {
    if (selectedMatches.length < 3 && !selectedMatches.includes(matchId)) {
      const newMatches = [...selectedMatches, matchId];
      setSelectedMatches(newMatches);
      setComparisonData([...comparisonData, mockMatches[matchId]]);
    }
  };

  const removeMatch = (matchId: string) => {
    const newMatches = selectedMatches.filter(id => id !== matchId);
    setSelectedMatches(newMatches);
    setComparisonData(comparisonData.filter(match => match.id !== matchId));
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-100";
    if (percentage >= 80) return "text-blue-600 bg-blue-100";
    return "text-orange-600 bg-orange-100";
  };

  const getCompanyTypeIcon = (type: string) => {
    switch (type) {
      case "ministry": return "🏛️";
      case "psu": return "🏭";
      case "department": return "🏢";
      default: return "🏛️";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Brain className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Preparing Comparison</h2>
          <p className="text-gray-600">Loading detailed comparison data...</p>
        </motion.div>
      </div>
    );
  }

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
                  <div className="text-sm text-gray-600">Compare Internships</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full inline-flex items-center space-x-2 font-semibold text-lg shadow-lg mb-6">
            <Target className="w-6 h-6" />
            <span>Side-by-Side Comparison</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Compare Your <span className="govt-orange">Top Matches</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make an informed decision by comparing internship opportunities side-by-side
          </p>
        </motion.div>

        {/* Add More Matches */}
        {comparisonData.length < 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add More Matches to Compare</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.values(mockMatches)
                .filter(match => !selectedMatches.includes(match.id))
                .slice(0, 3)
                .map((match) => (
                <button
                  key={match.id}
                  onClick={() => addMatch(match.id)}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all"
                >
                  <Plus className="w-5 h-5 text-orange-600" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{match.roleName}</div>
                    <div className="text-sm text-gray-600">{match.companyName}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Comparison Table */}
        {comparisonData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <td className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-48">
                      Comparison Criteria
                    </td>
                    {comparisonData.map((match) => (
                      <td key={match.id} className="px-6 py-4 text-center min-w-80">
                        <div className="relative">
                          <button
                            onClick={() => removeMatch(match.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="flex flex-col items-center space-y-3">
                            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                              <Image
                                src={match.companyLogo}
                                alt={match.companyName}
                                width={48}
                                height={48}
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">{match.roleName}</h3>
                              <p className="text-sm text-gray-600 flex items-center justify-center space-x-1">
                                <span>{getCompanyTypeIcon(match.companyType)}</span>
                                <span>{match.companyName}</span>
                              </p>
                            </div>
                            <div className={`px-3 py-1 rounded-full font-bold ${getMatchColor(match.matchPercentage)}`}>
                              {match.matchPercentage}% Match
                            </div>
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Basic Information */}
                  <tr className="bg-blue-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">📍 Location</td>
                    {comparisonData.map((match) => (
                      <td key={match.id} className="px-6 py-4 text-center text-gray-700">
                        {match.location}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-900">💰 Stipend</td>
                    {comparisonData.map((match) => (
                      <td key={match.id} className="px-6 py-4 text-center text-gray-700 font-bold">
                        {match.stipend}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">⏰ Duration</td>
                    {comparisonData.map((match) => (
                      <td key={match.id} className="px-6 py-4 text-center text-gray-700">
                        {match.duration}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-900">📅 Deadline</td>
                    {comparisonData.map((match) => (
                      <td key={match.id} className="px-6 py-4 text-center text-gray-700">
                        {new Date(match.applicationDeadline).toLocaleDateString()}
                      </td>
                    ))}
                  </tr>

                  {/* Skills & Requirements */}
                  <tr className="bg-green-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">🎯 Skills Matched</td>
                    {comparisonData.map((match) => (
                      <td key={match.id} className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {match.skillsMatched.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-900">📋 Requirements</td>
                    {comparisonData.map((match) => (
                      <td key={match.id} className="px-6 py-4">
                        <ul className="text-sm text-gray-700 space-y-1">
                          {match.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start space-x-1">
                              <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Benefits */}
                  <tr className="bg-purple-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">🎁 Benefits</td>
                    {comparisonData.map((match) => (
                      <td key={match.id} className="px-6 py-4">
                        <ul className="text-sm text-gray-700 space-y-1">
                          {match.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start space-x-1">
                              <Award className="w-3 h-3 text-purple-500 mt-1 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Pros & Cons */}
                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-900">✅ Advantages</td>
                    {comparisonData.map((match) => (
                      <td key={match.id} className="px-6 py-4">
                        <ul className="text-sm text-gray-700 space-y-1">
                          {match.pros.map((pro, idx) => (
                            <li key={idx} className="flex items-start space-x-1">
                              <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">⚠️ Considerations</td>
                    {comparisonData.map((match) => (
                      <td key={match.id} className="px-6 py-4">
                        <ul className="text-sm text-gray-700 space-y-1">
                          {match.cons.map((con, idx) => (
                            <li key={idx} className="flex items-start space-x-1">
                              <X className="w-3 h-3 text-orange-500 mt-1 flex-shrink-0" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Work Culture & Growth */}
                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-900">🏢 Work Culture</td>
                    {comparisonData.map((match) => (
                      <td key={match.id} className="px-6 py-4 text-sm text-gray-700">
                        {match.workCulture}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">📈 Career Growth</td>
                    {comparisonData.map((match) => (
                      <td key={match.id} className="px-6 py-4 text-sm text-gray-700">
                        {match.careerGrowth}
                      </td>
                    ))}
                  </tr>

                  {/* Learning Opportunities */}
                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-900">🎓 Learning</td>
                    {comparisonData.map((match) => (
                      <td key={match.id} className="px-6 py-4">
                        <ul className="text-sm text-gray-700 space-y-1">
                          {match.learningOpportunities.map((learning, idx) => (
                            <li key={idx} className="flex items-start space-x-1">
                              <Zap className="w-3 h-3 text-blue-500 mt-1 flex-shrink-0" />
                              <span>{learning}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Action Buttons */}
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">🎯 Actions</td>
                    {comparisonData.map((match) => (
                      <td key={match.id} className="px-6 py-4">
                        <div className="space-y-2">
                          <Link
                            href={`/recommendations/${match.id}`}
                            className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
                          >
                            <Eye className="w-4 h-4 inline mr-1" />
                            View Details
                          </Link>
                          <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
                            Apply Now
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* No Matches Selected */}
        {comparisonData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Matches Selected</h3>
            <p className="text-gray-600 mb-6">Select internships from your recommendations to compare them side-by-side.</p>
            <Link href="/recommendations" className="govt-button">
              Back to Recommendations
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
