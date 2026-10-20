// ============================================================================
// PORTFOLIO DATA FILE
// Edit this single file to update projects, certificates, skills, and links.
// Never add fake links, dates, or credentials here.
// ============================================================================

import financeflowThumb from "../assets/financeflow.png";
import tastehubThumb from "../assets/Tastehub restaurant.png";
import barberFadeThumb from "../assets/Barberfade.png";
import oakFoundationThumb from "../assets/Oakfoundation.png";
import takeoffThumb from "../assets/Takeoff.png";
import stayceyGlowThumb from "../assets/stayceyglow.png";

export const profile = {
  name: "Tawananyasha Chipata",
  title: "Software Developer",
  location: "Zimbabwe",
  email: "tawananyashachipata@gmail.com", // configurable contact email
  github: "https://github.com/tawananyashachipata-lab",
  linkedin: "https://www.linkedin.com/in/tawananyasha-chipata",
  portfolio: "https://magadaline.vercel.app/",
  tagline:
    "I build practical digital experiences through code, creativity, and continuous learning.",
  intro:
    "I'm a software developer from Zimbabwe with interests in both frontend and backend development — from responsive interfaces to the logic that powers them.",
  about:
    "My name is Tawananyasha Chipata, and I am a software developer currently building my career. I am building my programming skills through structured learning, practical projects, and continuous experimentation. I enjoy turning ideas into useful digital experiences and improving my problem-solving abilities through coding. My interests include frontend development, backend development, responsive interfaces, and building software that solves real problems.",
  interests: [
    "Frontend development",
    "Backend development",
    "Responsive interfaces",
    "Software that solves real problems",
  ],
};

// ----------------------------------------------------------------------------
// Skills — honest labels, no made-up percentages.
// ----------------------------------------------------------------------------

export type SkillLevel = "Building Projects" | "Practicing" | "Learning";

export type SkillGroup = {
  title: string;
  accent: "cyan" | "purple" | "green" | "gold";
  skills: { name: string; level: SkillLevel }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend Development",
    accent: "cyan",
    skills: [
      { name: "HTML5", level: "Building Projects" },
      { name: "CSS3", level: "Building Projects" },
      { name: "JavaScript", level: "Building Projects" },
      { name: "React", level: "Building Projects" },
      { name: "Responsive Web Design", level: "Building Projects" },
    ],
  },
  {
    title: "Backend & Programming",
    accent: "purple",
    skills: [
      { name: "Python", level: "Practicing" },
      { name: "Django fundamentals", level: "Learning" },
      { name: "REST API integration", level: "Learning" },
    ],
  },
  {
    title: "Tools & Workflow",
    accent: "green",
    skills: [
      { name: "Git", level: "Building Projects" },
      { name: "GitHub", level: "Building Projects" },
      { name: "VS Code", level: "Building Projects" },
      { name: "Browser dev tools", level: "Practicing" },
      { name: "Debugging & problem-solving", level: "Practicing" },
    ],
  },
  {
    title: "Additional Learning",
    accent: "gold",
    skills: [
      { name: "Next.js fundamentals", level: "Building Projects" },
      { name: "React Native & Expo", level: "Learning" },
      { name: "UI design fundamentals", level: "Building Projects" },
      { name: "Database fundamentals", level: "Learning" },
    ],
  },
];

// ----------------------------------------------------------------------------
// Tech stack
// ----------------------------------------------------------------------------

export type TechItem = { name: string; mark: string; blurb: string };

export const techStack: { group: string; items: TechItem[] }[] = [
  {
    group: "Frontend",
    items: [
      { name: "HTML5", mark: "H5", blurb: "Semantic page structure" },
      { name: "CSS3", mark: "C3", blurb: "Styling, layout and animation" },
      { name: "JavaScript", mark: "JS", blurb: "Interactivity and app logic" },
      { name: "React", mark: "Re", blurb: "Component-based user interfaces" },
    ],
  },
  {
    group: "Backend & Databases",
    items: [
      { name: "Python", mark: "Py", blurb: "General-purpose programming" },
      { name: "Django", mark: "Dj", blurb: "Python web framework — learning" },
      { name: "SQLite", mark: "Sq", blurb: "Lightweight relational database" },
      { name: "Supabase", mark: "Sb", blurb: "Hosted Postgres backend" },
      { name: "REST APIs", mark: "{}", blurb: "Connecting apps to services" },
    ],
  },
  {
    group: "Mobile Development",
    items: [
      { name: "React Native", mark: "RN", blurb: "Cross-platform mobile — learning" },
      { name: "Expo", mark: "Ex", blurb: "React Native toolchain — learning" },
    ],
  },
  {
    group: "Tools & Design",
    items: [
      { name: "Git", mark: "Gt", blurb: "Version control" },
      { name: "GitHub", mark: "GH", blurb: "Code hosting and collaboration" },
      { name: "VS Code", mark: "VS", blurb: "Everyday code editor" },
      { name: "Figma", mark: "Fg", blurb: "Interface design and prototyping" },
      { name: "Next.js", mark: "Nx", blurb: "React framework — fundamentals" },
    ],
  },
];

