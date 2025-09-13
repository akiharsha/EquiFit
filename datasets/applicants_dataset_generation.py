import csv
import os
import random
import string
from datetime import datetime, timedelta


def ensure_datasets_dir(path: str) -> None:
    if not os.path.exists(path):
        os.makedirs(path, exist_ok=True)


def generate_name_and_gender() -> tuple[str, str]:
    male_first_names = [
        "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Mohammed",
        "Krishna", "Ishaan", "Shaurya", "Atharv", "Dhruv", "Kabir", "Ritvik", "Rohan",
        "Kunal", "Abhishek", "Harsh", "Yash", "Siddharth", "Nitin", "Rakesh", "Amit",
        "Ravi", "Sanjay", "Alok", "Vikram", "Pranav", "Anirudh", "Varun", "Tarun",
        "Karthik", "Suresh", "Mahesh", "Sunil", "Deepak", "Rajesh", "Pankaj", "Manish",
        "Naveen", "Arvind", "Gaurav", "Aakash", "Harshit", "Raghav", "Kapil", "Ayan",
        "Farhan", "Imran", "Nikhil", "Ankit", "Rajat", "Akhil", "Parth", "Hardik",
        "Jay", "Om", "Tejas", "Prakash", "Jitesh", "Vishal", "Ritesh", "Sagar",
        "Ayan", "Sameer", "Azeem", "Himanshu", "Mayank", "Rohit", "Sumit", "Abdul",
        "Ashish", "Aman", "Piyush", "Shubham", "Utkarsh", "Yuvraj", "Lakshay", "Vineet",
        "Anup", "Bhavesh", "Chirag", "Dinesh", "Hemant", "Jagdish", "Lalit", "Mohan",
        "Nitesh", "Punit", "Rupesh", "Shivam", "Tushar", "Uday", "Venkatesh", "Zubair",
        "Ajay", "Vijay", "Ajeet", "Anand", "Balaji", "Bikram"
    ]
    female_first_names = [
        "Neha", "Aisha", "Ananya", "Isha", "Diya", "Aaradhya", "Saanvi", "Anika",
        "Ishita", "Aditi", "Priya", "Sneha", "Kavya", "Riya", "Pooja", "Shruti", "Nidhi",
        "Meera", "Tanvi", "Shreya", "Mansi", "Pallavi", "Sanya", "Harini", "Anushka",
        "Kritika", "Sakshi", "Radhika", "Bhavya", "Charvi", "Trisha", "Srishti", "Harshita",
        "Jahnavi", "Nandini", "Navya", "Pavitra", "Poorvi", "Prerna", "Ritika", "Simran",
        "Tanya", "Vaishnavi", "Yamini", "Zara", "Akanksha", "Ayesha", "Farah", "Hina",
        "Kiran", "Lavanya", "Madhuri", "Manisha", "Monika", "Nikita", "Pallavi", "Payal",
        "Poonam", "Rupali", "Sangeeta", "Seema", "Shalini", "Shikha", "Shweta", "Sonali",
        "Supriya", "Swati", "Tulsi", "Uma", "Vidya", "Anvi", "Mahima", "Aparna", "Roshni",
        "Ira", "Pari", "Avni", "Bhumi", "Chhavi", "Divya", "Garima", "Heena", "Ishani",
        "Jiya", "Khushi", "Mitali", "Niharika", "Ojasvi", "Pihu", "Raina", "Samiksha",
        "Tanisha", "Urvi", "Vasudha", "Yashika", "Zoya", "Aarohi"
    ]
    last_names = [
        "Sharma", "Verma", "Gupta", "Patel", "Reddy", "Iyer", "Nair", "Das", "Singh",
        "Khan", "Chaudhary", "Yadav", "Agarwal", "Mishra", "Tiwari", "Ghosh", "Bose",
        "Mukherjee", "Kulkarni", "Joshi", "Bhat", "Shetty", "Pillai", "Mehta", "Jain",
        "Chopra", "Kapoor", "Malhotra", "Saxena", "Srivastava", "Tripathi"
    ]
    if random.random() < 0.5:
        first = random.choice(male_first_names)
        gender = "Male"
    else:
        first = random.choice(female_first_names)
        gender = "Female"
    full_name = f"{first} {random.choice(last_names)}"
    return full_name, gender


