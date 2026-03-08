// ============================================================================
// data.js — The Dashboard of Me: All Site Content
// Vivek Patel | Portfolio Website
// ============================================================================

// ---------------------------------------------------------------------------
// 1. Personal Info
// ---------------------------------------------------------------------------
export const personalInfo = {
  name: "Vivek Patel",
  titles: ["Operations Analyst", "Data Scientist", "Full Stack Developer"],
  tagline: "Everyone's got data. Not everyone knows what it's saying.",
  rotatingTitles: [
    "Operations Analyst",
    "Data Scientist",
    "Full Stack Developer",
    "Dashboard Alchemist",
    "Python Whisperer",
  ],
  email: "vspatel360@gmail.com",
  phone: "(480) 233-8735",
  location: "Augusta, GA",
  origin: "London, UK",
  linkedin: "https://www.linkedin.com/in/vspatel360",
  github: "https://github.com/V1vek98",
  resumePath: "/Vivek Patel Resume.pdf",
  profileImage: "/Vivek Patel LinkedIn Profile Pic.jpg",
  bio: "Operations analyst and full-stack developer who transforms raw data into actionable intelligence.",
};

// ---------------------------------------------------------------------------
// 2. Hero KPI Cards
// ---------------------------------------------------------------------------
export const heroKPIs = [
  {
    label: "Years Experience",
    value: "5+",
    sparkData: [2, 3, 4, 5, 6, 7, 8],
    trend: "up",
    trendValue: "+20%",
    color: "#4285F4",
    tooltip: "And counting...",
  },
  {
    label: "Projects Shipped",
    value: "30+",
    sparkData: [3, 5, 8, 12, 18, 24, 30],
    trend: "up",
    trendValue: "+25%",
    color: "#34A853",
    tooltip: "From dashboards to full-stack apps",
  },
  {
    label: "Manual Reports Killed",
    value: "150+",
    sparkData: [10, 30, 55, 80, 110, 135, 150],
    trend: "up",
    trendValue: "Automated",
    color: "#EA4335",
    tooltip: "They had it coming",
  },
  {
    label: "Coffee:Code Ratio",
    value: "1:1",
    sparkData: [1, 1, 1, 1, 1, 1, 1],
    trend: "flat",
    trendValue: "Stable",
    color: "#FBBC05",
    tooltip: "Perfectly balanced",
  },
];

// ---------------------------------------------------------------------------
// 3. Python Class Bio
// ---------------------------------------------------------------------------
export const pythonClassBio = `class VivekPatel:
    """Data Scientist"""

    def __init__(self):
        self.name = "Vivek Patel"
        self.origin = "London, UK"
        self.base = "Augusta, GA"
        self.education = "BSc Mathematics"
        self.role = "Operations Analyst"
        self.side_quests = ["Full Stack Dev", "Data Engineering"]
        self.superpower = "turning data into decisions"

    def get_skills(self):
        return {
            "languages": ["Python", "SQL", "TypeScript"],
            "frameworks": ["React", "Node.js", "Flask"],
            "data": ["PowerBI", "Tableau", "PostgreSQL"],
            "tools": ["Azure DevOps", "Git", "Pandas"]
        }

    def daily_routine(self):
        while self.superpower:
            self.write_code()
            self.analyze_data()
            self.automate_everything()
            # TODO: Remember to sleep

    def __repr__(self):
        return "Available for interesting opportunities"`;

// ---------------------------------------------------------------------------
// 4. Status Badges
// ---------------------------------------------------------------------------
export const statusBadges = [
  { label: "ONLINE", color: "green", pulse: true },
  { label: "CERTIFIED", color: "blue", icon: "award" },
  { label: "GOLD x2", color: "yellow", icon: "trophy" },
  { label: "BSc Maths", color: "purple", icon: "graduation-cap" },
  { label: "UK \u2192 US", color: "red", icon: "plane" },
];

