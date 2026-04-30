import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self'; form-action 'self'; base-uri 'self'",
  },
]

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }]
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      ["remark-frontmatter", { type: "yaml", marker: "-" }],
      "remark-gfm",
    ],
  },
});

export default withMDX(nextConfig);
