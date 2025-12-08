import { ResumeData } from './types';

export const RESUME: ResumeData = {
  personal: {
    name: "Omar Masmoudi",
    email: "masmoudi.omaar@gmail.com",
    phone: "+216 53 516 045",
    location: "Ariana, Tunisia",
    linkedin: "https://linkedin.com/in/omaar-masmoudi",
    github: "https://github.com/MasmoudiOmar",
    summary: "Full-Stack Software Engineer with 4+ years building web applications across Education and Blockchain sectors. Expertise in Next.js, Angular, Spring Boot, and AI/ML integrations. Co-founder with startup experience."
  },
  experience: [
    {
      company: "Solvizor",
      role: "Full-Stack Software Engineer",
      period: "Jan 2025 – Sept 2025",
      location: "Remote",
      points: [
        "Led the frontend development of the app designing responsive UI sections such as chat, chat component UIs and landing page using chadcn ui and tailwindcss.",
        "Developed an AI-powered chat interface with an orchestrator using OpenRouter for automatic model fallbacks, integrating 20+ wallet analysis tools to enable natural language queries for portfolio analysis, PnL tracking, and token discovery.",
        "Implemented a background job processing system using Redis queues and Node.js workers that handle signature fetching in batches, transaction parsing, and price updates, processing blockchain historical data asynchronously.",
        "Designed a data processing pipeline that transforms raw blockchain transactions into structured data, calculates profit/loss metrics across token swaps, and maintains transaction history."
      ]
    },
    {
      company: "Learna",
      role: "Full-Stack Software Engineer",
      period: "May 2024 – Dec 2024",
      location: "Tunisia",
      points: [
        "Led the frontend development of the app creating responsive UIs such as Learn, Explore and Quiz creator with Tailwind CSS, daisyUI and TanStack Query for optimized data fetching and caching.",
        "Built AI-powered learning SaaS generating educational summaries and quizzes from PDFs, articles, and YouTube.",
        "Added the social aspect to share quizzes and learning mode to learn without being graded."
      ]
    },
    {
      company: "AMI",
      role: "Software Engineer",
      period: "Aug 2021 – Mar 2024",
      location: "Tunisia",
      points: [
        "Created interactive and Responsive UI components using Angular Material, PrimeNG, and custom CSS and animations.",
        "Implemented backend REST APIs using Springboot and MVC architecture.",
        "Built adaptive learning algorithms to generate competency-based learning paths.",
        "Implemented advanced search with Spring Search specification patterns."
      ]
    },
    {
      company: "AMI",
      role: "Software Engineering Intern",
      period: "Feb 2021 – Jul 2021",
      location: "Tunisia",
      points: [
        "Developed Angular components for authentication and navigation with reactive forms and RxJS.",
        "Created Use case, Entity-Relationship and Sequence diagrams according to the needs of the client.",
        "Set up Spring Boot backend with Maven, MySQL, and REST endpoints controllers, and repositories using Spring Data JPA."
      ]
    }
  ],
  education: [
    {
      school: "Esprit",
      degree: "Software Engineering",
      period: "Sept 2019 – January 2021",
      location: "Tunis, Tunisia",
      details: "Software Engineering"
    },
    {
      school: "IPSAS",
      degree: "Software Engineering",
      period: "Sept 2018 – June 2019",
      location: "Sfax, Tunisia",
      details: "Computer Science Fundamentals"
    },
    {
      school: "ENIS",
      degree: "Civil Engineering",
      period: "Sept 2013 – June 2016",
      location: "Sfax, Tunisia",
      details: "Specialised in Buildings"
    },
    {
      school: "IPEIS",
      degree: "Maths and Physics",
      period: "Sept 2011 – June 2013",
      location: "Sfax, Tunisia",
      details: "Rank 945"
    }
  ],
  skills: [
    {
      category: "Languages",
      skills: ["JavaScript", "TypeScript", "Java", "SQL"]
    },
    {
      category: "Frameworks",
      skills: ["Next.js", "Angular", "Spring Boot", "React"]
    },
    {
      category: "Databases",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis"]
    },
    {
      category: "DevOps",
      skills: ["Docker", "Kubernetes", "AWS", "Vercel", "GitHub Actions"]
    },
    {
      category: "Tools",
      skills: ["Git", "REST APIs", "tRPC", "WebSockets", "OAuth2/JWT", "Stripe", "AI/LLM APIs"]
    }
  ],
  projects: [
    {
      name: "Solvizor",
      link: "https://solvizor.com",
      description: "AI-powered crypto portfolio analysis and chat interface."
    },
    {
      name: "Learna",
      link: "https://reading-assistant-web.vercel.app/",
      description: "AI learning platform generating quizzes and summaries from media."
    }
  ]
};