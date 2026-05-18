import type { Metadata } from "next"
import { Hero } from "@/components/home/hero"
import { TechMarquee } from "@/components/home/tech-marquee"
import { FeaturedWorks } from "@/components/home/featured-works"
import { RecentPosts } from "@/components/home/recent-posts"
import { Connect } from "@/components/home/connect"
import { SectionDivider } from "@/components/shared/section-divider"

export const metadata: Metadata = {
  title: "Dharma Yudistira - Product Engineer",
  description:
    "Product Engineer building web and mobile experiences end-to-end - from database schema to the last pixel on screen.",
  alternates: { canonical: "/" },
}

const personSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.dharma-yudistira.com/#person",
      name: "Dharma Yudistira",
      url: "https://www.dharma-yudistira.com",
      image: "https://www.dharma-yudistira.com/avatar.jpeg",
      jobTitle: "Product Engineer",
      description:
        "Product Engineer building web and mobile experiences end-to-end - from database schema to the last pixel on screen.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sidoarjo",
        addressCountry: "ID",
      },
      sameAs: [
        "https://twitter.com/justamannothero",
        "https://github.com/dharmayudistira",
        "https://www.linkedin.com/in/dharma-yudistira/",
      ],
      knowsAbout: [
        "TypeScript",
        "React",
        "Next.js",
        "Flutter",
        "Kotlin",
        "Full-Stack Web Development",
        "Mobile Development",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.dharma-yudistira.com/#website",
      url: "https://www.dharma-yudistira.com",
      name: "Dharma Yudistira",
      description:
        "Product Engineer building web and mobile experiences end-to-end - from database schema to the last pixel on screen.",
      author: { "@id": "https://www.dharma-yudistira.com/#person" },
    },
  ],
}

export default function HomePage() {
  return (
    <div className="px-6 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Hero />
      <SectionDivider label="DIV:01" />
      <TechMarquee />
      <SectionDivider label="DIV:02" />
      <FeaturedWorks />
      <SectionDivider label="DIV:03" />
      <RecentPosts />
      <SectionDivider label="DIV:04" />
      <Connect />
    </div>
  )
}
