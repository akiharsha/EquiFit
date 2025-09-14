import csv
import os
import random
from datetime import datetime, timedelta


def ensure_datasets_dir(path: str) -> None:
    if not os.path.exists(path):
        os.makedirs(path, exist_ok=True)


def get_company_names() -> list[str]:
    """Return the 20 specified company names"""
    return [
        "RELIANCE INDUSTRIES LIMITED",
        "TATA CONSULTANCY SERVICES LIMITED", 
        "HDFC BANK LIMITED",
        "OIL AND NATURAL GAS CORPORATION LIMITED",
        "INFOSYS LIMITED",
        "NTPC LIMITED",
        "TATA STEEL LIMITED",
        "ITC LIMITED",
        "INDIAN OIL CORPORATION LIMITED",
        "ICICI BANK LIMITED",
        "POWER GRID CORPORATION OF INDIA LIMITED",
        "TATA SONS PRIVATE LIMITED",
        "WIPRO LIMITED",
        "HCL TECHNOLOGIES LIMITED",
        "HINDUSTAN ZINC LIMITED",
        "RELIANCE JIO INFOCOMM LIMITED",
        "MAHANADI COALFIELDS LIMITED",
        "TECH MAHINDRA LIMITED",
        "HINDUSTAN UNILEVER LIMITED",
        "AXIS BANK LIMITED"
    ]


def get_industry_types() -> list[str]:
    """Return industry types based on company names and common sectors"""
    return [
        "IT", "Manufacturing", "Healthcare", "Education", "Electrical", "Software",
        "Railway", "Finance", "Logistics", "E-commerce", "Automotive", "Telecom",
        "Energy", "Banking", "Oil & Gas", "Steel", "FMCG", "Coal", "Power"
    ]


def get_company_sizes() -> list[str]:
    """Return company size categories"""
    return ["Startup", "MSME", "Large Enterprise", "PSU", "Govt. Dept."]


def get_ownership_types() -> list[str]:
    """Return ownership type categories"""
    return ["Private", "Government", "PSU", "NGO"]


def get_skills_pool() -> dict:
    """Return the skills pool - unified with applicants dataset"""
    return {
        "IT": ["python", "java", "sql", "git", "html", "css", "javascript", "react", "testing", "linux"],
        "Software": ["oop", "data structures", "algorithms", "docker", "api design"],
        "Manufacturing": ["cad", "cam", "lean", "six sigma", "cnc", "quality control", "supply chain"],
        "Healthcare": ["first aid", "patient care", "record keeping", "lab techniques", "biostatistics"],
        "Education": ["lesson planning", "teaching", "content creation", "assessment", "classroom management"],
        "Electrical": ["pcb design", "embedded", "soldering", "power systems", "circuit analysis"],
        "Railway": ["safety", "operations", "signal systems", "maintenance", "documentation"],
        "Finance": ["excel", "tally", "accounting", "financial modeling", "gst", "audit"],
        "Logistics": ["inventory", "warehouse ops", "routing", "ms excel", "procurement"],
        "E-commerce": ["cataloging", "customer support", "order management", "marketplace ops"],
        "Automotive": ["vehicle diagnostics", "cad", "quality checks", "supply chain", "assembly"],
        "Telecom": ["networking", "rf planning", "troubleshooting", "fiber splicing"],
        "Energy": ["power systems", "safety", "operations", "maintenance", "documentation"],
        "Banking": ["excel", "accounting", "financial modeling", "audit", "customer service"],
        "Oil & Gas": ["safety", "operations", "maintenance", "documentation", "quality control"],
        "Steel": ["cad", "quality control", "supply chain", "safety", "operations"],
        "FMCG": ["supply chain", "quality control", "operations"],
        "Coal": ["safety", "operations", "maintenance", "documentation"],
        "Power": ["power systems", "electrical", "safety", "operations", "maintenance"]
    }


def get_common_soft_skills() -> list[str]:
    """Return common soft skills"""
    return ["communication", "teamwork", "problem solving", "time management", "presentation", "writing"]


