import { SITE_URL } from "@/lib/siteConfig";

const ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/current-car", priority: 0.7, changeFrequency: "monthly" },
  { path: "/future-car", priority: 0.6, changeFrequency: "monthly" },
  { path: "/achievements", priority: 0.8, changeFrequency: "weekly" },
  { path: "/sponsors", priority: 0.8, changeFrequency: "weekly" },
  { path: "/merchandise", priority: 0.4, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/apply", priority: 0.9, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap() {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
