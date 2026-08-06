export const profile = {
  name: "Jagruti Bandikalla",
  firstName: "Jagruti",
  lastName: "Bandikalla",
  role: "Java Full Stack Developer",
  roles: [
    "Java Full Stack Developer",
    "Frontend Craftsperson",
    "DevOps Learner",
    "CSE Undergraduate",
  ],
  location: "Chirala, Andhra Pradesh, India",
  email: "bandikallajagruti@gmail.com",
  phone: "+91 9963330032",
  github: "https://github.com/jagrutibandikalla",
  linkedin: "https://www.linkedin.com/in/jagruthi-bandikalla-b7aa18341/",
  credly: "https://www.credly.com/users/jagruti-bandikalla.4bda742f",
  microsoftLearn: "https://learn.microsoft.com/en-us/users/jagrutibandikalla-5852/",
  skillsGoogle:
    "https://www.skills.google/public_profiles/7784bf8f-e4e0-4179-bbef-8fa1eb6bbe8e",
  summary:
    "Motivated and detail-oriented Computer Science Engineering student with strong knowledge in Full Stack Development, Java programming, and web technologies. Passionate about building scalable and user-friendly applications with problem solving and teamwork abilities. Seeking an opportunity to enhance technical and professional skills in a growth-oriented organization.",
} as const;

export const stats = [
  { value: "8.15", label: "B.Tech CGPA", sub: "Computer Science & Engineering" },
  { value: "3", label: "Projects Built", sub: "Finance Tracker, E-Commerce, HerCare" },
  { value: "8", label: "Certificates & Badges", sub: "Google Cloud, Cisco, Microsoft" },
  { value: "3", label: "Languages", sub: "English, Telugu, Hindi" },
];

export const aboutBlocks = [
  {
    title: "The Beginning",
    body: "Curiosity about how screens come alive turned into a Computer Science & Engineering journey at Godavari Institute of Engineering and Technology.",
  },
  {
    title: "The Craft",
    body: "Full stack development with Java, JSP and Angular on the backend side of my learning, and HTML, CSS and JavaScript for interfaces people actually enjoy using.",
  },
  {
    title: "The Discipline",
    body: "Regular coding practice to sharpen programming and problem-solving, plus DevOps tools and practices completed as advanced training at Techwing.",
  },
  {
    title: "The Team",
    body: "Strong leadership and communication abilities with real experience handling teams effectively across real-time and team projects.",
  },
];

export const highlights = [
  "Full Stack Development",
  "Java Programming",
  "Web Technologies",
  "Problem Solving",
  "Team Leadership",
  "AI Awareness",
];

export const interests = [
  "Dancing",
  "Enjoying songs",
  "Spending time with self",
  "Editing",
  "Baking",
  "Exploring places",
];