def get_education_levels() -> list[str]:
    """Return education level requirements"""
    return ["Diploma", "UG", "PG", "Any"]


def get_cities_and_states() -> dict:
    """Return cities mapped to their states"""
    return {
        "Bengaluru": "Karnataka",
        "Mumbai": "Maharashtra", 
        "Delhi": "Delhi",
        "Chennai": "Tamil Nadu",
        "Hyderabad": "Telangana",
        "Pune": "Maharashtra",
        "Kolkata": "West Bengal",
        "Ahmedabad": "Gujarat",
        "Jaipur": "Rajasthan",
        "Lucknow": "Uttar Pradesh",
        "Patna": "Bihar",
        "Ranchi": "Jharkhand",
        "Bhubaneswar": "Odisha",
        "Kochi": "Kerala",
        "Chandigarh": "Punjab",
        "Gurugram": "Haryana",
        "Noida": "Uttar Pradesh",
        "Indore": "Madhya Pradesh",
        "Bhopal": "Madhya Pradesh",
        "Coimbatore": "Tamil Nadu"
    }


def get_location_types() -> list[str]:
    """Return location type categories"""
    return ["Metro", "Tier-2", "Rural", "Aspirational district"]


def get_preferred_applicants_from() -> list[str]:
    """Return preferred applicant categories"""
    return ["Any", "Local State", "Rural Only"]


def get_internship_statuses() -> list[str]:
    """Return internship status options"""
    return ["Open", "Closed", "Filled"]


def get_internship_modes() -> list[str]:
    """Return internship mode options"""
    return ["Onsite", "Remote", "Hybrid"]


def get_sectors() -> list[str]:
    """Return sector categories for internships - unified with applicants dataset"""
    return [
        "IT", "Manufacturing", "Healthcare", "Education", "Electrical", "Software",
        "Railway", "Finance", "Logistics", "E-commerce", "Automotive", "Telecom",
        "Energy", "Banking"
    ]


def get_role_titles() -> list[str]:
    """Return common internship role titles"""
    return [
        "Data Analyst Intern", "Software Development Intern", "Mechanical Design Intern",
        "Marketing Intern", "Finance Intern", "HR Intern", "Operations Intern",
        "Research Intern", "Quality Assurance Intern", "Business Analyst Intern",
        "Content Writing Intern", "Graphic Design Intern", "Sales Intern",
        "Supply Chain Intern", "Project Management Intern", "Digital Marketing Intern",
        "Product Management Intern", "Data Science Intern", "Web Development Intern",
        "Mobile App Development Intern", "Cybersecurity Intern", "Cloud Computing Intern",
        "IoT Intern", "AI/ML Intern", "Blockchain Intern", "DevOps Intern"
    ]


def generate_internship_id(internship_counter: int) -> str:
    """Generate internship ID in format I001, I002, etc."""
    return f"I{internship_counter:03d}"


def generate_skills_required(industry_type: str, sector: str) -> str:
    """Generate skills required based on industry and sector"""
    skills_pool = get_skills_pool()
    common_soft_skills = get_common_soft_skills()
    
    # Start with common soft skills
    skills = set(common_soft_skills)
    
    # Add industry-specific skills
    if industry_type in skills_pool:
        skills.update(skills_pool[industry_type])
    
    # Add sector-specific skills
    if sector in skills_pool:
        skills.update(skills_pool[sector])
    
    # Convert to list and select 4-8 skills
    skills_list = list(skills)
    num_skills = random.randint(4, 8)
    selected_skills = random.sample(skills_list, min(num_skills, len(skills_list)))
    
    return "; ".join(sorted(selected_skills))


