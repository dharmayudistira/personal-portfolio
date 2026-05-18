import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { PageviewTracker } from "@/components/providers/pageview-tracker"
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google"
import { QueryProvider } from "@/components/providers/query-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { AppShell } from "@/components/layout/app-shell"
import { Footer } from "@/components/layout/footer"
import { getAllPosts } from "@/lib/posts"
import { WORKS } from "@/lib/data/works"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Dharma Yudistira - Product Engineer",
    template: "%s - Dharma Yudistira",
  },
  description:
    "Product Engineer building web and mobile experiences end-to-end - from database schema to the last pixel on screen. Based in Sidoarjo, Indonesia.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  keywords: [
    "Product Engineer",
    "Full-Stack Developer",
    "TypeScript",
    "React",
    "Next.js",
    "Flutter",
    "Kotlin",
    "Portfolio",
  ],
  authors: [{ name: "Dharma Yudistira" }],
  creator: "Dharma Yudistira",
  openGraph: {
    type: "website",
    url: "https://www.dharma-yudistira.com",
    locale: "en_US",
    siteName: "Dharma Yudistira",
    title: "Dharma Yudistira - Product Engineer",
    description:
      "Product Engineer building web and mobile experiences end-to-end - from database schema to the last pixel on screen.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@justamannothero",
    creator: "@justamannothero",
    title: "Dharma Yudistira - Product Engineer",
    description:
      "Product Engineer building web and mobile experiences end-to-end - from database schema to the last pixel on screen.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-clip">
        {/* Grain noise overlay - breaks flat digital feel */}
        <div
          className="pointer-events-none fixed inset-0 z-[9990] opacity-[0.035] dark:opacity-[0.055]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "200px",
          }}
          aria-hidden="true"
        />
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <AppShell
              searchItems={[
                ...WORKS.map((w) => ({
                  type: "work" as const,
                  slug: w.slug,
                  title: w.title,
                })),
                ...getAllPosts().map((p) => ({
                  type: "post" as const,
                  slug: p.slug,
                  title: p.title,
                })),
              ]}
            >
              {children}
            </AppShell>
            <Footer />
            <Analytics />
            <PageviewTracker />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
