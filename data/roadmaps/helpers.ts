import { Roadmap, RoadmapCategory } from './types'
import { ROLE_ROADMAPS } from './role-roadmaps'
import { SKILL_ROADMAPS } from './skill-roadmaps'
import { BEST_PRACTICES } from './best-practices'

export const ALL_ROADMAPS: Roadmap[] = [
  ...ROLE_ROADMAPS,
  ...SKILL_ROADMAPS,
  ...BEST_PRACTICES
]

export function getRoadmapsByCategory(category: RoadmapCategory): Roadmap[] {
  return ALL_ROADMAPS.filter(roadmap => roadmap.category === category)
}

export function getRoadmapBySlug(slug: string): Roadmap | undefined {
  return ALL_ROADMAPS.find(roadmap => roadmap.slug === slug)
}

export function getRelevantRoadmaps(query: string, limit: number = 5): Roadmap[] {
  const normalizedQuery = query.toLowerCase()
  return ALL_ROADMAPS.filter(roadmap => 
    roadmap.title.toLowerCase().includes(normalizedQuery) || 
    roadmap.description.toLowerCase().includes(normalizedQuery)
  ).slice(0, limit)
}
