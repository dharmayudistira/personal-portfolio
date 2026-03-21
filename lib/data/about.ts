export type Experience = {
  title: string
  company: string
  type: "Full-time" | "Contract" | "Freelance" | "Internship"
  period: string
  current: boolean
  bullets: string[]
  tags: string[]
}

export type StackGroup = {
  label: string
  index: string
  items: string[]
}

export const BIO = {
  name: "Dharma Yudistira",
  role: "Product Engineer",
  location: "Sidoarjo, Indonesia",
  bio: [
    "I build products end-to-end — from database schema to the last pixel on screen. My work sits at the intersection of engineering and design, where system performance meets user experience.",
    "Fluent in full-stack TypeScript and cross-platform mobile with Flutter and Kotlin, I ship web and mobile experiences that are fast, accessible, and built to scale. I care about the details that make software feel solid — type safety, clean abstractions, and render performance.",
  ],
  socials: [
    { label: "Github", href: "https://github.com/dharmayudistira" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dharmayudistira/" },
    { label: "X", href: "https://x.com/justamannothero" },
    { label: "Upwork", href: "https://www.upwork.com/freelancers/~01eced17d5102f0a7e" },
    { label: "Email", href: "mailto:dharmayudistira2000@gmail.com" },
  ],
} as const

export const EXPERIENCES: Experience[] = [
  {
    title: "Product Engineer",
    company: "Zero One Group",
    type: "Full-time",
    period: "Sept 2022 — Present",
    current: true,
    bullets: [
      "Developed a high-end e-commerce mobile app using Flutter, scaling the architecture to support 100K+ downloads.",
      "Architected enterprise web platforms (ReactJS, Next.js) for major telecommunications and retail clients, including an AI-integrated sales dashboard.",
      "Engineered secure desktop applications (Tauri, Flutter) for the financial sector, automating complex banking data extraction.",
      "Built an AI-driven SaaS platform (Next.js, AI SDK) providing advanced operational tools for real estate professionals.",
      "Designed a highly reliable internal payment aggregator system (ReactJS) to streamline financial transactions."
    ],
    tags: ["Flutter", "ReactJS", "NextJS", "Tauri", "AI SDK", "Monorepo", "REST API"],
  },
  {
    title: "Software Engineer - Mobile",
    company: "Neurafarm",
    type: "Internship",
    period: "Jun 2021 — Sept 2021",
    current: false,
    bullets: [
      "Engineered \"Sobat Tania\", an internal cross-platform application built with Flutter, successfully deploying the final product across Web, Android, and iOS environments.",
      "Integrated the application seamlessly with the company's backend infrastructure to ensure reliable data flow and system performance.",
      "Collaborated closely with Product Managers and UI/UX Designers to define project scope, refine design elements, and align the application with core business objectives.",
      "Analyzed and responded to user feedback, actively iterating on features to optimize the application's performance and enhance the overall user experience."
    ],
    tags: ["Flutter", "Android", "Flutter Web"],
  },
]

export const STACK_GROUPS: StackGroup[] = [
  {
    label: "Languages",
    index: "01",
    items: ["TypeScript", "Dart", "Kotlin", "Java"],
  },
  {
    label: "Frameworks",
    index: "02",
    items: ["Next.js", "React", "Flutter", "Android", "Tauri"],
  },
  {
    label: "Libraries",
    index: "03",
    items: ["Tanstack", "Zustand", "shadcn", "Provider", "Riverpod", "GetX", "Jetpack Compose"],
  },
  {
    label: "Infrastructure",
    index: "04",
    items: ["Supabase", "Firebase", "Redis", "Docker", "Git", "Vercel"],
  },
  {
    label: "Tooling",
    index: "05",
    items: ["Figma", "Framer", "Claude Code", "Cursor", "GPT"],
  },
]
