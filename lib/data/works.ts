export type Work = {
  slug: string
  title: string
  description: string
  longDescription: string
  image: string
  category: "Web" | "Mobile" | "Desktop" | "Open Source"
  tags: string[]
  date: string
  role: string
  liveUrl?: string
  repoUrl?: string
  featured: boolean
  sections: {
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
    liveUrl: "https://play.google.com/store/apps/details?id=com.kickavenue.androidshop",
    featured: true,
    sections: {
      problem: {
        body: "The existing KickAvenue app was built on a legacy native Android stack that had accumulated years of tech debt. The UI felt outdated compared to modern marketplace apps, the codebase was difficult to maintain and iterate on, and there was no iOS counterpart — limiting the platform's reach. Performance bottlenecks in product browsing and checkout flows led to high drop-off rates.",
        quote:
          "The app needed more than a facelift — the entire foundation had to be rebuilt to support the pace the business demanded.",
      },
      solution: {
        body: "Rebuilt the entire application from scratch using Flutter for cross-platform delivery and Riverpod for scalable, testable state management. The new architecture emphasizes clean separation of concerns, reactive data flows, and a design system that aligns with modern marketplace UX patterns.",
        features: [
          {
            name: "CROSS_PLATFORM",
            description:
              "Single Flutter codebase serving both Android and iOS, eliminating the need for separate native teams.",
          },
          {
            name: "REACTIVE_STATE",
            description:
              "Riverpod-driven state architecture with provider scoping for predictable data flow across complex marketplace screens.",
          },
          {
            name: "DESIGN_OVERHAUL",
            description:
              "Complete UI redesign with modern component library — improved product discovery, streamlined checkout, and refined brand identity.",
          },
          {
            name: "PERF_OPTIMIZATION",
            description:
              "Lazy loading, image caching, and optimized list rendering for smooth browsing across thousands of product listings.",
          },
        ],
        asset: null,
      },
      technical: {
        body: "The architecture follows a feature-first modular structure with Riverpod providers handling async data, caching, and side effects. Repository pattern abstracts the API layer, making it trivial to swap data sources or add offline support. Navigation uses a declarative routing approach with deep link support for product sharing.",
        code: {
          language: "dart",
          filename: "product_provider.dart",
          content: `@riverpod
Future<List<Product>> productList(
  ProductListRef ref, {
  required String category,
  int page = 1,
}) async {
  final repository = ref.watch(productRepositoryProvider);
  final products = await repository.getProducts(
    category: category,
    page: page,
  );

  // Cache invalidation on pull-to-refresh
  ref.keepAlive();
  return products;
}`,
        },
      },
    },
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
    liveUrl: "https://truequity.vercel.app/",
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
    featured: true,
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
