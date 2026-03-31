import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
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
    default: "Dharma Yudistira — Product Engineer",
    template: "%s — Dharma Yudistira",
  },
  description:
    "Product Engineer building web and mobile experiences end-to-end — from database schema to the last pixel on screen.",
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
    locale: "en_US",
    siteName: "Dharma Yudistira",
    title: "Dharma Yudistira — Product Engineer",
    description:
      "Product Engineer building web and mobile experiences end-to-end — from database schema to the last pixel on screen.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@justamannothero",
    title: "Dharma Yudistira — Product Engineer",
    description:
      "Product Engineer building web and mobile experiences end-to-end — from database schema to the last pixel on screen.",
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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-clip">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
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
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
