import { ResumeData } from './types';

export const RESUME: ResumeData = {
  personal: {
    name: "Omar Masmoudi",
    title: "Full Stack Software Engineer",
    email: "masmoudi.omaar@gmail.com",
    phone: "+216 53 516 045",
    location: "Ariana, Tunisia",
    linkedin: "https://linkedin.com/in/omaar-masmoudi",
    github: "https://github.com/MasmoudiOmar",
    summary: "Full Stack Software Engineer with 4+ years of experience architecting and shipping scalable web applications across the Education and Blockchain domains. Proficient in Next.js, Angular, React, Spring Boot, Node.js, and AI/ML integrations. Co-founder of two AI-powered products, comfortable owning systems end-to-end—from architecture and data pipelines to deployment and team leadership."
  },
  experience: [
    {
      company: "Mercor",
      role: "Software Engineer — AI Trajectory Annotation & Evaluation",
      period: "Jan 2026 – Present",
      location: "Remote",
      points: [
        "Evaluated and annotated approximately 250 multi-step AI agent coding trajectories across TypeScript, JavaScript, Rust, Go, and C++ codebases, applying software engineering judgment to assess code correctness, reasoning quality, and adherence to established rubrics as part of a collaborative team with lead and reviewer feedback.",
        "Authored rubrics, expected-output criteria, and test cases for a ~100-case benchmark suite run across multiple models to identify differential failure modes and performance gaps, translating task requirements into structured, repeatable scoring criteria."
      ]
    },
    {
      company: "Solvizor",
      role: "Full Stack Software Engineer & Co-Founder",
      period: "Jan 2025 – Dec 2025",
      location: "Hybrid",
      points: [
        "Architected an AI-powered chat interface with a model-orchestration layer on OpenRouter for automatic fallback, integrating 20+ wallet-analysis tools and enabling natural-language queries across portfolio analysis, PnL tracking, and token discovery for 5k+ active users.",
        "Engineered an asynchronous job-processing system using Redis queues and Node.js workers, cutting signature-fetching and transaction-parsing time by 95% versus the initial implementation and standard API call times, through fully async batch processing of blockchain historical data.",
        "Designed a data pipeline that transforms raw on-chain transactions into structured records, computing profit/loss across 50M+ token swaps while maintaining complete, auditable transaction history.",
        "Owned frontend architecture end-to-end — shipped responsive chat and landing-page experiences with shadcn/ui and Tailwind CSS, improving page load time and conversion rate."
      ]
    },
    {
      company: "Learna",
      link: "https://reading-assistant-web.vercel.app",
      role: "Full Stack Software Engineer & Co-Founder",
      period: "May 2024 – Dec 2024",
      location: "Tunisia",
      points: [
        "Directed frontend development of the Learn, Explore, and Quiz Creator modules using Tailwind CSS, daisyUI, and TanStack Query, reducing data-fetch latency by 90% through optimized caching strategies.",
        "Co-built an AI-powered learning SaaS platform that auto-generates summaries and quizzes from PDFs, articles, and YouTube content, onboarding 100 users within 1 month of launch.",
        "Launched social quiz-sharing and graded/ungraded learning modes, increasing learner engagement by 30%."
      ]
    },
    {
      company: "AMI",
      role: "Software Engineer",
      period: "Aug 2021 – Mar 2024",
      location: "Tunisia",
      points: [
        "Built interactive, responsive UI components with Angular Material, PrimeNG, and custom CSS animations for an enterprise learning platform serving 4k+ users.",
        "Delivered backend REST APIs with Spring Boot and MVC architecture, powering competency-based learning workflows across 20 modules.",
        "Designed adaptive learning algorithms that generate personalized, competency-based learning paths, improving completion rate by 25%.",
        "Optimized advanced search using Spring Specification patterns for flexible, dynamic query filtering, reducing average query time by 40% across 1M+ records."
      ]
    },
    {
      company: "AMI",
      role: "Software Engineering Intern",
      period: "Feb 2021 – Jul 2021",
      location: "Tunisia",
      points: [
        "Developed Angular components for authentication and navigation using reactive forms and RxJS for state management.",
        "Authored UML diagrams (Use Case, Entity-Relationship, Sequence) translating client requirements into system design specifications.",
        "Configured the Spring Boot backend with Maven and MySQL, building REST endpoint controllers and repositories via Spring Data JPA."
      ]
    }
  ],
  education: [
    {
      school: "ESPRIT",
      degree: "Engineering Degree, Software Engineering",
      period: "Sep 2019 – Jan 2021",
      location: "Tunis, Tunisia"
    },
    {
      school: "IPSAS",
      degree: "Preparatory Studies, Computer Science Fundamentals",
      period: "Sep 2018 – Jun 2019",
      location: "Sfax, Tunisia"
    },
    {
      school: "ENIS",
      degree: "Civil Engineering",
      period: "2013 – 2016",
      location: "Sfax, Tunisia",
      details: "Prior studies"
    },
    {
      school: "IPEIS",
      degree: "Preparatory Classes, Mathematics & Physics",
      period: "2011 – 2013",
      location: "Sfax, Tunisia",
      details: "Prior studies"
    }
  ],
  skills: [
    {
      category: "Languages",
      skills: ["JavaScript", "TypeScript", "Java", "SQL"]
    },
    {
      category: "Frontend",
      skills: ["Next.js", "React", "Angular", "Tailwind CSS", "shadcn/ui", "daisyUI", "Angular Material", "PrimeNG", "RxJS", "TanStack Query"]
    },
    {
      category: "Backend",
      skills: ["Node.js", "Spring Boot", "REST APIs", "tRPC", "WebSockets", "OAuth2/JWT", "Spring Data JPA", "MVC"]
    },
    {
      category: "Databases",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"]
    },
    {
      category: "AI & Integrations",
      skills: ["OpenRouter", "LLM APIs", "AI/ML pipeline design", "Stripe", "OAuth2"]
    },
    {
      category: "DevOps & Tools",
      skills: ["Docker", "Kubernetes", "AWS", "Vercel", "GitHub Actions", "Git", "Maven"]
    }
  ],
  projects: [
    {
      name: "Solvizor",
      description: "AI-powered crypto portfolio analysis with a natural-language chat interface over 20+ wallet-analysis tools.",
      preview: {
        mp4: "/media/solvizor/chat.mp4",
        webm: "/media/solvizor/chat.webm",
        poster: "/media/solvizor/chat.jpg"
      },
      showcase: {
        slug: "solvizor",
        tagline: "Ask a question, get a wallet analysed.",
        overview: [
          "Solvizor turned Solana wallet analysis into a conversation. Instead of reading block explorers, you asked a question in plain English and an AI agent picked the right tools to answer it — portfolio breakdowns, profit and loss across swaps, token discovery, whale tracking.",
          "I co-founded it and owned the full stack: the ingestion pipeline that pulled and parsed on-chain history, the model-orchestration layer that routed questions to the right tools, and the frontend that made all of it feel immediate."
        ],
        role: "Full Stack Software Engineer & Co-Founder",
        period: "Jan 2025 – Dec 2025",
        status: "The product has wound down and the source is private, so there is no live demo. Everything below is recorded from the working application.",
        stack: [
          { group: "Frontend", items: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"] },
          { group: "Backend", items: ["Node.js", "Drizzle ORM", "Auth.js", "REST"] },
          { group: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "Kafka"] },
          { group: "AI", items: ["OpenRouter", "Vercel AI SDK", "Tool calling"] },
          { group: "Chain", items: ["Helius", "Birdeye", "Moralis", "Shyft"] }
        ],
        metrics: [
          { value: "5k+", label: "Active users" },
          { value: "20+", label: "Wallet-analysis tools" },
          { value: "50M+", label: "Token swaps processed" },
          { value: "95%", label: "Faster transaction parsing" }
        ],
        features: [
          {
            title: "Conversational wallet analysis",
            description: "A chat agent with 20+ tools at its disposal. It decided which to call from a plain-English question, then composed the results into an answer. A model-orchestration layer on OpenRouter handled automatic fallback, so a single provider outage never took the assistant down.",
            media: {
              mp4: "/media/solvizor/chat.mp4",
              webm: "/media/solvizor/chat.webm",
              poster: "/media/solvizor/chat.jpg"
            }
          },
          {
            title: "Real-time whales feed",
            description: "A live stream of large trades as they landed on-chain, each enriched with token metadata and USD value. This is the ingestion pipeline surfacing: raw signatures fetched in batches, parsed into structured swaps, and priced — all asynchronously, so the feed stayed responsive while history backfilled.",
            media: {
              mp4: "/media/solvizor/feed.mp4",
              webm: "/media/solvizor/feed.webm",
              poster: "/media/solvizor/feed.jpg"
            }
          },
          {
            title: "Wallet tracking and alerts",
            description: "Follow any Solana address, name it, and get notified when it moves. Registering a wallet triggered a historical backfill through the job queue while live webhooks handled everything from that point forward.",
            media: {
              mp4: "/media/solvizor/wallet.mp4",
              webm: "/media/solvizor/wallet.webm",
              poster: "/media/solvizor/wallet.jpg"
            }
          }
        ],
        pipeline: [
          { label: "On-chain sources", detail: "Helius webhooks and RPC stream raw Solana signatures and transactions." },
          { label: "Queues", detail: "Redis and Kafka buffer the firehose so ingestion never blocks the request path." },
          { label: "Workers", detail: "Node.js workers fetch signatures in batches, parse transactions, and update prices." },
          { label: "Store", detail: "Parsed swaps land in PostgreSQL with full, auditable history; chat and content live in MongoDB." },
          { label: "AI layer", detail: "The agent queries that store through 20+ tools, with model fallback via OpenRouter." }
        ]
      }
    },
    {
      name: "Learna",
      link: "https://reading-assistant-web.vercel.app",
      description: "AI learning platform that auto-generates summaries and quizzes from PDFs, articles, and YouTube."
    }
  ]
};