// ---------------------------------------------------------------------------
// 5. Experiences (Git Commit Timeline)
// ---------------------------------------------------------------------------
export const experiences = [
  {
    id: 1,
    commitHash: "a3f7b2c",
    commitTag: "v5.0-current",
    company: "KSB GIW",
    title: "Operations Analyst",
    location: "Augusta, GA",
    period: "Sep 2025 \u2013 Present",
    wittyLine: "Where I turned chaos into dashboards",
    wittyDetail: "Replacing legacy reporting with automated Flask dashboards",
    achievements: [
      "Revamping analytics infrastructure by replacing legacy manual reporting with automated Python Flask dashboards and scheduled data pipelines",
      "Built secure web dashboards with user authentication and JWT token-based access control for role-specific data views",
      "Built statistical forecasting models for product usage and demand planning, reducing operational over-inventory by 10%",
      "Developing AI agents and embedded AI workflows to automate repetitive operational tasks and streamline decision-making processes",
    ],
    technologies: ["Python", "Flask", "PostgreSQL", "JWT", "Azure DevOps"],
    metrics: {
      inventory_reduction: "10%",
      dashboards_built: "5+",
      pipelines_automated: "12+",
    },
  },
  {
    id: 2,
    commitHash: "e8d1f4a",
    commitTag: "v4.0",
    company: "NorthStarHosp",
    title: "Full Stack Developer (Contract)",
    location: "Remote",
    period: "Feb 2025 \u2013 Sep 2025",
    wittyLine: "Where I automated the entire nightly audit pipeline",
    wittyDetail: "Built a full-stack hotel analytics platform from scratch",
    achievements: [
      "Built a full-stack hotel analytics platform (React, TypeScript, Python) with executive, financial, and operational dashboards",
      "Fully automated the nightly audit pipeline end-to-end, from Gmail API ingestion and PDF parsing with PyPDF2/pandas to CSV output",
      "Designed interactive Recharts/Mantine UI dashboards with KPI cards, revenue heatmaps, occupancy trends, and multi-property comparison views",
      "Implemented role-based authentication with property-level access controls",
    ],
    technologies: ["React", "TypeScript", "Python", "PyPDF2", "Pandas", "Recharts", "Mantine UI"],
    metrics: {
      manual_entry_eliminated: "100%",
      hotel_properties: 3,
      dashboards: "6+",
    },
  },
  {
    id: 3,
    commitHash: "b5c9d3e",
    commitTag: "v3.0",
    company: "FEV Tutor",
    title: "Senior Data Analyst",
    location: "Remote",
    period: "Oct 2022 \u2013 Jan 2025",
    wittyLine: "Where I killed 90% of manual reporting",
    wittyDetail: "Reduced manual reporting by 90% through automation",
    achievements: [
      "Led a team of data analysts to develop automated reporting using PowerBI for internal stakeholders and clients",
      "Reduced manual reporting by 90% through Python scripting, SQL queries, PowerBI and Tableau dashboards while boosting user engagement by 80%",
      "Designed and implemented data warehouses and database schemas, unifying data across Salesforce, UserPilot and other third-party providers",
      "Spearheaded research collaborations with Stanford University and the National Student Support Accelerator (NSSA)",
      "Guided product roadmaps for data-driven solutions, identifying new revenue opportunities and enhancing scalability",
    ],
    technologies: ["Python", "SQL", "PowerBI", "Tableau", "Salesforce", "PostgreSQL"],
    metrics: {
      reporting_reduction: "90%",
      engagement_increase: "80%",
      research_partners: 2,
    },
  },
  {
    id: 4,
    commitHash: "c2a8e6f",
    commitTag: "v2.0",
    company: "PetThinQ",
    title: "NLP Analyst",
    location: "London, UK",
    period: "Mar 2021 \u2013 Oct 2022",
    wittyLine: "Where I taught machines to understand pet owners",
    wittyDetail: "Fine-tuned RoBERTa models for topic classification",
    achievements: [
      "Extracted and cleansed data using Python libraries (Requests, Beautiful Soup, and Selenium)",
      "Utilised NLTK, spaCy, and regular expressions for comprehensive textual data preprocessing",
      "Performed advanced topic modelling to categorise large datasets for strategic analyses",
      "Implemented and fine-tuned RoBERTa models for topic classification, boosting accuracy and efficiency",
      "Built multiple interactive Tableau dashboards providing actionable stakeholder insights",
    ],
    technologies: ["Python", "NLTK", "spaCy", "Selenium", "Beautiful Soup", "Tableau", "RoBERTa"],
    metrics: {
      model_accuracy: "95%",
      reviews_analyzed: "1M+",
      dashboards: "5+",
    },
  },
  {
    id: 5,
    commitHash: "d7f3a1b",
    commitTag: "v1.0",
    company: "IT Specialists",
    title: "Computer Hardware & Software Specialist",
    location: "London, UK",
    period: "Jan 2020 \u2013 Mar 2021",
    wittyLine: "Where 'Have you tried turning it off and on again?' was actual advice",
    wittyDetail: "Hardware and software support across the board",
    achievements: [
      "Gained more than two years of experience with invoicing and accounting software (QuickBooks)",
      "Troubleshot and resolved a wide variety of computer hardware and software issues",
      "Successfully negotiated long-term software and hardware maintenance contracts",
    ],
    technologies: ["QuickBooks", "Hardware Repair", "Software Troubleshooting"],
    metrics: {
      tickets_resolved: "500+",
      customer_satisfaction: "95%",
    },
  },
];