# Gender is derived from the chosen first name; no separate generator needed.


def generate_phone() -> str:
    # Indian mobile numbers start with 6-9 and are 10 digits
    first_digit = str(random.choice([6, 7, 8, 9]))
    remaining = "".join(random.choices(string.digits, k=9))
    return f"+91{first_digit}{remaining}"


def sanitize_email_local(local: str) -> str:
    return "".join(ch for ch in local.lower() if ch.isalnum() or ch in {'.', '_'})


def generate_email(name: str) -> str:
    domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "proton.me", "rediffmail.com"]
    local = sanitize_email_local(name.replace(" ", "."))
    suffix = str(random.randint(1, 999)) if random.random() < 0.4 else ""
    return f"{local}{suffix}@{random.choice(domains)}"


def generate_education_level() -> str:
    # At least 10th/SSC; include 12th/ITI/Diploma/Graduation
    levels = [
        "10th",
        "12th",
        "ITI",
        "Diploma",
        "Graduation",
    ]
    # Bias towards higher levels for internship applicants
    return random.choices(levels, weights=[10, 20, 15, 20, 35])[0]


def generate_field_of_study() -> str:
    fields = [
        "Engineering", "Arts", "Commerce", "Medicine", "Science", "Law", "Pharmacy",
        "Management", "Design", "Agriculture", "Education"
    ]
    return random.choice(fields)


def generate_cgpa_or_percentage() -> str:
    # Either a CGPA on 10, or a percentage
    if random.random() < 0.55:
        # CGPA between 5.0 and 10.0
        value = round(random.uniform(5.0, 10.0), 2)
        return f"{value}"
    else:
        # Percentage between 50 and 95
        value = random.randint(50, 95)
        return f"{value}%"


def generate_institution_type() -> str:
    return random.choices(["Govt.", "Private", "Tier-2", "Tier-3", "Rural college"], weights=[20, 55, 10, 10, 5])[0]


def generate_income_rupees() -> int:
    # Family income ≤ 8,00,000
    return random.randint(60000, 800000)


def generate_income_certificate_id() -> str:
    # Format: STATECODE-YYYY-XXXXXXXX
    state_codes = [
        "MH", "DL", "KA", "TN", "GJ", "RJ", "UP", "WB", "KL", "TS", "PB", "HR", "MP", "BR", "OD"
    ]
    year = random.choice([2022, 2023, 2024, 2025])
    serial = ''.join(random.choices(string.digits, k=8))
    return f"{random.choice(state_codes)}-{year}-{serial}"


def generate_sector_preferences() -> str:
    sectors = [
        "IT", "Manufacturing", "Healthcare", "Education", "Electrical", "Software",
        "Railway", "Finance", "Logistics", "E-commerce", "Automotive", "Telecom"
    ]
    # 2-4 preferences; CSV-safe as semicolon-separated
    k = random.randint(2, 4)
    return "; ".join(random.sample(sectors, k))


def generate_internship_mode() -> str:
    return random.choices(["Remote", "In-person", "Hybrid"], weights=[40, 35, 25])[0]


def generate_boolean_yes_no(true_prob: float = 0.5) -> str:
    return "Yes" if random.random() < true_prob else "No"


def generate_social_category_and_disability() -> tuple[str, str]:
    categories = ["SC", "ST", "OBC", "PwD", "General"]
    weights = [18, 9, 41, 3, 29]  # Rough distribution with PwD minority
    cat = random.choices(categories, weights=weights)[0]
    if cat == "PwD":
        disability = "Yes"
    else:
        # Small probability of disability outside PwD category
        disability = "Yes" if random.random() < 0.02 else "No"
    # Map General into not explicitly requested column but keep category values requested
    if cat == "General":
        cat = "OBC" if random.random() < 0.5 else "SC"  # keep within requested set
    return cat, disability


