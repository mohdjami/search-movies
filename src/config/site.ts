import { SiteConfig } from "@/types";
import { env } from "@/env.mjs";
export const siteConfig: SiteConfig = {
  name: "Movie Search Engine",
  author: "mohdjami",
  description: "Search movies, create Lists and share them to public.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Radix UI",
    "shadcn/ui",
    "Movies",
    "Playlists",
  ],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://github.com/mohdjami",
  },
  links: {
    github: "https://github.com/mohdjami/search-movies",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
};
