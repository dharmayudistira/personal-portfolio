export type Work = {
  slug: string
  title: string
  seoTitle?: string
  description: string
  ogImageDimensions?: { width: number; height: number }
  longDescription: string
  image?: string
  category: "Web" | "Mobile" | "Desktop" | "Open Source"
  tags: string[]
  createdAt: string
  updatedAt: string
  role: string
  liveUrls?: { label: string; url: string }[]
  repoUrl?: string
  featured: boolean
  featuredOrder?: number
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
      asset?: { type: "image" | "video"; url: string; poster?: string } | null
    }
    technical: {
      body: string
      code: { language: string; filename: string; content: string }
    }
  }
}

const _WORKS: Work[] = [
  {
    slug: "sukanda-onelink",
    title: "Sukanda Onelink",
    image: "/works/sukanda.png",
    description:
      "B2B procurement platform for PT Diamond Food Indonesia. Restaurants, cafes, and food businesses across 21 Indonesian cities browse the catalogue, place orders, and track deliveries from one place, around the clock.",
    longDescription:
      "Sukanda Onelink is the digital procurement arm of PT Diamond Food Indonesia, one of the country's largest F&B distributors. The platform lets restaurants, cafes, and food businesses across 21 Indonesian cities browse the catalogue, place orders, and track deliveries from any device, any time of day. I joined as a Product Engineer on the web team, shipping features that thousands of active business accounts use daily.",
    category: "Web",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "TanStack Query"],
    createdAt: "2025-07-07",
    updatedAt: "2025-07-07",
    role: "Product Engineer - Web",
    liveUrls: [
      { label: "Website", url: "https://www.sukandaonelink.com/" },
    ],
    featured: true,
    featuredOrder: 3,
    confidential: true,
    impacts: [
      "Worked on a platform that serves 9,000+ active F&B business accounts across 21 Indonesian cities. Real-time order creation and tracking had to hold up at that scale without falling over during peak hours.",
      "Built and maintained core web surfaces: multi-outlet account management for chains running several branches, the order tracking flow, and the promotional campaign pages that drive seasonal pushes.",
      "Rebuilt the data-fetching and caching layer around TanStack Query. Cut redundant API calls across the catalogue and order flows and made page-to-page navigation feel noticeably more responsive.",
      "Worked closely with backend and design to keep the web and mobile ordering experiences in sync, so customers using both never had to relearn the flow.",
      "Shipped features on a structured release cadence aligned to PT Diamond Food Indonesia's product roadmap, coordinated with the wider product, design, and QA teams.",
    ],
  },
  {
    slug: "simpan",
    title: "Simpan",
    seoTitle: "Simpan: Flutter Investing App for Indonesian Investors",
    description:
      "Took over a legacy Flutter investing app from a previous vendor. Refactored the BLoC architecture, built a test suite from near-zero coverage, and shipped to production with a 4.8 App Store rating.",
    longDescription:
      "Simpan is a guided investing app for everyday Indonesian investors. My team took over the project from a previous vendor, inheriting a Flutter codebase with years of accumulated tech debt, inconsistent patterns, and almost no tests. The first phase was not feature work, it was triage: audit the worst offenders, settle on a single BLoC pattern, build a test harness from near-zero coverage, and clear the bug backlog that had been blocking releases. Once the foundation held up, we resumed feature delivery and shipped the app to production.",
    image: "/works/simpan.webp",
    category: "Mobile",
    tags: ["Flutter", "BLoC", "Dart", "Firebase"],
    createdAt: "2022-11-14",
    updatedAt: "2022-11-14",
    role: "Product Engineer - Mobile",
    liveUrls: [
      { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.simpan.mobile.stg" },
      { label: "App Store", url: "https://apps.apple.com/id/app/simpan-guided-investing/id6444825882" },
    ],
    featured: false,
    confidential: true,
    impacts: [
      "Inherited a legacy Flutter codebase from a previous vendor. Spent the first phase auditing the worst offenders, identifying critical issues, and writing a recovery plan before any new feature work resumed.",
      "Refactored state management to follow proper BLoC conventions, replacing the mix of patterns the previous team had left behind. Made the codebase predictable enough that new engineers could ship features without constantly asking which pattern to follow.",
      "Built a test suite from near-zero coverage. Unit and widget tests across onboarding, portfolio selection, and transactions, so the flows that mattered most could be changed without crossing fingers on every release.",
      "Cleared the bug backlog across onboarding, portfolio selection, and transaction screens that had been blocking releases since the handover, stabilising the app to a product-ready state.",
      "Defined and enforced coding standards and architecture conventions across the team, so the patterns we had just spent months consolidating would not start drifting again.",
      "Worked closely with product and backend to scope, estimate, and deliver features on a structured release cadence once the codebase was healthy enough to build on again.",
      "App shipped to production with 1K+ downloads, a 4.8 rating on the App Store, and 4.3 on Google Play, reflecting the quality lift from the stabilisation effort.",
    ],
  },
  {
    slug: "agentai",
    title: "AgentAI",
    seoTitle: "AgentAI: AI Marketing Automation for Real Estate Teams",
    description:
      "Joined a legacy Next.js + NestJS SaaS for real estate marketing. Migrated Chakra to MUI, wired up OpenAI and LangChain, shipped Stripe billing, and rebuilt the whole product from single-user to B2B multi-tenant.",
    longDescription:
      "AgentAI is a SaaS that helps real estate teams automate their marketing with AI. I joined as a Product Engineer when the codebase was already a few years old and carrying real tech debt, and the product needed to evolve fast on top of that: a UI overhaul, AI features, payments, and a shift from a single-user tool to a proper B2B platform. I owned both sides of the stack across that evolution. Most days were a mix of paying down debt in old NestJS modules, shipping new React surfaces in MUI, and figuring out how to drop OpenAI and LangChain into workflows that previously had no AI in them at all.",
    image: "/works/agentai.jpeg",
    category: "Web",
    tags: ["Next.js", "TypeScript", "NestJS", "OpenAI", "LangChain", "MUI", "Stripe", "MongoDB"],
    createdAt: "2026-03-05",
    updatedAt: "2026-03-05",
    role: "Product Engineer - Fullstack",
    liveUrls: [
      { label: "Website", url: "https://agentai.ai/" },
    ],
    featured: false,
    confidential: true,
    impacts: [
      "Inherited a multi-year-old Next.js + NestJS codebase with significant accumulated debt. Audited the worst-offending modules first, then split each sprint between paying down debt and shipping the features the roadmap actually needed.",
      "Migrated the entire UI from Chakra UI to Material UI, page by page. Set up shared theming and component primitives early so each subsequent page took less time to port than the last one.",
      "Researched and integrated OpenAI and LangChain into the platform's core marketing workflows. The hardest part was not the API calls, it was reshaping the existing data flow so AI output had somewhere to land without breaking the parts that already worked.",
      "Built Stripe billing from scratch: plan modelling, checkout, webhook handling, and the full subscription lifecycle (trial, upgrade, downgrade, cancel, payment failure). This was the work that turned the product into a revenue-generating one.",
      "Drove the migration from a single-user product to multi-tenant B2B. Introduced organisations, user groups, and role-based access control across the API and the UI. Required rewriting most queries to be tenant-scoped and backfilling existing users into a default tenant without breaking the live app.",
      "Refactored core business logic across NestJS modules to follow framework conventions instead of the improvised patterns the original team had left behind. Made the code easier to test and easier for the next engineer to onboard into.",
    ],
  },
  {
    slug: "kickavenue",
    title: "KickAvenue",
    seoTitle: "KickAvenue: Flutter Rebuild for Indonesia's Sneaker Marketplace",
    description:
      "Ground-up Flutter rebuild of KickAvenue, Indonesia's authenticated sneaker marketplace. One codebase for Android and iOS, Riverpod under the hood, shipped to 500K+ downloads.",
    ogImageDimensions: { width: 1029, height: 914 },
    longDescription:
      "KickAvenue is Indonesia's authenticated marketplace for sneakers, apparel, and handbags, carrying brands like Jordan, Yeezy, OFF-WHITE, and Nike. The aging native Android codebase had hit the point where iteration was getting expensive, so the team went for a ground-up rebuild rather than another round of patches. I led the migration to Flutter with Riverpod, shipping Android and iOS from a single codebase and giving the product a faster, calmer, more maintainable foundation. The app serves tens of thousands of users with real-time product search, a make-an-offer bidding system, and seller listing tools.",
    image: "/works/kickavenue.webp",
    category: "Mobile",
    tags: ["Flutter", "Riverpod", "Dart", "Firebase"],
    createdAt: "2023-05-12",
    updatedAt: "2023-05-12",
    role: "Product Engineer - Mobile",
    liveUrls: [
      { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.kickavenue.androidshop" },
      { label: "App Store", url: "https://apps.apple.com/id/app/kick-avenue-shop-hype-here/id1478394222" },
    ],
    featured: true,
    featuredOrder: 2,
    confidential: true,
    impacts: [
      "Led the ground-up rebuild from a legacy native Android codebase to a cross-platform Flutter app. Android and iOS now ship from one codebase, so every new feature lands on both platforms in a single pass.",
      "Architected the project as feature-first modules with Riverpod handling state. Provider scoping kept data flow predictable on the screens with the most moving parts (search, listing detail with live offers, checkout) where the previous codebase had been hardest to reason about.",
      "Wrapped the API layer in a repository pattern so screens never touch HTTP directly. New engineers could land features without having to learn the network stack first.",
      "Delivered a full UI overhaul: redesigned product discovery, streamlined checkout, and refined the brand identity into a reusable component library that the rest of the app builds on.",
      "Applied lazy loading, aggressive image caching, and tuned list rendering so browsing stays smooth across thousands of product listings, even on lower-end Android devices.",
      "Shipped cross-platform support that contributed to the app reaching 500K+ combined downloads across Android and iOS.",
    ],
  },
  {
    slug: "truequity",
    title: "Truequity",
    seoTitle: "Truequity: AI Portfolio Tracker for IDX, US Stocks & Crypto",
    description:
      "One dashboard for Indonesian stocks, US equities, and crypto. Drop a broker screenshot, Claude fills the form. Built it because checking my portfolio meant opening three different apps every morning.",
    ogImageDimensions: { width: 2880, height: 1732 },
    longDescription:
      "I hold positions across Indonesian stocks, US equities, and crypto. Checking how the whole thing was doing meant opening three different apps and reconciling everything in a spreadsheet I'd keep up for a few weeks then abandon. Nothing existing took IDX seriously and also felt calm enough to use daily, so I shipped one. Truequity tracks IDX stocks (with proper LOT handling), US equities, and crypto on a single dark dashboard, benchmarks the whole portfolio against IHSG, S&P 500, and Bitcoin on the same chart, and uses Claude Vision to read broker screenshots so I never have to type a trade again. Built with Next.js 16, Supabase, and TanStack Query.",
    image: "/works/truequity.png",
    category: "Web",
    tags: ["Next.js", "TypeScript", "Supabase", "TanStack Query", "Recharts", "Claude AI"],
    createdAt: "2026-04-02",
    updatedAt: "2026-04-02",
    role: "Founder / Product Engineer",
    liveUrls: [
      { label: "Website", url: "https://truequity.vercel.app/" },
    ],
    featured: true,
    featuredOrder: 1,
    sections: {
      problem: {
        body: "Indonesian retail investors who hold a mix of local stocks, US equities, and crypto have no single source of truth for their portfolio. Global trackers ignore IDX or treat it as a special case with manual workarounds. Brokerage apps each cover their own slice well but make money when users trade more, not when users reflect. Spreadsheets rot inside two months. The result is the daily fragmentation tax: open the Indonesian broker app first, then the US broker, then the crypto exchange, then do arithmetic in your head to figure out where you stand. On top of that, every Indonesian multi-asset investor is constantly translating between IDR for local positions and USD for crypto and US stocks, which makes total portfolio value genuinely hard to know without sitting down with a calculator.",
        quote: "You can't manage what you can't see.",
      },
      solution: {
        body: "Truequity is one calm dashboard with four jobs: track everything in one place, tell me whether I'm beating the market, kill the typing on transaction entry, and respect Indonesian conventions natively. It is deliberately monitoring-only. No buy buttons, no trade prompts, no gamification, no encouraging copy when the portfolio is down. The whole thing is built to answer one question without making the user work for it: how is the portfolio doing this week, and against what?",
        features: [
          {
            name: "Unified Dashboard",
            description:
              "IDX stocks, US equities, crypto, and idle cash on one screen. Toggle between USD and IDR; every value updates within a second.",
          },
          {
            name: "Benchmark Chart",
            description:
              "Time-weighted portfolio return overlaid against IHSG, S&P 500, or Bitcoin on the same line. Both start at zero on day one so the comparison is honest, not flattering.",
          },
          {
            name: "AI Screenshot Extraction",
            description:
              "Drop a broker or exchange screenshot. Claude Vision pulls ticker, quantity, price, and date in about three seconds. You check the form and save. The model never submits for you.",
          },
          {
            name: "Realized P&L Calendar",
            description:
              "Heatmap of realized gains and losses per trading day, computed client-side from sell records using weighted-average cost basis. Hover (desktop) or scroll the activity feed (mobile) for the per-trade breakdown.",
          },
          {
            name: "Cash Ledger",
            description:
              "Idle cash tracked alongside positions in both currencies. Buys and sells with cash impact debit and credit automatically; everything else is a manual deposit or withdrawal.",
          },
        ],
        asset: { type: "video", url: "/works/truequity.mp4" },
      },
      technical: {
        body: "Next.js 16 App Router with Supabase handling Postgres, Auth, and Row Level Security. Every external API call (CoinGecko, Yahoo Finance, Anthropic) routes through server-side API routes so keys stay on the server and responses can be cached. TanStack Query manages client-side caching with aggressive stale times to stay inside CoinGecko's 10K/month free tier during beta. The benchmark chart accumulates user transactions into daily portfolio values, then converts both portfolio and benchmark to percentage returns from a shared start date so the two lines are directly comparable instead of the usual apples-to-oranges overlay. Realized P&L runs entirely client-side: sell records are processed chronologically, each matched against accumulated cost basis per ticker using weighted-average, with everything normalised to IDR via the live exchange rate.",
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
    staleTime: 60_000,      // 60s, respects CoinGecko free tier
    refetchInterval: 60_000,
    enabled: tickers.length > 0,
  })
}

export function useExchangeRate() {
  return useQuery({
    queryKey: ["exchange-rate"],
    queryFn: () => fetch("/api/exchange-rate").then(r => r.json()),
    staleTime: 24 * 60 * 60 * 1000, // 24h cache, IDR/USD is slow-moving
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
      "Android app for in-home caregivers to detect dementia early and support patient quality of life. Built as a Bangkit Academy 2021 capstone.",
    longDescription:
      "DeCare is an Android app for in-home caregivers looking after dementia patients. The project came out of a personal experience: a family member whose dementia went undiagnosed because the early signs looked like normal aging, and because no one in the family knew where to look for help. Indonesia has 1.2 million recorded cases, 68% of them in low-to-middle income households where care is largely informal and detection tools are out of reach. DeCare combines MMSE screening with cloud-based ML prediction, daily exercise guidance, activity reminders, curated health articles, and progress tracking. Built as a capstone for Bangkit Academy 2021.",
    image: "/works/decare.png",
    category: "Mobile",
    tags: ["Kotlin", "Android", "Firebase", "TensorFlow"],
    createdAt: "2021-06-15",
    updatedAt: "2021-06-15",
    role: "Android Developer",
    repoUrl: "https://github.com/B21-CAP0075",
    featured: true,
    featuredOrder: 4,
    sections: {
      problem: {
        body: "Dementia affects over 50 million people globally, with nearly 10 million new cases every year. In Indonesia alone, 1.2 million cases were recorded in 2016, a number that doubles every 20 years. 68% of cases come from low-to-middle income families, and 61% of patients stay at home without proper treatment because professional care is too expensive. The deeper problem is awareness. Families and caregivers often read early symptoms like forgetfulness and mood swings as normal aging, so the diagnosis arrives years late, when interventions matter much less.",
        quote:
          "My grandma went missing for three days. When a neighbor found her far from home, she couldn't remember where she lived or her family's names. That's when we knew it was dementia.",
      },
      solution: {
        body: "DeCare puts an early-detection tool directly in the caregiver's hands. The app walks them through the MMSE screening step by step, sends the results to a cloud ML model for a prediction, and then keeps showing up after the screening with daily exercises, activity reminders, and care guidance. Detection is the start of the relationship with the app, not the end of it.",
        features: [
          {
            name: "MMSE_SCREENING",
            description:
              "Guided Mini-Mental State Examination flow with step-by-step prompts. Scores cognitive function and flags early warning signs.",
          },
          {
            name: "ML_PREDICTION",
            description:
              "Screening results and patient data are sent to a cloud ML model that returns a likelihood score, so the caregiver does not have to interpret the MMSE on their own.",
          },
          {
            name: "DAILY_CARE",
            description:
              "Cognitive exercises, scheduled activity reminders, and a small library of caregiver-oriented articles to support the patient day to day.",
          },
          {
            name: "PROGRESS_TRACKING",
            description:
              "Dashboard that tracks screening scores and care activity over time. Caregivers can review progress at home and bring the same view to a doctor visit.",
          },
        ],
        asset: { type: "video", url: "/works/decare.mp4" },
      },
      technical: {
        body: "Built natively in Kotlin with Android Jetpack components. The ML pipeline runs on Google Cloud: patient data is sent via REST to a TensorFlow model that returns a dementia probability score. Firebase handles authentication, real-time database for patient records, and Cloud Messaging for the activity reminders.",
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

export const WORKS: Work[] = [..._WORKS].sort(
  (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
)

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
  return WORKS.filter((w) => w.featured).sort(
    (a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99)
  )
}
