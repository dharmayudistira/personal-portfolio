import type { Metadata } from "next"
import { Hero } from "@/components/home/hero"

export const metadata: Metadata = {
  title: "Dharma Yudistira — Product Engineer",
  description:
    "Product Engineer building web and mobile experiences end-to-end — from database schema to the last pixel on screen.",
}
import { TechMarquee } from "@/components/home/tech-marquee"
import { FeaturedWorks } from "@/components/home/featured-works"
import { RecentPosts } from "@/components/home/recent-posts"
import { Connect } from "@/components/home/connect"
import { SectionDivider } from "@/components/shared/section-divider"

export default function HomePage() {
  return (
    <div className="px-6 lg:px-12">
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
