/**
 * Roadmap Data Module
 * 
 * This module contains a static copy of the roadmaps available on roadmap.sh
 * to provide the Gemini API with rich context about standard developer paths,
 * skills, and best practices.
 * 
 * Categories:
 *   - Role-based (Frontend, Backend, DevOps, etc.)
 *   - Skill-based (React, Node.js, SQL, etc.)
 *   - Best practices (API Security, Performance, Code Review, etc.)
 */

export { ROLE_ROADMAPS } from './role-roadmaps'
export { SKILL_ROADMAPS } from './skill-roadmaps'
export { BEST_PRACTICES } from './best-practices'
export { ALL_ROADMAPS, getRoadmapsByCategory, getRoadmapBySlug, getRelevantRoadmaps } from './helpers'
export type { Roadmap, RoadmapTopic, RoadmapCategory } from './types'