def generate_dates() -> tuple[str, str, str]:
    """Generate start date, application deadline, and date posted"""
    # Date posted (within last 30 days)
    date_posted = datetime.now() - timedelta(days=random.randint(1, 30))
    
    # Start date (1-3 months from now)
    start_date = datetime.now() + timedelta(days=random.randint(30, 90))
    
    # Application deadline (1-2 weeks before start date)
    deadline = start_date - timedelta(days=random.randint(7, 14))
    
    return (
        start_date.strftime("%d-%m-%Y"),
        deadline.strftime("%d-%m-%Y"),
        date_posted.strftime("%d-%m-%Y")
    )


def generate_cgpa_requirement() -> str:
    """Generate minimum CGPA/percentage requirement"""
    if random.random() < 0.3:
        return ""  # No specific requirement
    elif random.random() < 0.6:
        # CGPA format
        cgpa = round(random.uniform(6.0, 9.5), 1)
        return str(cgpa)
    else:
        # Percentage format
        percentage = random.randint(60, 90)
        return f"{percentage}%"


def determine_company_attributes(company_name: str) -> tuple[str, str, str]:
    """Determine industry, size, and ownership based on company name"""
    # Industry mapping based on company names
    industry_map = {
        "RELIANCE INDUSTRIES": "Energy",
        "TATA CONSULTANCY": "IT", 
        "HDFC BANK": "Banking",
        "OIL AND NATURAL GAS": "Oil & Gas",
        "INFOSYS": "IT",
        "NTPC": "Power",
        "TATA STEEL": "Steel",
        "ITC": "FMCG",
        "INDIAN OIL": "Oil & Gas",
        "ICICI BANK": "Banking",
        "POWER GRID": "Power",
        "TATA SONS": "IT",
        "WIPRO": "IT",
        "HCL TECHNOLOGIES": "IT",
        "HINDUSTAN ZINC": "Manufacturing",
        "RELIANCE JIO": "Telecom",
        "MAHANADI COALFIELDS": "Coal",
        "TECH MAHINDRA": "IT",
        "HINDUSTAN UNILEVER": "FMCG",
        "AXIS BANK": "Banking"
    }
    
    # Find matching industry
    industry = "IT"  # default
    for key, value in industry_map.items():
        if key in company_name:
            industry = value
            break
    
    # Size determination
    if any(keyword in company_name for keyword in ["BANK", "CORPORATION", "LIMITED"]):
        if "PSU" in company_name or any(psu in company_name for psu in ["OIL", "NTPC", "POWER GRID", "MAHANADI"]):
            size = "PSU"
        else:
            size = "Large Enterprise"
    else:
        size = random.choice(["MSME", "Large Enterprise"])
    
    # Ownership determination
    if any(psu in company_name for psu in ["OIL", "NTPC", "POWER GRID", "MAHANADI"]):
        ownership = "PSU"
    elif "BANK" in company_name:
        ownership = "Private"
    else:
        ownership = random.choice(["Private", "PSU"])
    
    return industry, size, ownership


def generate_company_data(company_id: int, company_name: str, slots_for_this_company: int) -> dict:
    """Generate data for a single company with exactly 1 internship"""
    industry, size, ownership = determine_company_attributes(company_name)
    
    # Generate exactly 1 internship per company
    internship_id = generate_internship_id(company_id - 100)  # I001, I002, etc.
    role_title = random.choice(get_role_titles())
    sector = random.choice(get_sectors())
    mode = random.choice(get_internship_modes())
    start_date, deadline, date_posted = generate_dates()
    skills_required = generate_skills_required(industry, sector)
    education_required = random.choice(get_education_levels())
    min_cgpa = generate_cgpa_requirement()
    
    # Location data
    cities_states = get_cities_and_states()
    city = random.choice(list(cities_states.keys()))
    state = cities_states[city]
    location_type = random.choice(get_location_types())
    preferred_applicants = random.choice(get_preferred_applicants_from())
    status = "Open"  # All internships are Open
    
    internship = {
        "Internship_ID": internship_id,
        "Role_Title": role_title,
        "Sector": sector,
        "Mode": mode,
        "Start_Date": start_date,
        "Application_Deadline": deadline,
        "Skills_Required": skills_required,
        "Education_Required": education_required,
        "Minimum_CGPA_Percentage": min_cgpa,
        "Total_Slots": slots_for_this_company,
        "City": city,
        "State_UT": state,
        "Location_Type": location_type,
        "Preferred_Applicants_From": preferred_applicants,
        "Internship_Status": status,
        "Date_Posted": date_posted
    }
    
    internships = [internship]
    
    return {
        "Company_ID": company_id,
        "Company_Name": company_name,
        "Industry_Type": industry,
        "Company_Size": size,
        "Ownership_Type": ownership,
        "Internships": internships
    }


