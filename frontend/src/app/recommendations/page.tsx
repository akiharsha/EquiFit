"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Building, 
  MapPin, 
  Clock, 
  IndianRupee, 
  TrendingUp, 
  Star, 
  Brain, 
  Eye, 
  GitCompare,
  Filter,
  SortDesc,
  Sparkles,
  Target,
  CheckCircle,
  Award,
  Users,
  Calendar
} from "lucide-react";

interface InternshipMatch {
  id: string;
  companyName: string;
  companyLogo: string;
  roleName: string;
  location: string;
  duration: string;
  stipend: string;
  matchPercentage: number;
  mode: string;
  department: string;
  applicationDeadline: string;
  requirements: string[];
  benefits: string[];
  matchReasons: string[];
  companyType: "ministry" | "psu" | "department";
  skillsMatched: string[];
  experienceLevel: string;
  contributions?: Record<string, number>;
}

export default function RecommendationsPage() {
  const [selectedMatches, setSelectedMatches] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"match" | "stipend" | "deadline">("match");
  const [filterBy, setFilterBy] = useState<"all" | "ministry" | "psu" | "department">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [dynamicMatches, setDynamicMatches] = useState<InternshipMatch[] | null>(null);

  // Mock data - used as fallback when no backend data is available
  const mockMatches: InternshipMatch[] = [
    {
      id: "1",
      companyName: "Ministry of Electronics & IT",
      companyLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/MeitY.png/220px-MeitY.png",
      roleName: "Digital India Intern",
      location: "New Delhi",
      duration: "12 months",
      stipend: "₹5,000/month",
      matchPercentage: 94,
      mode: "Hybrid",
      department: "Technology & Innovation",
      applicationDeadline: "2024-01-15",
      requirements: ["Computer Science/IT Background", "Programming Skills", "Digital Literacy"],
      benefits: ["Government Certificate", "Mentorship", "Full-time Opportunity"],
      matchReasons: [
        "Perfect match for your Computer Science background",
        "Your programming skills align with digital initiatives",
        "Location preference matches (Delhi NCR)"
      ],
      companyType: "ministry",
      skillsMatched: ["Python", "Web Development", "Database Management"],
      experienceLevel: "Entry Level"
    },
    {
      id: "2",
      companyName: "BHEL (Bharat Heavy Electricals)",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Bhel-logo.svg/1200px-Bhel-logo.svg.png",
      roleName: "Engineering Trainee",
      location: "Bhopal",
      duration: "12 months",
      stipend: "₹5,000/month",
      matchPercentage: 89,
      mode: "In-person",
      
      department: "Heavy Engineering",
      applicationDeadline: "2024-01-20",
      requirements: ["Engineering Degree", "Technical Aptitude", "Team Collaboration"],
      benefits: ["Industry Exposure", "Technical Training", "Career Growth"],
      matchReasons: [
        "Engineering background perfectly matches requirements",
        "Technical skills align with heavy engineering sector",
        "Strong academic performance (8.5 CGPA) meets criteria"
      ],
      companyType: "psu",
      skillsMatched: ["AutoCAD", "Project Management", "Technical Analysis"],
      experienceLevel: "Entry Level"
    },
    {
      id: "3",
      companyName: "Department of Space (ISRO)",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Indian_Space_Research_Organisation_Logo.svg/1200px-Indian_Space_Research_Organisation_Logo.svg.png",
      roleName: "Space Technology Intern",
      location: "Bengaluru",
      duration: "12 months",
      stipend: "₹5,000/month",
      matchPercentage: 87,
      mode: "Remote",
      
      department: "Space Research",
      applicationDeadline: "2024-01-10",
      requirements: ["STEM Background", "Research Aptitude", "Innovation Mindset"],
      benefits: ["ISRO Certificate", "Research Experience", "Space Technology Exposure"],
      matchReasons: [
        "STEM background ideal for space technology",
        "Research interests align with ISRO projects",
        "High academic performance indicates research potential"
      ],
      companyType: "department",
      skillsMatched: ["MATLAB", "Data Analysis", "Research Methodology"],
      experienceLevel: "Entry Level"
    },
    {
      id: "4",
      companyName: "Ministry of Health & Family Welfare",
      companyLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Ministry_of_Health_and_Family_Welfare.png/220px-Ministry_of_Health_and_Family_Welfare.png",
      roleName: "Public Health Analyst",
      location: "New Delhi",
      duration: "12 months",
      stipend: "₹5,000/month",
      matchPercentage: 82,
      mode: "Hybrid",
      
      department: "Healthcare Policy",
      applicationDeadline: "2024-01-25",
      requirements: ["Healthcare/Life Sciences Background", "Data Analysis", "Policy Interest"],
      benefits: ["Healthcare Exposure", "Policy Experience", "Social Impact"],
      matchReasons: [
        "Life sciences background relevant to public health",
        "Data analysis skills valuable for health analytics",
        "Interest in social impact aligns with ministry goals"
      ],
      companyType: "ministry",
      skillsMatched: ["Statistical Analysis", "Healthcare Knowledge", "Policy Research"],
      experienceLevel: "Entry Level"
    },
    {
      id: "5",
      companyName: "Oil and Natural Gas Corporation",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/ONGC_Logo.svg/1200px-ONGC_Logo.svg.png",
      roleName: "Energy Sector Trainee",
      location: "Mumbai",
      duration: "12 months",
      stipend: "₹5,000/month",
      matchPercentage: 78,
      mode: "In-person",
      
      department: "Energy & Petroleum",
      applicationDeadline: "2024-02-01",
      requirements: ["Engineering/Science Background", "Energy Sector Interest", "Analytical Skills"],
      benefits: ["Industry Leadership", "Energy Expertise", "Corporate Exposure"],
      matchReasons: [
        "Engineering background suitable for energy sector",
        "Analytical skills match technical requirements",
        "Corporate internship preference indicated in application"
      ],
      companyType: "psu",
      skillsMatched: ["Process Engineering", "Data Analysis", "Project Coordination"],
      experienceLevel: "Entry Level"
    }
  ];

  useEffect(() => {
    // Try to load recommendations produced by backend and saved in localStorage
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('recommendations') : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        const results = Array.isArray(parsed?.results) ? parsed.results : [];
        if (results.length > 0) {
          const mapped: InternshipMatch[] = results.map((r: any, idx: number) => {
            // Title examples: "IRCTC - Tourism Internship 1" -> company inferred as part before hyphen
            const title: string = r?.Title || "Internship";
            const companyFromTitle = title.includes(" - ") ? title.split(" - ")[0] : r?.Industry_Type || "Government Organization";
            const industryType = String(r?.Industry_Type || '').toLowerCase();
            const companyType: "ministry" | "psu" | "department" = industryType === 'psu' ? 'psu' : 'department';
            // Prefer backend-provided skills_matched; fallback to parsing Skills_Required
            let skills: string[] = Array.isArray(r?.skills_matched) ? r.skills_matched : [];
            if (skills.length === 0 && typeof r?.Skills_Required === 'string') {
              try {
                const s = r.Skills_Required
                  .replace(/^\[/, '')
                  .replace(/\]$/, '')
                  .split(',')
                  .map((x: string) => x.replace(/['"]/g, '').trim())
                  .filter(Boolean);
                skills = s;
              } catch {}
            }
            // Build contribution map (top components)
            const contrib = r?.explain?.contrib_percentages || null;

            return {
              id: String(r?.Internship_ID ?? idx + 1),
              companyName: String(companyFromTitle),
              companyLogo: "https://www.logopeople.in/wp-content/uploads/2013/01/government-of-india.jpg",
              roleName: title,
              location: String(r?.Location || 'India'),
              duration: "12 months",
              stipend: "₹5,000/month",
              matchPercentage: Number(r?.matchPercentage ?? 75),
              mode: String(r?.Mode || 'In-person'),
              department: String(r?.Sector || 'General'),
              applicationDeadline: new Date(Date.now() + 30*24*60*60*1000).toISOString().slice(0,10),
              requirements: skills.slice(0, 5),
              benefits: ["Government Certificate", "Mentorship", "Career Growth"],
              matchReasons: Array.isArray(r?.explain?.reasons) && r.explain.reasons.length > 0
                ? r.explain.reasons
                : [
                    `Sector match: ${r?.Sector ?? 'N/A'}`,
                    `Location match: ${r?.Location ?? 'N/A'}`,
                  ],
              companyType,
              skillsMatched: skills.slice(0, 6),
              experienceLevel: "Entry Level",
              contributions: contrib || undefined,
            } as InternshipMatch;
          });
          setDynamicMatches(mapped);
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored recommendations', e);
    } finally {
      // Simulate brief loading for UX smoothness
      const timer = setTimeout(() => setIsLoading(false), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const sourceMatches = dynamicMatches && dynamicMatches.length > 0 ? dynamicMatches : mockMatches;
  const filteredAndSortedMatches = sourceMatches
    .filter(match => filterBy === "all" || match.companyType === filterBy)
    .sort((a, b) => {
      switch (sortBy) {
        case "match":
          return b.matchPercentage - a.matchPercentage;
        case "stipend":
          return parseInt(b.stipend.replace(/[₹,/month]/g, "")) - parseInt(a.stipend.replace(/[₹,/month]/g, ""));
        case "deadline":
          return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime();
        default:
          return 0;
      }
    });

  const handleSelectMatch = (matchId: string) => {
    setSelectedMatches(prev => 
      prev.includes(matchId) 
        ? prev.filter(id => id !== matchId)
        : [...prev, matchId]
    );
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-100";
    if (percentage >= 80) return "text-blue-600 bg-blue-100";
    if (percentage >= 70) return "text-orange-600 bg-orange-100";
    return "text-gray-600 bg-gray-100";
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI is Finding Your Perfect Matches</h2>
          <p className="text-gray-600 mb-6">Analyzing your profile against 500+ government internships...</p>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
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
            <Link href="/application" className="flex items-center space-x-4">
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
                  <div className="text-sm text-gray-600">AI Recommendations</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full inline-flex items-center space-x-2 font-semibold text-lg shadow-lg mb-6">
            <Sparkles className="w-6 h-6" />
            <span>🤖 AI-Powered Recommendations</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Perfect <span className="govt-orange">Internship Matches</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI analyzed your profile and found {filteredAndSortedMatches.length} highly compatible government internship opportunities
          </p>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Organizations</option>
                  <option value="ministry">Ministries</option>
                  <option value="psu">PSUs</option>
                  <option value="department">Departments</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center space-x-2">
                <SortDesc className="w-5 h-5 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="match">Best Match</option>
                  <option value="stipend">Highest Stipend</option>
                  <option value="deadline">Deadline</option>
                </select>
              </div>
            </div>

            {/* Compare Button */}
            {selectedMatches.length >= 2 && (
              <Link
                href={`/compare?matches=${selectedMatches.join(",")}`}
                className="govt-button flex items-center space-x-2"
              >
                <GitCompare className="w-5 h-5" />
                <span>Compare Selected ({selectedMatches.length})</span>
              </Link>
            )}
          </div>
        </motion.div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredAndSortedMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Match Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
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
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {match.roleName}
                      </h3>
                      <p className="text-gray-600 flex items-center space-x-1">
                        <span>{getCompanyTypeIcon(match.companyType)}</span>
                        <span>{match.companyName}</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Select for Comparison */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedMatches.includes(match.id)}
                      onChange={() => handleSelectMatch(match.id)}
                      className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-500">Compare</span>
                  </div>
                </div>

                {/* Match Percentage + Stipend */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`px-4 py-2 rounded-full font-bold text-lg ${getMatchColor(match.matchPercentage)}`}>
                    <Target className="w-5 h-5 inline mr-2" />
                    {match.matchPercentage}% Match
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{match.stipend}</div>
                    <div className="text-sm text-gray-500">{match.duration}</div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{match.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Apply by {new Date(match.applicationDeadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{match.mode}</span>
                  </div>
                </div>
              </div>

              {/* Match Reasons */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <span>Why AI Chose This Match</span>
                </h4>
                {/* Contributions row */}
                {match.contributions && (
                  <div className="mb-4 flex flex-wrap gap-2 text-xs">
                    {Object.entries(match.contributions).map(([k, v]) => (
                      <span key={k} className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        {k.toUpperCase()}: {v}%
                      </span>
                    ))}
                  </div>
                )}
                <ul className="space-y-2 mb-6">
                  {match.matchReasons.slice(0, 2).map((reason, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills Matched */}
                <div className="mb-6">
                  <h5 className="font-medium text-gray-900 mb-2">Skills Matched:</h5>
                  <div className="flex flex-wrap gap-2">
                    {match.skillsMatched.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link
                    href={`/recommendations/${match.id}`}
                    className="flex-1 govt-button flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </Link>
                  <button className="px-4 py-2 border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-semibold">
                    Apply Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedMatches.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more opportunities.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