export const training = [
  {
    id: "jfs",
    institution: "Techwing",
    title: "Java Full Stack Training",
    duration: "Completed",
    status: "Completed",
    description:
      "Successfully completed the Java Full Stack training program, covering the full journey from markup and styling to server-side Java and database-driven applications.",
    skills: ["Java", "JSP", "HTML", "CSS", "JavaScript", "SQL"],
    detail:
      "The training built an end-to-end understanding of how a full stack application fits together: designing the interface, handling server-side logic with Java and JSP, and persisting data with SQL.",
    accent: "violet",
  },
  {
    id: "devops",
    institution: "Techwing",
    title: "Advanced DevOps Training",
    duration: "Completed",
    status: "Completed",
    description:
      "Advanced training in DevOps tools and practices, learning how modern software is built, versioned and shipped continuously.",
    skills: ["DevOps Practices", "GitHub", "Version Control", "Automation Basics"],
    detail:
      "Focused on the practices that carry code from a local machine to a running product, with an emphasis on collaboration workflows and reliable delivery.",
    accent: "electric",
  },
  {
    id: "ongoing",
    institution: "Techwing",
    title: "Ongoing JFS & DevOps Training",
    duration: "Currently ongoing",
    status: "In Progress",
    description:
      "Currently undergoing training in Java Full Stack (JFS) and DevOps technologies, continuously deepening both sides of the stack.",
    skills: ["Java Full Stack", "DevOps", "Continuous Learning"],
    detail:
      "Learning does not stop at completion. The ongoing track keeps sharpening full stack fundamentals alongside DevOps tooling.",
    accent: "gold",
  },
  {
    id: "aranea",
    institution: "Aranea Den",
    title: "Web Development Workshop",
    duration: "3 days",
    status: "Completed",
    description:
      "Completed an intensive 3-day web development workshop, a concentrated dive into building for the browser.",
    skills: ["Web Development", "HTML", "CSS", "JavaScript"],
    detail:
      "Three days of hands-on building — short, dense and practical, the kind of workshop that turns theory into working pages.",
    accent: "electric",
  },
  {
    id: "practice",
    institution: "Self-Driven",
    title: "Programming & Problem Solving Practice",
    duration: "Ongoing",
    status: "Daily habit",
    description:
      "I practice coding regularly to improve programming and problem-solving skills, building consistency rather than relying on bursts.",
    skills: ["Data Structures", "Algorithms", "Problem Solving", "Python", "C"],
    detail:
      "A steady practice routine keeps fundamentals fresh — reading problems carefully, reasoning about approach, then writing the cleanest solution I can.",
    accent: "violet",
  },
  {
    id: "realtime",
    institution: "Collaborative",
    title: "Real-Time & Team Projects",
    duration: "Ongoing",
    status: "In Progress",
    description:
      "Currently working on real-time projects as well as team projects, translating training into shipped work.",
    skills: ["Collaboration", "Git Workflow", "Project Delivery"],
    detail:
      "Real-time work brings the constraints that tutorials never do: shared codebases, changing requirements and deadlines that matter.",
    accent: "gold",
  },
  {
    id: "leadership",
    institution: "Team Experience",
    title: "Leadership & Team Collaboration",
    duration: "Ongoing",
    status: "Strength",
    description:
      "Strong leadership and communication abilities with experience handling teams effectively.",
    skills: ["Leadership", "Communication", "Team Handling"],
    detail:
      "Leading well is mostly listening well — keeping everyone aligned, unblocking people quickly and making sure the work adds up.",
    accent: "violet",
  },
] as const;