def generate_realistic_slots_distribution() -> list[int]:
    """Generate realistic slot distribution that sums to 200"""
    # Possible slot values: 7, 8, 10, 11, 12
    possible_slots = [7, 8, 10, 11, 12]
    slots_per_company = []
    remaining_slots = 200
    remaining_companies = 20
    
    # Distribute slots randomly but ensure we reach exactly 200
    for i in range(20):
        if i == 19:  # Last company gets all remaining slots
            slots_per_company.append(remaining_slots)
        else:
            # Calculate max possible slots for this company
            max_slots = min(12, remaining_slots - (remaining_companies - 1) * 7)  # Ensure we can reach 200
            min_slots = max(7, remaining_slots - (remaining_companies - 1) * 12)  # Ensure we don't exceed 200
            
            # Filter possible slots within range
            valid_slots = [s for s in possible_slots if min_slots <= s <= max_slots]
            
            if valid_slots:
                slots = random.choice(valid_slots)
            else:
                # Fallback to average if no valid slots
                slots = remaining_slots // remaining_companies
            
            slots_per_company.append(slots)
            remaining_slots -= slots
            remaining_companies -= 1
    
    return slots_per_company


def generate_companies_dataset() -> list[dict]:
    """Generate the complete companies dataset"""
    company_names = get_company_names()
    companies_data = []
    
    # Generate realistic slot distribution
    slots_per_company = generate_realistic_slots_distribution()
    
    # Verify total slots = 200
    total_slots = sum(slots_per_company)
    print(f"Total slots distributed: {total_slots}")
    print(f"Slots per company: {slots_per_company}")
    
    for i, company_name in enumerate(company_names, 101):
        company_data = generate_company_data(i, company_name, slots_per_company[i-101])
        companies_data.append(company_data)
    
    return companies_data


def flatten_companies_data(companies_data: list[dict]) -> list[dict]:
    """Flatten the nested structure for CSV output"""
    flattened = []
    
    for company in companies_data:
        for internship in company["Internships"]:
            row = {
                "Company_ID": company["Company_ID"],
                "Company_Name": company["Company_Name"],
                "Industry_Type": company["Industry_Type"],
                "Company_Size": company["Company_Size"],
                "Ownership_Type": company["Ownership_Type"],
                **internship
            }
            flattened.append(row)
    
    return flattened


def save_to_csv(rows: list[dict], output_path: str) -> None:
    """Save data to CSV file"""
    if not rows:
        return
    
    fieldnames = list(rows[0].keys())
    with open(output_path, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    """Main function to generate and save companies dataset"""
    random.seed(42)  # For reproducible results
    
    datasets_dir = os.path.join(os.path.dirname(__file__))
    ensure_datasets_dir(datasets_dir)
    
    # Generate companies data
    companies_data = generate_companies_dataset()
    
    # Flatten for CSV
    flattened_data = flatten_companies_data(companies_data)
    
    # Verify total slots = 200
    total_slots = sum(int(row["Total_Slots"]) for row in flattened_data)
    print(f"Total slots generated: {total_slots}")
    
    # Save to CSV
    output_csv = os.path.join(datasets_dir, "companies.csv")
    save_to_csv(flattened_data, output_csv)
    
    print(f"Generated {len(companies_data)} companies with {len(flattened_data)} internship positions")
    print(f"Dataset saved to: {output_csv}")


if __name__ == "__main__":
    main()