// ---------------------------------------------------------------------------
// 6. Education
// ---------------------------------------------------------------------------
export const education = {
  degree: "BSc Mathematics",
  school: "University of Portsmouth",
  year: "2019",
  grade: "Upper Second Class (2:1)",
  commitHash: "f1a2b3c",
  commitTag: "v0.1-origin",
  wittyLine: "git init career",
  highlights: [
    "Upper Second Class (2:1)",
    "Treasurer of Water Polo Society",
    "Treasurer of Swimming Society",
  ],
};

// ---------------------------------------------------------------------------
// 7. Skill Categories
// ---------------------------------------------------------------------------
export const skillCategories = [
  {
    name: "Languages",
    icon: "code",
    skills: [
      { name: "Python", proficiency: 92, years: 5 },
      { name: "SQL", proficiency: 90, years: 5 },
      { name: "TypeScript", proficiency: 82, years: 3 },
      { name: "JavaScript", proficiency: 88, years: 5 },
      { name: "HTML/CSS", proficiency: 90, years: 6 },
    ],
  },
  {
    name: "Frameworks",
    icon: "layers",
    skills: [
      { name: "React", proficiency: 85, years: 4 },
      { name: "Node.js", proficiency: 80, years: 4 },
      { name: "Flask", proficiency: 78, years: 3 },
      { name: "Pandas", proficiency: 90, years: 4 },
      { name: "Tailwind CSS", proficiency: 88, years: 3 },
    ],
  },
  {
    name: "Data & Analytics",
    icon: "bar-chart-2",
    skills: [
      { name: "PowerBI", proficiency: 92, years: 3 },
      { name: "Tableau", proficiency: 85, years: 3 },
      { name: "PostgreSQL", proficiency: 85, years: 4 },
      { name: "OracleDB", proficiency: 78, years: 3 },
      { name: "MongoDB", proficiency: 75, years: 2 },
      { name: "Recharts", proficiency: 80, years: 2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// 8. Radar Skills
// ---------------------------------------------------------------------------
export const radarSkills = [
  { axis: "Frontend", value: 82 },
  { axis: "Backend", value: 80 },
  { axis: "Data Engineering", value: 88 },
  { axis: "NLP / ML", value: 78 },
  { axis: "BI & Visualization", value: 92 },
  { axis: "Analytics", value: 90 },
];

// ---------------------------------------------------------------------------
// 9. Sidebar Links
// ---------------------------------------------------------------------------
export const sidebarLinks = [
  { id: "hero", label: "Home", icon: "Home" },
  { id: "about", label: "About", icon: "User" },
  { id: "skills", label: "Skills", icon: "Cpu" },
  { id: "experience", label: "Experience", icon: "Briefcase" },
  { id: "contact", label: "Contact", icon: "Mail" },
];

// ---------------------------------------------------------------------------
// 11. Command Palette Commands
// ---------------------------------------------------------------------------
export const commandPaletteCommands = [
  // Navigation
  { id: "nav-home", label: "Go to Home", icon: "Home", action: "scroll", target: "hero", group: "Navigation" },
  { id: "nav-about", label: "Go to About", icon: "User", action: "scroll", target: "about", group: "Navigation" },
  { id: "nav-skills", label: "Go to Skills", icon: "Cpu", action: "scroll", target: "skills", group: "Navigation" },
  { id: "nav-experience", label: "Go to Experience", icon: "Briefcase", action: "scroll", target: "experience", group: "Navigation" },
  { id: "nav-contact", label: "Go to Contact", icon: "Mail", action: "scroll", target: "contact", group: "Navigation" },

  // Actions
  { id: "act-resume", label: "Download Resume", icon: "Download", action: "download", target: "/Vivek Patel Resume.pdf", group: "Actions" },
  { id: "act-email", label: "Send Email", icon: "Mail", action: "mailto", target: "mailto:vspatel360@gmail.com", group: "Actions" },
  { id: "act-linkedin", label: "Open LinkedIn", icon: "Linkedin", action: "external", target: "https://www.linkedin.com/in/vspatel360", group: "Actions" },
  { id: "act-github", label: "Open GitHub", icon: "Github", action: "external", target: "https://github.com/V1vek98", group: "Actions" },
  { id: "act-dashboards", label: "View Dashboards", icon: "BarChart2", action: "navigate", path: "/dashboards", group: "Actions" },

  // Easter Eggs
  { id: "egg-party", label: "Toggle Party Mode", icon: "PartyPopper", action: "easter-egg", egg: "party", group: "Easter Eggs" },
  { id: "egg-sql", label: "Run SELECT * FROM vivek", icon: "Database", action: "easter-egg", egg: "sql", group: "Easter Eggs" },
];

// ---------------------------------------------------------------------------
// 12. Connection Dialog Data
// ---------------------------------------------------------------------------
export const connectionDialogData = {
  host: "vspatel.com",
  port: "443",
  protocol: "HTTPS",
  auth: "Open",
  status: "ONLINE",
  uptime: "99.9%",
  avgResponse: "< 24 hours",
  bodyCopy:
    "Whether you have a project idea, a job opportunity, or just want to geek out about data\u2014my inbox is always open. I respond to all messages (yes, even the ones asking if I can fix your printer).",
  fairWarning: "Warning: May respond with unsolicited data visualizations.",
  carrierPigeon:
    "Carrier pigeon service temporarily unavailable. Please use email.",
};

// ---------------------------------------------------------------------------
// 13. Footer Content
// ---------------------------------------------------------------------------
export const footerContent = {
  builtWith:
    "Built with React, Tailwind CSS, and an mass amounts of coffee",
  journey: [
    { city: "London", flag: "GB" },
    { city: "Augusta", flag: "US" },
  ],
  copyright:
    "Results may vary. Past performance is not indicative of future results.",
  version: "v2.0.0",
};

// ---------------------------------------------------------------------------
// 14. Easter Eggs
// ---------------------------------------------------------------------------
export const easterEggs = {
  consoleMessage: `
 __      ___           _      ____       _       _
 \\ \\    / (_)         | |    |  _ \\     | |     | |
  \\ \\  / / ___   _____| | __ | |_) |__ _| |_ ___| |
   \\ \\/ / | \\ \\ / / _ \\ |/ / |  __/ _\` | __/ _ \\ |
    \\  /  | |\\ V /  __/   <  | | | (_| | ||  __/ |
     \\/   |_| \\_/ \\___|_|\\_\\ |_|  \\__,_|\\__\\___|_|

  Hey there, fellow developer!
  Looking at the source code? I like your style.

  ==========================================
  Vivek Patel
  Operations Analyst | Data Scientist
  vspatel360@gmail.com
  ==========================================

  P.S. — If you found this, we should probably work together.
`,
  konamiReward: "You found the secret! Here's a virtual high-five",
  notFoundCopy: {
    title: "404: Row Not Found",
    query: "SELECT * FROM pages WHERE slug = :slug",
    result: "0 rows returned",
    suggestion:
      "The query returned no results. This page either doesn't exist or has been DROP TABLE'd.",
  },
  scrollProgressLabels: [
    "INITIALIZING...",
    "LOADING BIO...",
    "PARSING SKILLS...",
    "FETCHING EXPERIENCE...",
    "ESTABLISHING CONNECTION...",
    "QUERY: 100% COMPLETE",
  ],
};
