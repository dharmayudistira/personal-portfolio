import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dharma Yudistira — Product Engineer",
    short_name: "Dharma_PE",
    description:
      "Product Engineer building full-stack systems from database to pixel.",
    start_url: "/",
    display: "standalone",
    background_color: "#131313",
    theme_color: "#131313",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