def generate_skills(sector_prefs: str, field_of_study: str) -> str:
    sector_to_skills = {
        "IT": ["python", "java", "sql", "git", "html", "css", "javascript", "react", "testing", "linux"],
        "Software": ["oop", "data structures", "algorithms", "docker", "api design", "unit testing"],
        "Manufacturing": ["cad", "cam", "lean", "six sigma", "cnc", "quality control", "supply chain"],
        "Healthcare": ["first aid", "patient care", "record keeping", "lab techniques", "biostatistics"],
        "Education": ["lesson planning", "teaching", "content creation", "assessment", "classroom management"],
        "Electrical": ["pcb design", "embedded", "soldering", "power systems", "circuit analysis"],
        "Railway": ["safety", "operations", "signal systems", "maintenance", "documentation"],
        "Finance": ["excel", "tally", "accounting", "financial modeling", "gst", "audit"],
        "Logistics": ["inventory", "warehouse ops", "routing", "ms excel", "procurement"],
        "E-commerce": ["cataloging", "customer support", "order management", "marketplace ops", "seo"],
        "Automotive": ["vehicle diagnostics", "cad", "quality checks", "supply chain", "assembly"],
        "Telecom": ["networking", "rf planning", "troubleshooting", "fiber splicing"],
    }
    common_soft_skills = [
        "communication", "teamwork", "problem solving", "time management", "presentation", "writing"
    ]
    # Build a pool based on preferred sectors
    pool: set[str] = set(common_soft_skills)
    for sector in [s.strip() for s in sector_prefs.split(";")]:
        if sector in sector_to_skills:
            pool.update(sector_to_skills[sector])
    # Add a few based on field of study
    field_map = {
        "Engineering": ["matlab", "autocad", "project management"],
        "Arts": ["content writing", "research", "design basics"],
        "Commerce": ["accounting", "excel", "market research"],
        "Medicine": ["lab safety", "documentation", "basic life support"],
        "Science": ["data analysis", "statistics", "lab techniques"],
        "Law": ["legal research", "drafting", "case analysis"],
        "Pharmacy": ["pharmacology", "qc", "gmp"],
        "Management": ["ms excel", "operations", "reporting"],
        "Design": ["figma", "adobe xd", "ui principles"],
        "Agriculture": ["soil testing", "field work", "supply chain"],
        "Education": ["lesson planning", "assessment", "teaching"],
    }
    pool.update(field_map.get(field_of_study, []))
    pool_list = sorted(pool)
    k = min(len(pool_list), random.randint(4, 8))
    return "; ".join(sorted(random.sample(pool_list, k)))


def generate_aadhar() -> str:
    # 12-digit numeric (not real)
    return ''.join(random.choices(string.digits, k=12))


def generate_location_preference() -> str:
    state_to_city = {
        "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
        "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
        "Delhi": ["New Delhi"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
        "West Bengal": ["Kolkata", "Siliguri"],
        "Telangana": ["Hyderabad", "Warangal"],
        "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode"],
        "Uttar Pradesh": ["Lucknow", "Noida", "Kanpur"],
        "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur"],
        "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior"],
        "Punjab": ["Chandigarh", "Ludhiana"],
        "Haryana": ["Gurugram", "Faridabad"],
        "Bihar": ["Patna", "Gaya"],
        "Odisha": ["Bhubaneswar", "Cuttack"],
    }
    state = random.choice(list(state_to_city.keys()))
    city = random.choice(state_to_city[state])
    return f"{state} / {city}"


def generate_application_date() -> str:
    # Random date within the last 365 days
    end_date = datetime.today()
    start_date = end_date - timedelta(days=365)
    random_date = start_date + timedelta(days=random.randint(0, 365))
    return random_date.strftime("%d-%m-%Y")


def generate_previous_internship_sector(past_participation: str) -> str:
    if past_participation == "No":
        return ""
    return random.choice([
        "IT", "Healthcare", "Manufacturing", "Education", "Finance", "Automotive",
        "Software", "Telecom", "E-commerce"
    ])