// ----------------------------------------------------------------------------
// Projects — real repos and live demos only.
// ----------------------------------------------------------------------------

export type Project = {
  title: string;
  problem: string;
  description: string;
  contribution: string;
  status: "Live" | "In Development";
  category: "Web Development" | "Mobile Development";
  tech: string[];
  github?: string;
  live?: string;
  thumbnail: string;
};

export const projects: Project[] = [
  {
    thumbnail: financeflowThumb,
    title: "Finance Flow",
    problem:
      "Keeping track of personal money across income, spending and saving goals is hard without a clear overview.",
    description:
      "A personal finance management frontend built with React and JavaScript. It helps users track income, expenses, budgets, and savings through a clear interface.",
    contribution: "Designed and built the full frontend.",
    status: "Live",
    category: "Web Development",
    tech: ["React", "TypeScript", "Supabase", "HTML", "CSS"],
    github: "https://github.com/tawananyashachipata-lab/financeflow-dashboard",
    live: "https://financeflow-dashboard-i2al.vercel.app/",
  },
  {
    thumbnail: tastehubThumb,
    title: "Tastehub Restaurant",
    problem: "Restaurant customers need a simple way to browse the menu and order online.",
    description:
      "A food ordering platform that allows users to browse meals, add items to their cart and place orders easily.",
    contribution: "Built the browsing, cart and ordering flow.",
    status: "Live",
    category: "Web Development",
    tech: ["React"],
    github: "https://github.com/tawananyashachipata-lab/tastehub-order",
    live: "https://tastehub-order.vercel.app/",
  },
  {
    thumbnail: barberFadeThumb,
    title: "Barber Fade — Mercer Barber Booking",
    problem: "Barbershops lose bookings when clients have to call or walk in to schedule.",
    description:
      "A modern barber booking platform designed to simplify appointment scheduling and enhance the client experience.",
    contribution: "Designed and developed the responsive booking experience.",
    status: "Live",
    category: "Web Development",
    tech: ["React", "TypeScript", "Responsive Design", "Vite"],
    github: "https://github.com/tawananyashachipata-lab/Barber-fade",
    live: "https://barber-fade.netlify.app/",
  },
  {
    thumbnail: oakFoundationThumb,
    title: "OAK Foundation Event",
    problem: "Event organisers need one place for registration, check-in and programme management.",
    description:
      "A digital event management platform for OAK Zimbabwe, streamlining attendee registration, QR check-in, event programmes, and partner management.",
    contribution: "Built the platform frontend and integrated the backend.",
    status: "Live",
    category: "Web Development",
    tech: ["TypeScript", "Next.js", "PostgreSQL", "Supabase"],
    github: "https://github.com/tawananyashachipata-lab/OAK",
    live: "https://oak-foundation-eta.vercel.app/",
  },
  {
    thumbnail: takeoffThumb,
    title: "Takeoff",
    problem: "Driver onboarding involves repetitive manual registration steps.",
    description: "A driver onboarding platform that simplifies registration.",
    contribution: "Built the onboarding interface.",
    status: "Live",
    category: "Web Development",
    tech: ["React", "TypeScript", "Supabase"],
    github: "https://github.com/tawananyashachipata-lab/drive-earn-app",
    live: "https://your-typescript-journey-x6rv.vercel.app/",
  },
  {
    thumbnail: stayceyGlowThumb,
    title: "Staycey Glow",
    problem: "Beauty brands need an elegant storefront to present their products online.",
    description:
      "An elegant beauty and skincare website featuring products and a modern shopping experience.",
    contribution: "Designed and built the storefront.",
    status: "Live",
    category: "Web Development",
    tech: ["React", "CSS", "JavaScript"],
    live: "https://staycey-glow-boutique.vercel.app/",
  },
];

// ----------------------------------------------------------------------------
// Certificates — real entries link to the actual certificate image hosted on
// the current portfolio. Entries marked "upcoming" are placeholders with no
// fabricated dates or issuers; fill them in when the originals are available.
// ----------------------------------------------------------------------------