export type SkillCategory = {
  id: string;
  label: string;
  blurb: string;
  skills: { name: string; level: string }[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Interfaces that feel considered.",
    skills: [
      { name: "HTML", level: "Proficient" },
      { name: "CSS", level: "Proficient" },
      { name: "JavaScript", level: "Proficient" },
      { name: "Angular", level: "Working" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "Server-side logic and structure.",
    skills: [
      { name: "Java", level: "Working" },
      { name: "JSP", level: "Working" },
      { name: "Python", level: "Basic" },
    ],
  },
  {
    id: "languages",
    label: "Programming Languages",
    blurb: "The syntax I think in.",
    skills: [
      { name: "Java", level: "Working" },
      { name: "Python", level: "Basic" },
      { name: "JavaScript", level: "Proficient" },
      { name: "TypeScript", level: "Learning" },
      { name: "C", level: "Basic" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    blurb: "Storing and querying with intent.",
    skills: [
      { name: "SQL", level: "Working" },
      { name: "DBMS", level: "Coursework" },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    blurb: "From local machine to running product.",
    skills: [
      { name: "Git", level: "Working" },
      { name: "GitHub", level: "Working" },
      { name: "CI/CD Concepts", level: "Trained" },
      { name: "Vercel", level: "Deploying" },
      { name: "Firebase", level: "Workshop" },
    ],
  },
  {
    id: "ai",
    label: "AI & GenAI",
    blurb: "Understanding the new layer of software.",
    skills: [
      { name: "GitHub Copilot", level: "Daily" },
      { name: "Claude Code", level: "Daily" },
      { name: "Generative AI Concepts", level: "Certified" },
      { name: "Responsible AI", level: "Certified" },
      { name: "Enterprise AI Agents", level: "Certified" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    blurb: "The daily workbench.",
    skills: [
      { name: "VS Code", level: "Daily" },
      { name: "Antigravity IDE", level: "Workshop" },
      { name: "Cloudinary", level: "Workshop" },
      { name: "Perplexity", level: "Research" },
    ],
  },
  {
    id: "dsa",
    label: "DSA",
    blurb: "Fundamentals that travel everywhere.",
    skills: [
      { name: "Data Structures", level: "Practising" },
      { name: "Algorithms", level: "Practising" },
      { name: "OOP", level: "Coursework" },
      { name: "Operating Systems", level: "Coursework" },
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  tagline: string;
  year: string;
  stack: string[];
  overview: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  journey: string;
  github: string;
  demo?: string;
  hue: string;
};

export const projects: Project[] = [
  {
    id: "finance-tracker",
    title: "Finance Tracker",
    tagline: "Income, savings and expenses, finally legible.",
    year: "Project 01",
    stack: ["HTML", "CSS", "JavaScript"],
    overview:
      "A finance tracking application built to monitor income, savings and expenses efficiently, with a user-friendly interface for managing personal financial records and improving budgeting awareness.",
    features: [
      "Track income, savings and expenses in one place",
      "User-friendly interface for personal financial records",
      "Budgeting awareness through clear record keeping",
      "Efficient monitoring of where money actually goes",
    ],
    challenges: [
      "Presenting numbers without overwhelming the person reading them",
      "Keeping the record-entry flow fast enough to actually be used",
    ],
    solutions: [
      "A calm, hierarchy-first interface where totals lead and details follow",
      "Simple, focused forms so logging a record takes seconds, not minutes",
    ],
    journey:
      "Started as a way to answer a simple personal question — where does the money go — and grew into a small product exercise in information design with plain HTML, CSS and JavaScript.",
    github: "https://github.com/jagrutibandikalla/finance-traker",
    demo: "https://jagrutibandikalla.github.io/finance-traker/",
    hue: "violet",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Website",
    tagline: "A responsive storefront that behaves on every screen.",
    year: "Project 02",
    stack: ["HTML", "CSS", "JavaScript"],
    overview:
      "A responsive online shopping platform with product browsing, shopping cart management and a mobile-friendly design throughout.",
    features: [
      "Product browsing experience",
      "Shopping cart management",
      "Mobile-friendly, responsive layouts",
      "Consistent behaviour across breakpoints",
    ],
    challenges: [
      "Keeping cart state coherent as the user moves around the site",
      "Making a product grid that holds up from mobile to desktop",
    ],
    solutions: [
      "Clear cart interactions with predictable feedback on every action",
      "A fluid grid and responsive typography rather than fixed breakpoint dumps",
    ],
    journey:
      "Built to understand commerce mechanics from the inside — browsing, selecting, reviewing and checking out — and to practise responsive discipline on a real layout.",
    github: "https://github.com/jagrutibandikalla/E-Commerce",
    demo: "https://jagrutibandikalla.github.io/E-Commerce/",
    hue: "electric",
  },
  {
    id: "hercare",
    title: "HerCare",
    tagline: "Period tracking, and the understanding around it.",
    year: "Project 03",
    stack: ["TypeScript", "JavaScript", "CSS"],
    overview:
      "A user-friendly website currently in development, with period tracking plus the education around it: understanding your cycle, which foods to take and avoid, and why mood swings and cramps occur.",
    features: [
      "Period tracking",
      "Understanding your cycle",
      "Foods to take and foods to avoid",
      "Why mood swings occur",
      "Why cramps occur",
    ],
    challenges: [
      "Handling a sensitive subject with warmth instead of clinical coldness",
      "Balancing tracking utility with genuine education",
    ],
    solutions: [
      "A gentle tone and a calm visual language throughout the experience",
      "Pairing every tracked insight with the explanation behind it",
    ],
    journey:
      "The project I care about most — currently being built in TypeScript, designed so that the person using it leaves knowing more about her own body than when she arrived.",
    github: "https://github.com/jagrutibandikalla/HerCaree",
    demo: "https://hercaree.vercel.app/",
    hue: "gold",
  },
];

export const certificates = [
  {
    title: "Java Certification",
    issuer: "Techwing",
    status: "In progress",
    type: "Certificate",
  },
  {
    title: "DevOps Certificate",
    issuer: "Techwing",
    status: "In progress",
    type: "Certificate",
  },
  {
    title: "Gen AI — Beyond the Chatbot",
    issuer: "Google Cloud",
    status: "Earned",
    type: "Badge",
    href: "https://www.skills.google/public_profiles/7784bf8f-e4e0-4179-bbef-8fa1eb6bbe8e/badges/24790429",
  },
  {
    title: "Gen AI — Unlock Foundational Concepts",
    issuer: "Google Cloud",
    status: "Earned",
    type: "Badge",
    href: "https://www.skills.google/public_profiles/7784bf8f-e4e0-4179-bbef-8fa1eb6bbe8e/badges/24737254",
  },
  {
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    status: "Earned",
    type: "Certificate & Badge",
    href: "https://www.credly.com/badges/a29d4b8d-5155-4873-b6e1-9add617cfbbe/public_url",
  },
  {
    title: "Python Essentials 2",
    issuer: "Cisco Networking Academy",
    status: "Earned",
    type: "Certificate & Badge",
    href: "https://www.credly.com/badges/fed3799e-d7a7-411b-972f-12bbf0e32d08/public_url",
  },
  {
    title: "Responsible AI with GitHub Copilot",
    issuer: "Microsoft",
    status: "Earned",
    type: "Badge & Certificate",
    href: "https://learn.microsoft.com/api/achievements/share/en-us/JagrutiBandikalla-5852/3ZYQ2C5H?sharingId=A9A44A5C783C7ABA",
  },
  {
    title: "Build Enterprise AI Agents with Java & Spring",
    issuer: "Microsoft Learn",
    status: "Earned",
    type: "Badge & Certificate",
    href: "https://learn.microsoft.com/en-us/users/jagrutibandikalla-5852/",
  },
] as { title: string; issuer: string; status: string; type: string; href?: string }[];

export const education = [
  {
    degree: "B.Tech — Computer Science and Engineering",
    institution: "Godavari Institute of Engineering and Technology",
    place: "Rajahmundry",
    period: "2023 – 2027",
    note: "CGPA: 8.15",
  },
  {
    degree: "MPC — Intermediate",
    institution: "Bhavishya Junior College",
    place: "Vijayawada",
    period: "2021 – 2023",
    note: "Mathematics, Physics, Chemistry",
  },
  {
    degree: "10th Standard — SSC",
    institution: "Bhashyam High School",
    place: "Guntur",
    period: "2020 – 2021",
    note: "Foundation years",
  },
];

export const achievements = [
  {
    title: "8.15 CGPA",
    body: "Maintaining a strong academic record through the B.Tech Computer Science and Engineering programme.",
  },
  {
    title: "Java Full Stack Training Completed",
    body: "Successfully completed the full stack training track at Techwing.",
  },
  {
    title: "Advanced DevOps Training",
    body: "Completed advanced training in DevOps tools and practices.",
  },
  {
    title: "Eight Certificates & Badges",
    body: "Recognition from Google Cloud, Cisco Networking Academy, Microsoft and Techwing.",
  },
  {
    title: "Team Leadership",
    body: "Strong leadership and communication abilities with experience handling teams effectively.",
  },
  {
    title: "Trilingual",
    body: "English, Telugu and conversational Hindi.",
  },
];

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "training", label: "Training" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export const contact = {
  email: profile.email,
  phone: profile.phone,
  address: profile.location,
  linkedin: profile.linkedin,
  github: profile.github,
};