def build_row(applicant_id: int) -> dict:
    name, gender = generate_name_and_gender()
    age = random.randint(21, 24)
    phone = generate_phone()
    email = generate_email(name)
    education_level = generate_education_level()
    field = generate_field_of_study()
    score = generate_cgpa_or_percentage()
    institution_type = generate_institution_type()
    income = generate_income_rupees()
    income_cert = generate_income_certificate_id()
    sector_prefs = generate_sector_preferences()
    internship_mode = generate_internship_mode()
    past_participation = generate_boolean_yes_no(0.35)
    prev_sector = generate_previous_internship_sector(past_participation)
    social_cat, disability_status = generate_social_category_and_disability()
    skills = generate_skills(sector_prefs, field)
    aadhar = generate_aadhar()
    willing_to_relocate = generate_boolean_yes_no(0.6)
    preferred_industry_type = random.choice(["PSU", "MSME", "Startup", "Corporate"])
    preferred_company_size = random.choice(["Small", "Medium", "Large"])
    location_pref = generate_location_preference()
    application_date = generate_application_date()

    # Enforce constraints that are constants in spec
    employee_or_student = "No"
    family_govt_employment = "No"

    return {
        "Applicant_ID": applicant_id,
        "Name": name,
        "Gender": gender,
        "Age": age,
        "Phone": phone,
        "Email": email,
        "Employee_or_Student": employee_or_student,
        "Education_Level": education_level,
        "Field_of_Study": field,
        "CGPA_or_Percentage": score,
        "Institution_Type": institution_type,
        "Family_Income_INR": income,
        "Income_Certificate_ID": income_cert,
        "Family_Permanent_Govt_Employment": family_govt_employment,
        "Sector_Preferences": sector_prefs,
        "Internship_Mode": internship_mode,
        "Past_Participation": past_participation,
        "Previous_Internship_Sector": prev_sector,
        "Social_Category": social_cat,
        "Skills": skills,
        "Aadhar_Number": aadhar,
        "Willingness_to_Relocate": willing_to_relocate,
        "Disability_Status": disability_status,
        "Preferred_Industry_Type": preferred_industry_type,
        "Preferred_Company_Size": preferred_company_size,
        "Location_Preference": location_pref,
        "Application_Date": application_date,
    }


def generate_dataset(num_rows: int = 1000, start_id: int = 1001) -> list[dict]:
    rows: list[dict] = []
    used_emails: set[str] = set()
    used_phones: set[str] = set()
    used_aadhar: set[str] = set()

    for i in range(num_rows):
        attempt = 0
        while True:
            attempt += 1
            row = build_row(start_id + i)
            # Deduplicate critical identifiers
            if row["Email"] in used_emails or row["Phone"] in used_phones or row["Aadhar_Number"] in used_aadhar:
                if attempt > 5:
                    # Force mutate email if collisions persist
                    row["Email"] = row["Email"].split("@")[0] + f"_{random.randint(100,999)}@" + row["Email"].split("@")[1]
                    row["Phone"] = generate_phone()
                    row["Aadhar_Number"] = generate_aadhar()
                    break
                continue
            break
        used_emails.add(row["Email"])
        used_phones.add(row["Phone"])
        used_aadhar.add(row["Aadhar_Number"])
        # Sanity check income cap
        if row["Family_Income_INR"] > 800000:
            row["Family_Income_INR"] = 800000
        rows.append(row)
    return rows


def save_to_csv(rows: list[dict], output_path: str) -> None:
    if not rows:
        return
    fieldnames = list(rows[0].keys())
    with open(output_path, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    random.seed(42)  # reproducible
    datasets_dir = os.path.join(os.path.dirname(__file__))
    ensure_datasets_dir(datasets_dir)

    rows = generate_dataset(num_rows=1000, start_id=1001)
    output_csv = os.path.join(datasets_dir, "internship_applicants.csv")
    save_to_csv(rows, output_csv)
    print(f"Generated {len(rows)} rows -> {output_csv}")


if __name__ == "__main__":
    main()


