import type { MetadataRoute } from "next";

const baseUrl = "https://trails-and-memoirs.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl },
    { url: `${baseUrl}/expeditions` },
    { url: `${baseUrl}/about` },
    { url: `${baseUrl}/contact` },
    { url: `${baseUrl}/booking` },
    { url: `${baseUrl}/faq` },
    { url: `${baseUrl}/shop` },
    { url: `${baseUrl}/adventures` },
    { url: `${baseUrl}/profile` },
  ];
}
