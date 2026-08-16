import { SITE_URL } from "@/lib/siteConfig";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/profile", "/unauthorized"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
