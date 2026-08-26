import { MetadataRoute } from 'next'
import { ALL_ROADMAPS } from '@/data/roadmaps'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devflow-ai.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/generate`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/roadmaps`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ]

  const roadmapRoutes: MetadataRoute.Sitemap = ALL_ROADMAPS.map((roadmap) => ({
    url: `${SITE_URL}/roadmaps/${roadmap.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [...staticRoutes, ...roadmapRoutes]
}
