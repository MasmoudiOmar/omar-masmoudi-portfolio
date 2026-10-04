import { ResumeData } from './types';

export const RESUME: ResumeData = {
  personal: {
    name: "Omar Masmoudi",
    title: "Full Stack Software Engineer",
    email: "omar.masmoudi.pro@gmail.com",
    phone: "+216 53 516 045",
    location: "Ariana, Tunisia",
    linkedin: "https://linkedin.com/in/omaar-masmoudi",
    github: "https://github.com/MasmoudiOmar",
    // Full-time from the AMI engineer role; the Feb 2021 internship precedes it.
    careerStart: "2021-08",
    summary: "Full Stack Software Engineer with 5+ years of experience architecting and shipping scalable web applications across the Education and Blockchain domains. Proficient in Next.js, Angular, React, Spring Boot, Node.js, and AI/ML integrations. Co-founder of two AI-powered products, comfortable owning systems end to end, from architecture and data pipelines through to deployment and team leadership."
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
        "Owned frontend architecture end to end, shipping responsive chat and landing-page experiences with shadcn/ui and Tailwind CSS, improving page load time and conversion rate."
      ]
    },
    {
      company: "Learna",
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
        "Optimized advanced search using Spring Specification patterns for flexible, dynamic query filtering, reducing average query time by 40% across 1M+ records.",
        "Provisioned and managed cloud infrastructure using Terraform alongside the infrastructure team, supporting deployment environments for the enterprise learning platform in parallel with primary frontend and backend development responsibilities."
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
      skills: ["TypeScript", "JavaScript", "Java", "SQL"]
    },
    {
      category: "Frontend",
      skills: ["Next.js", "React", "Angular", "Tailwind CSS", "shadcn/ui", "TanStack Query", "RxJS"],
      proof: { label: "Frontend architecture on Solvizor", href: "#/solvizor" }
    },
    {
      category: "Backend",
      skills: ["Node.js", "Spring Boot", "tRPC", "WebSockets", "OAuth2/JWT", "Spring Data JPA"]
    },
    {
      category: "Data",
      skills: ["PostgreSQL", "MongoDB", "Redis", "Kafka"],
      proof: { label: "50M+ swaps through the pipeline", href: "#/solvizor" }
    },
    {
      category: "AI & Evaluation",
      skills: ["OpenRouter", "Gemini", "Tool calling", "Agent trajectories", "Rubric design", "Benchmark suites"],
      proof: { label: "Try the agent on this page", href: "#agent" }
    },
    {
      category: "Platform",
      skills: ["Docker", "Kubernetes", "AWS", "Terraform", "Cloudflare", "Vercel", "GitHub Actions"]
    }
  ],
  projects: [
    {
      name: "Solvizor",
      description: "AI-powered crypto portfolio analysis with a natural-language chat interface over 20+ wallet-analysis tools.",
      preview: {
        mp4: "/media/solvizor/landing.mp4",
        webm: "/media/solvizor/landing.webm",
        poster: "/media/solvizor/landing.jpg"
      },
      showcase: {
        slug: "solvizor",
        tagline: "Ask a question, get a wallet analysed.",
        overview: [
          "Solvizor turned Solana wallet analysis into a conversation. Instead of reading block explorers, you asked a question in plain English and an AI agent picked the right tools to answer it: portfolio breakdowns, profit and loss across swaps, token discovery, whale tracking.",
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
        featuresTitle: "What it did",
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
            title: "Live feed of whale trades",
            description: "A live stream of large trades as they landed on-chain, each enriched with token metadata and USD value, with totals for the window on top and filters by type, token and size. This is the ingestion pipeline surfacing: raw signatures fetched in batches, parsed into structured swaps, and priced, all of it asynchronous so the feed stayed responsive while history backfilled.",
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
        pipelineTitle: "How the data moved",
        pipelineIntro: "Ingestion had to keep up with the chain without ever blocking a user's request, so every stage between the chain and the UI was asynchronous.",
        pipeline: [
          { label: "On-chain sources", detail: "Helius webhooks and RPC stream raw Solana signatures and transactions." },
          { label: "Queues", detail: "Redis and Kafka buffer the firehose so ingestion never blocks the request path." },
          { label: "Workers", detail: "Node.js workers fetch signatures in batches, parse transactions, and update prices." },
          { label: "Store", detail: "Parsed swaps land in PostgreSQL with full, auditable history; chat and content live in MongoDB." },
          { label: "AI layer", detail: "The agent queries that store through 20+ tools, with model fallback via OpenRouter." }
        ],
        screens: [
          {
            webp: "/media/solvizor/shot-chat.webp",
            jpg: "/media/solvizor/shot-chat.jpg",
            caption: "The agent answering a real question. Wallet rankings first, then a breakdown of one trader's pattern."
          },
          {
            webp: "/media/solvizor/shot-feed.webp",
            jpg: "/media/solvizor/shot-feed.jpg",
            caption: "The live feed. Every row names the trader, the token and the size, and carries the direction in the colour, the verb and the sign."
          },
          {
            webp: "/media/solvizor/shot-wallets.webp",
            jpg: "/media/solvizor/shot-wallets.jpg",
            caption: "Wallet tracking. Follow any Solana address, see when it last traded and what it has been in, and switch alerts on or off per wallet."
          },
          {
            webp: "/media/solvizor/shot-missions.webp",
            jpg: "/media/solvizor/shot-missions.jpg",
            caption: "Missions and credits, the loop that drove signups and retention."
          }
        ]
      }
    },
    {
      name: "Learna",
      description: "AI learning platform that turns articles, YouTube lectures, PDFs and notes into summaries and quizzes.",
      preview: {
        mp4: "/media/learna/theme.mp4",
        webm: "/media/learna/theme.webm",
        poster: "/media/learna/theme.jpg"
      },
      showcase: {
        slug: "learna",
        tagline: "Turn what you read into a quiz.",
        overview: [
          "Learna takes an article, a YouTube lecture, a PDF or your own notes and gives back a short summary and a set of questions about it. Learn mode keeps asking the ones you got wrong until you get them right, and a progress page shows how each topic is going.",
          "I co-founded it in 2024 and led the frontend, including the Learn, Explore and quiz creator modules, on Next.js with Tailwind CSS, daisyUI and TanStack Query. It reached 100 users in its first month.",
          "In 2026 I came back to it and rebuilt every screen on a new design system with light and dark themes. I also went through the API and closed the holes I found: private documents showed up in search and Explore, the generation routes had no session or credit check, the link importer could be pointed at internal addresses, and incoming webhooks were not verified."
        ],
        role: "Full Stack Software Engineer & Co-Founder",
        period: "May 2024 – Dec 2024, rebuilt in 2026",
        status: "The rebuilt version is not deployed yet, so there is no live link. Everything below is recorded from the app running locally with seeded demo data.",
        stack: [
          { group: "Frontend", items: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "daisyUI", "TanStack Query"] },
          { group: "Backend", items: ["Next.js route handlers", "NextAuth", "Mongoose", "Zod"] },
          { group: "Data", items: ["MongoDB"] },
          { group: "AI", items: ["Gemini 2.5 Flash", "pdf2json", "Article extractor", "YouTube captions"] },
          { group: "Services", items: ["Stripe", "Mailgun", "Vercel"] }
        ],
        metrics: [
          { value: "100", label: "Users in the first month" },
          { value: "4", label: "Ways to add material" },
          { value: "5", label: "Questions per document" },
          { value: "14", label: "Screens rebuilt in 2026" }
        ],
        featuresTitle: "What it does",
        features: [
          {
            title: "Bring your own material",
            description: "Paste a link to an article or a YouTube lecture, upload a PDF, or type your notes. Learna pulls the text out of whichever you gave it, and one model call returns a title, a summary, tags and five multiple-choice questions, each with the reasoning behind every answer.",
            media: {
              mp4: "/media/learna/create.mp4",
              webm: "/media/learna/create.webm",
              poster: "/media/learna/create.jpg"
            }
          },
          {
            title: "Quizzes that explain the answer",
            description: "Answer with the mouse or the 1 to 4 keys. A wrong pick shows the right one and why it is right, and the results screen lists only the questions worth going over again.",
            media: {
              mp4: "/media/learna/quiz.mp4",
              webm: "/media/learna/quiz.webm",
              poster: "/media/learna/quiz.jpg"
            }
          },
          {
            title: "Learn mode",
            description: "A missed question goes to the back of the queue and comes back until you get it right. The score only counts first tries, so a learn run and a normal quiz can be compared.",
            media: {
              mp4: "/media/learna/learn.mp4",
              webm: "/media/learna/learn.webm",
              poster: "/media/learna/learn.jpg"
            }
          },
          {
            title: "Progress you can read at a glance",
            description: "Scores over time, the average for each topic, a year of study days, and every past quiz with a link back to its review.",
            media: {
              mp4: "/media/learna/progress.mp4",
              webm: "/media/learna/progress.webm",
              poster: "/media/learna/progress.jpg"
            }
          },
          {
            title: "Light and dark",
            description: "Every colour comes from theme tokens, so dark mode is a second set of values rather than a second stylesheet. Switching uses the View Transitions API, so the new theme spreads out in a circle from the toggle instead of flashing.",
            media: {
              mp4: "/media/learna/theme.mp4",
              webm: "/media/learna/theme.webm",
              poster: "/media/learna/theme.jpg"
            }
          }
        ],
        pipelineTitle: "How a document gets made",
        pipelineIntro: "Generation is the only step that costs money, so every request is checked before it reaches the model, and the input is capped so one request has a known cost.",
        pipeline: [
          { label: "Source", detail: "An article link, a YouTube link, a PDF up to 20 MB, or pasted text." },
          { label: "Guard", detail: "The route checks the session and the credits left. A link is resolved first and refused if it points at a private or internal address, redirects included." },
          { label: "Extract", detail: "Article text comes from the page, video text from its captions, PDF text from pdf2json. Anything past 60,000 characters is cut." },
          { label: "Model", detail: "Gemini returns JSON with a title, summary, tags and questions. The reply is cleaned before parsing, since models do not always return valid JSON." },
          { label: "Store", detail: "The document, its questions and its topic go to MongoDB. New documents are private until the owner shares them to Explore." }
        ],
        screens: [
          {
            webp: "/media/learna/shot-landing.webp",
            jpg: "/media/learna/shot-landing.jpg",
            caption: "The landing page. The hero is drawn with the app's own components rather than a screenshot, so it follows the theme."
          },
          {
            webp: "/media/learna/shot-dashboard.webp",
            jpg: "/media/learna/shot-dashboard.jpg",
            caption: "The dashboard picks up where you left off, with your last document, your scores and recent quizzes."
          },
          {
            webp: "/media/learna/shot-document.webp",
            jpg: "/media/learna/shot-document.jpg",
            caption: "A document: the summary set for reading, the quiz and learn mode on the side, and every past attempt."
          },
          {
            webp: "/media/learna/shot-explore.webp",
            jpg: "/media/learna/shot-explore.jpg",
            caption: "Explore lists documents other people have shared. Saving one puts it, with its questions, in your library."
          },
          {
            webp: "/media/learna/shot-learn.webp",
            jpg: "/media/learna/shot-learn.jpg",
            caption: "Learn groups documents by topic and tracks how many you have finished in each."
          },
          {
            webp: "/media/learna/shot-progress-dark.webp",
            jpg: "/media/learna/shot-progress-dark.jpg",
            caption: "The progress page in the dark theme."
          }
        ]
      }
    }
  ]
};