export type Certificate = {
  title: string;
  issuer?: string;
  year?: string;
  description: string;
  image?: string; // hosted certificate image / document
  status: "earned" | "upcoming";
};

const CERT_BASE = "https://magadaline.vercel.app/assets";

export const certificates: Certificate[] = [
  {
    title: "Python",
    issuer: "freeCodeCamp",
    year: "2026",
    description: "Core Python programming: data structures, functions and algorithms.",
    image: `${CERT_BASE}/python_free-SsRbcz7v.png`,
    status: "earned",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2026",
    description: "HTML5, CSS3, Flexbox, Grid and responsive web design principles.",
    image: `${CERT_BASE}/responsive-C0CQWARq.png`,
    status: "earned",
  },
  {
    title: "JavaScript Basics",
    issuer: "Coursera",
    year: "2026",
    description: "JavaScript fundamentals, ES6, arrays, objects and algorithms.",
    image: `${CERT_BASE}/Screenshot%202026-07-27%20094926-zwSsV81r.png`,
    status: "earned",
  },
  {
    title: "Introduction to Software Engineering",
    issuer: "Coursera",
    year: "2026",
    description: "Software development fundamentals, the SDLC and problem solving.",
    image: `${CERT_BASE}/Screenshot%202026-07-16%20145619-DB-E2LS5.png`,
    status: "earned",
  },
  {
    title: "Fundamentals of NestJS",
    issuer: "Coursera",
    year: "2026",
    description: "Basics of the Nest.js framework.",
    image: `${CERT_BASE}/nestjs-wX47mYuE.png`,
    status: "earned",
  },
  {
    title: "Nest.js Developer Lab",
    issuer: "Coursera",
    year: "2026",
    description:
      "Scalable backend applications with modules, controllers, services and REST APIs in TypeScript.",
    image: `${CERT_BASE}/Screenshot%202026-08-05%20131124-CmcOV95R.png`,
    status: "earned",
  },
];

export const learningTimeline: { period: string; title: string; detail: string }[] = [
  {
    period: "Now",
    title: "Software Development at Uncommon",
    detail: "Structured learning in software development with hands-on projects.",
  },
  {
    period: "Ongoing",
    title: "Practical project building",
    detail:
      "Shipping real web apps — finance tracking, food ordering, event platforms and booking systems.",
  },
  {
    period: "Ongoing",
    title: "Certifications & courses",
    detail:
      "freeCodeCamp and Coursera courses covering web design, JavaScript, Python and backend frameworks.",
  },
  {
    period: "Next",
    title: "Deepening backend & mobile skills",
    detail: "Continuing with Django, REST APIs, React Native and Expo.",
  },
];

// ----------------------------------------------------------------------------
// Game / navigation metadata
// ----------------------------------------------------------------------------

export type LocationId = "profile" | "skills" | "tech" | "projects" | "certificates" | "contact";

export const locations: { id: LocationId; name: string; tagline: string }[] = [
  { id: "profile", name: "My Profile", tagline: "Player card" },
  { id: "skills", name: "My Skills", tagline: "Abilities unlocked" },
  { id: "tech", name: "Tech Stack", tagline: "Equipment" },
  { id: "projects", name: "My Projects", tagline: "Missions completed" },
  { id: "certificates", name: "Certificates", tagline: "Achievement gallery" },
  { id: "contact", name: "Let's Connect", tagline: "Open a channel" },
];

export type Achievement = {
  id: string;
  name: string;
  description: string;
  xp: number;
};

// Achievements reflect website exploration only — not professional claims.
export const achievements: Achievement[] = [
  {
    id: "first-steps",
    name: "First Steps",
    description: "Started exploring the portfolio",
    xp: 10,
  },
  { id: "curious", name: "Curious Mind", description: "Visited your first zone", xp: 20 },
  { id: "profile-viewer", name: "Meet the Developer", description: "Opened My Profile", xp: 25 },
  { id: "skill-seeker", name: "Skill Seeker", description: "Opened My Skills", xp: 25 },
  { id: "gear-check", name: "Gear Check", description: "Opened the Tech Stack", xp: 25 },
  { id: "project-inspector", name: "Mission Review", description: "Opened My Projects", xp: 25 },
  { id: "certified", name: "Certificate Collector", description: "Opened Certificates", xp: 25 },
  { id: "networker", name: "Signal Sent", description: "Opened Let's Connect", xp: 25 },
  { id: "explorer", name: "World Explorer", description: "Visited every zone", xp: 50 },
  { id: "resume-hunter", name: "Resume Hunter", description: "Viewed the CV", xp: 15 },
];

export const VISIT_XP = 30;
export const LEVEL_XP = 100;
