import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!profile.siteUrl) return [];
  return ["", "/brief"].map(path => ({ url: `${profile.siteUrl}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: path ? 0.7 : 1 }));
}
