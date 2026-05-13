export type RoadmapCategory = 'role' | 'skill' | 'best-practices'

export interface RoadmapTopic {
  id: string
  title: string
  description?: string
}

export interface Roadmap {
  id: string
  slug: string
  title: string
  category: RoadmapCategory
  description: string
  url: string
  topics?: RoadmapTopic[]
}
