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
    slug: "decare",
    title: "DeCare",
    description:
      "Android app for in-home caregivers to detect dementia early and improve patient quality of life — Bangkit Academy 2021 capstone.",
    longDescription:
      "DeCare is an Android application built to support in-home caregivers in improving dementia patients' quality of life. Born from a deeply personal experience with a family member's undiagnosed dementia, the project addresses the lack of accessible early-detection tools — especially in low-to-middle income households where 68% of cases go untreated. Built as a capstone project for Bangkit Academy 2021, DeCare combines MMSE screening with cloud-based ML prediction, daily exercise guidance, activity reminders, health articles, and progress tracking.",
    image: "/works/decare-hero.png",
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
