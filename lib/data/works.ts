export type Work = {
  slug: string
  title: string
  description: string
  longDescription: string
  image?: string
  category: "Web" | "Mobile" | "Desktop" | "Open Source"
  tags: string[]
  date: string
  role: string
  liveUrls?: { label: string; url: string }[]
  repoUrl?: string
  featured: boolean
  confidential?: boolean
  impacts?: string[]
  sections?: {
    problem: {
      body: string
      quote?: string
    }
    solution: {
      body: string
      features: { name: string; description: string }[]
      asset?: { type: "image" | "video"; url: string } | null
    }
    technical: {
      body: string
      code: { language: string; filename: string; content: string }
    }
  }
}

export const WORKS: Work[] = [
  {
    slug: "sukanda-onelink",
    title: "Sukanda Onelink",
    image: "/works/sukanda.webp",
    description:
      "B2B e-commerce platform for PT Diamond Food Indonesia — connecting 9,000+ F&B entrepreneurs across Indonesia with raw materials, ingredients, and equipment through a unified ordering system.",
    longDescription:
      "Sukanda Onelink is the digital procurement platform for PT Diamond Food Indonesia, one of Indonesia's largest F&B distributors. The platform enables restaurant owners, cafes, and food businesses to browse, order, and track raw material deliveries across 21 cities — 24/7, from any device. I joined as a Product Engineer on the web side, working across features that serve thousands of active business accounts.",
    category: "Web",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "TanStack Query"],
    date: "2024-01-01",
    role: "Product Engineer - Web",
    liveUrls: [
      { label: "Website", url: "https://www.sukandaonelink.com/" },
    ],
    featured: true,
    confidential: true,
    impacts: [
      "Contributed to a platform serving 9,000+ active F&B business accounts across 21 Indonesian cities, handling real-time order creation and monitoring at scale.",
      "Built and maintained core web features including multi-outlet account management, order tracking, and promotional campaign surfaces.",
      "Implemented data-fetching and caching layers using TanStack Query, reducing redundant API calls and improving page responsiveness across catalogue and order flows.",
      "Collaborated with backend and design to deliver cross-platform ordering experiences consistent between the web and mobile app.",
      "Shipped features under a structured release cadence aligned with the PT Diamond Food Indonesia product roadmap.",
    ],
  },
  {
    slug: "simpan",
    title: "Simpan",
    description:
      "Guided investing app for everyday Indonesians — making wealth-building accessible through curated portfolios and step-by-step investment flows.",
    longDescription:
      "Simpan is a guided investing app for everyday Indonesian investors. My team took over the project from a previous vendor, inheriting a legacy Flutter codebase with accumulated tech debt, inconsistent patterns, and minimal test coverage. We audited, stabilised, and refactored the codebase — establishing proper BLoC architecture, introducing a test suite, and resolving critical bugs — before resuming feature delivery and shipping the app to production.",
    image: "/works/simpan.webp",
    category: "Mobile",
    tags: ["Flutter", "BLoC", "Dart", "Firebase"],
    date: "2023-06-01",
    role: "Product Engineer - Mobile",
    liveUrls: [
      { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.simpan.mobile.stg" },
      { label: "App Store", url: "https://apps.apple.com/id/app/simpan-guided-investing/id6444825882" },
    ],
    featured: false,
    confidential: true,
    impacts: [
      "Inherited a legacy Flutter codebase from a previous vendor — conducted a full audit, identified critical issues, and established a recovery plan before resuming active development.",
      "Refactored state management to follow BLoC best practices, replacing inconsistent patterns left by the previous team and making the codebase predictable and maintainable.",
      "Introduced unit and widget testing across core investment flows, building a test suite from near-zero coverage to support safe iteration.",
      "Resolved long-standing bugs across onboarding, portfolio selection, and transaction screens — stabilising the app to a product-ready state.",
      "Defined and enforced coding standards and architecture conventions across the team to prevent regression and align new contributors quickly.",
      "Collaborated closely with product and backend to scope, estimate, and deliver features on a structured release cadence after the handover.",
      "App shipped to production with 1K+ downloads, a 4.8 rating on the App Store and 4.3 on Google Play — reflecting the quality uplift from the stabilisation effort.",
    ],
  },
  {
    slug: "agentai",
    title: "AgentAI",
    description:
      "AI-powered marketing automation platform for real estate agents — automating content generation, listings, and workflows so agents can focus on closing deals.",
    longDescription:
      "AgentAI is a SaaS platform that helps real estate teams automate their marketing operations using AI. I joined as a Product Engineer on a legacy Next.js + NestJS codebase, taking ownership of both frontend and backend across a significant product evolution: UI migration from Chakra to MUI, OpenAI and LangChain integration, Stripe billing implementation, and a full B2B migration from a personal-use product to a multi-tenant architecture.",
    image: "/works/agentai.webp",
    category: "Web",
    tags: ["Next.js", "TypeScript", "NestJS", "OpenAI", "LangChain", "MUI", "Stripe", "MongoDB"],
    date: "2024-06-01",
    role: "Product Engineer - Fullstack",
    liveUrls: [
      { label: "Website", url: "https://agentai.ai/" },
    ],
    featured: false,
    confidential: true,
    impacts: [
      "Took over a legacy Next.js + NestJS codebase and led ongoing maintenance, feature development, and tech debt reduction across both frontend and backend.",
      "Migrated the entire UI component layer from Chakra UI to Material UI (MUI), standardising the design system and improving developer ergonomics across all pages.",
      "Researched and integrated OpenAI and LangChain to power the platform's AI agent features — enabling automated content generation and marketing workflows for real estate teams.",
      "Implemented Stripe payment infrastructure end-to-end: billing plans, webhook handling, and subscription lifecycle management — enabling the product's revenue model.",
      "Led the migration from a personal-use product to a B2B multi-tenant architecture, introducing user groups, roles, and organisation-level access controls.",
      "Refactored core business logic across NestJS modules to align with framework best practices — improving code clarity, testability, and maintainability ahead of team scaling.",
    ],
  },
  {
    slug: "kickavenue",
    title: "KickAvenue",
    description:
      "Full rebuild of Indonesia's authenticated sneaker and streetwear marketplace — 500K+ downloads — from legacy Android to Flutter.",
    longDescription:
      "Led the ground-up rebuild of KickAvenue, an authenticated marketplace for sneakers, apparels, and handbags carrying brands like Jordan, Yeezy, OFF-WHITE, and Nike. Migrated the aging native Android codebase to a modern Flutter application with Riverpod state management, delivering a faster, more maintainable, and visually refined experience across Android and iOS. The app serves tens of thousands of users with features like real-time product search, a make-an-offer bidding system, and seller listing tools.",
    image: "/works/kickavenue.webp",
    category: "Mobile",
    tags: ["Flutter", "Riverpod", "Dart", "Firebase"],
    date: "2024-02-15",
    role: "Product Engineer - Mobile",
    liveUrls: [
      { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.kickavenue.androidshop" },
      { label: "App Store", url: "https://apps.apple.com/id/app/kick-avenue-shop-hype-here/id1478394222" },
    ],
    featured: true,
    confidential: true,
    impacts: [
      "Led the ground-up rebuild from a legacy native Android codebase to a cross-platform Flutter app, delivering both Android and iOS from a single codebase.",
      "Architected a feature-first modular structure with Riverpod for scalable, testable state management — provider scoping enforced predictable data flow across complex marketplace screens.",
      "Implemented repository pattern to abstract the API layer, making the codebase easy to iterate on and reducing onboarding time for new engineers.",
      "Delivered a full UI overhaul — redesigned product discovery, streamlined checkout, and refined brand identity into a modern component library.",
      "Applied lazy loading, image caching, and optimized list rendering to handle smooth browsing across thousands of product listings.",
      "Shipped cross-platform support contributing to the app reaching 500K+ downloads on Android and iOS.",
    ],
  },
  {
    slug: "truequity",
    title: "Truequity",
    description:
      "AI-enhanced multi-asset wealth tracker for crypto, US stocks, IDX stocks, and commodities — with benchmark comparison and Claude-powered transaction extraction.",
    longDescription:
      "Truequity is a modern wealth tracking application built for individual investors managing diversified portfolios across multiple asset classes. It consolidates crypto, US equities, Indonesian (IDX) equities, and commodities into a single dashboard with real-time pricing, benchmark performance comparison against Bitcoin, S&P 500, and IHSG, and AI-powered transaction entry via Claude Vision — eliminating the tedious manual data entry that plagues most portfolio trackers. Built as a full-stack Next.js application with Supabase, TanStack Query, and Recharts.",
    image: "/works/truequity.png",
    category: "Web",
    tags: ["Next.js", "TypeScript", "Supabase", "TanStack Query", "Recharts", "Claude AI"],
    date: "2026-03-19",
    role: "Founder / Product Engineer",
    liveUrls: [
      { label: "Live", url: "https://truequity.vercel.app/" },
    ],
    featured: true,
    sections: {
      problem: {
        body: "Indonesian retail investors who hold diversified portfolios across crypto, US equities, local IDX stocks, and physical gold face a fragmented tracking problem. Positions are spread across Binance, Stockbit, Schwab, and Pegadaian with no single source of truth. Most portfolio trackers show P&L but never answer the real question: am I actually beating the market? On top of that, Indonesian investors constantly juggle IDR-denominated local assets with USD-denominated crypto and US stocks — making total portfolio valuation genuinely complex.",
        quote:
          "You can't manage what you can't see. Every serious investor deserves one place where the full picture is clear.",
      },
      solution: {
        body: "Truequity unifies all four asset classes into a single dashboard with live pricing, cost-basis analytics, and benchmark overlays. The AI extraction feature lets users upload broker screenshots — Claude Vision parses the transaction details automatically, reducing manual entry to a review step. Multi-currency support with live USD/IDR conversion ensures total portfolio value is always accurate regardless of asset denomination.",
        features: [
          {
            name: "UNIFIED_DASHBOARD",
            description:
              "Consolidate crypto, US stocks, IDX stocks, and commodities into one real-time portfolio view with allocation breakdown and total P&L.",
          },
          {
            name: "BENCHMARK_COMPARISON",
            description:
              "Overlay portfolio returns against Bitcoin, S&P 500, and IHSG benchmarks. Both lines start at 0% on day one — no ambiguity.",
          },
          {
            name: "AI_EXTRACTION",
            description:
              "Upload a broker or exchange screenshot. Claude Haiku Vision parses the transaction details and auto-populates the form — supports 20+ platforms.",
          },
          {
            name: "MULTI_CURRENCY",
            description:
              "Live USD/IDR conversion via Yahoo Finance. Switch display currency in one click; all values update instantly across the dashboard.",
          },
        ],
        asset: null,
      },
      technical: {
        body: "Built on Next.js 16 App Router with Supabase handling auth, PostgreSQL, and Row Level Security. All external API calls (CoinGecko, Yahoo Finance, Anthropic) are routed through server-side API routes to protect keys and enable server-side caching. TanStack Query manages client-side caching with aggressive stale times to stay within CoinGecko's free tier limits. The benchmark performance chart builds daily portfolio values by accumulating user transactions over time, then calculates percentage returns from a shared start date — so portfolio and benchmark lines are directly comparable.",
        code: {
          language: "typescript",
          filename: "use-prices.ts",
          content: `export function usePrices(tickers: PriceTicker[]) {
  return useQuery({
    queryKey: ["prices", tickers],
    queryFn: async () => {
      const res = await fetch("/api/prices", {
        method: "POST",
        body: JSON.stringify({ tickers }),
      })
      return res.json() as Promise<PriceMap>
    },
    staleTime: 60_000,      // 60s — respects CoinGecko free tier
    refetchInterval: 60_000,
    enabled: tickers.length > 0,
  })
}

export function useExchangeRate() {
  return useQuery({
    queryKey: ["exchange-rate"],
    queryFn: () => fetch("/api/exchange-rate").then(r => r.json()),
    staleTime: 24 * 60 * 60 * 1000, // 24h cache — IDR/USD is slow-moving
  })
}`,
        },
      },
    },
  },
  {
    slug: "decare",
    title: "DeCare",
    description:
      "Android app for in-home caregivers to detect dementia early and improve patient quality of life — Bangkit Academy 2021 capstone.",
    longDescription:
      "DeCare is an Android application built to support in-home caregivers in improving dementia patients' quality of life. Born from a deeply personal experience with a family member's undiagnosed dementia, the project addresses the lack of accessible early-detection tools — especially in low-to-middle income households where 68% of cases go untreated. Built as a capstone project for Bangkit Academy 2021, DeCare combines MMSE screening with cloud-based ML prediction, daily exercise guidance, activity reminders, health articles, and progress tracking.",
    image: "/works/decare.png",
    category: "Mobile",
    tags: ["Kotlin", "Android", "Firebase", "TensorFlow"],
    date: "2021-06-15",
    role: "Android Developer",
    repoUrl: "https://github.com/B21-CAP0075",
    featured: false,
    sections: {
      problem: {
        body: "Dementia affects over 50 million people globally, with nearly 10 million new cases every year. In Indonesia alone, 1.2 million cases were recorded in 2016 — a number that doubles every 20 years. 68% of cases come from low-to-middle income families, and 61% of patients stay at home without proper treatment due to the high cost of care. The core issue is a lack of knowledge — families and caregivers often dismiss early symptoms like forgetfulness and mood swings as normal aging, delaying diagnosis until it's too late.",
        quote:
          "My grandma went missing for three days. When a neighbor found her far from home, she couldn't remember where she lived or her family's names. That's when we knew it was dementia.",
      },
      solution: {
        body: "DeCare provides an accessible, in-home tool for early dementia detection and ongoing patient care. The app walks caregivers through MMSE screening, sends patient data to a cloud ML model for prediction, and offers daily tools to maintain and improve quality of life.",
        features: [
          {
            name: "MMSE_SCREENING",
            description:
              "Guided Mini-Mental State Examination flow that scores cognitive function and flags early signs of dementia.",
          },
          {
            name: "ML_PREDICTION",
            description:
              "Cloud-based machine learning model analyzes screening results and patient data to predict dementia likelihood.",
          },
          {
            name: "DAILY_CARE",
            description:
              "Exercise guidance, scheduled activity reminders, and curated health articles to support ongoing patient wellbeing.",
          },
          {
            name: "PROGRESS_TRACKING",
            description:
              "Recapitulation dashboard for caregivers to monitor patient progress over time and share with professionals.",
          },
        ],
        asset: { type: "video", url: "/works/decare.mp4" },
      },
      technical: {
        body: "Built natively in Kotlin with Android Jetpack components. The ML pipeline runs on Google Cloud — patient data is sent via REST API to a TensorFlow model that returns a dementia probability score. Firebase handles authentication, real-time database for patient records, and Cloud Messaging for activity reminders.",
        code: {
          language: "kotlin",
          filename: "ScreeningViewModel.kt",
          content: `class ScreeningViewModel(
    private val repository: ScreeningRepository
) : ViewModel() {

    private val _result = MutableLiveData<PredictionResult>()
    val result: LiveData<PredictionResult> = _result

    fun submitScreening(patient: Patient, answers: List<Answer>) {
        viewModelScope.launch {
            val score = MMSECalculator.calculate(answers)
            val prediction = repository.predict(
                patientData = patient,
                mmseScore = score
            )
            _result.value = prediction
        }
    }
}`,
        },
      },
    },
  },
]

export type TagGroup = { label: string; tags: string[] }

/** Derive TAG_GROUPS from actual project tags + categories */
export const TAG_GROUPS: TagGroup[] = (() => {
  const allTags = [...new Set(WORKS.flatMap((w) => w.tags))]
  const allCategories = [...new Set(WORKS.map((w) => w.category))]

  return [
    { label: "Platform", tags: allCategories },
    { label: "Stack", tags: allTags },
  ]
})()

export function getWorkBySlug(slug: string): Work | undefined {
  return WORKS.find((w) => w.slug === slug)
}

export function getFeaturedWorks(): Work[] {
  return WORKS.filter((w) => w.featured)
}
