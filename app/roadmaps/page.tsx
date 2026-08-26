import Link from 'next/link'
import type { Metadata } from 'next'
import { ROLE_ROADMAPS, SKILL_ROADMAPS, BEST_PRACTICES } from '@/data/roadmaps'

export const metadata: Metadata = {
  title: 'Developer Roadmaps & Structured Learning Paths',
  description: 'Explore curated role-based, skill-based, and best-practice roadmaps for Frontend, Backend, Full Stack, DevOps, AI Data Science, and React development.',
  keywords: [
    'developer roadmaps',
    'frontend developer roadmap',
    'backend developer roadmap',
    'full stack roadmap',
    'devops roadmap',
    'ai engineer learning path',
    'react roadmap',
    'software engineering guides'
  ],
}

export default function RoadmapsPage() {
  const categories = [
    { title: 'Role Based Roadmaps', items: ROLE_ROADMAPS },
    { title: 'Skill Based Roadmaps', items: SKILL_ROADMAPS },
    { title: 'Best Practices', items: BEST_PRACTICES }
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="nav-fixed">
        <Link href="/" className="text-sm font-bold tracking-widest uppercase text-white">DevFlow AI</Link>
        <span className="tag-lavender hidden md:inline-flex">Roadmaps Hub</span>
        <Link href="/resources" className="btn-ghost text-xs uppercase tracking-widest py-2.5 px-5">
          ← Back to Resources
        </Link>
      </nav>

      <div className="pt-28 pb-24 px-6 max-w-6xl mx-auto">
        <div className="mb-16 reveal">
          <span className="mono-label">/ Developer Roadmaps</span>
          <h1 className="text-display mt-4 mb-5">
            Structured learning paths<br/>
            <span className="text-outlined">for developers.</span>
          </h1>
          <p className="text-[#808080] text-base leading-relaxed max-w-2xl">
            Step by step guides and paths to learn different tools or technologies, all seamlessly integrated into your workflow.
          </p>
        </div>

        {categories.map((cat, idx) => (
          <section key={idx} className="mb-16 reveal reveal-delay-1">
            <h2 className="text-xl font-bold mb-6 text-white/90">{cat.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.items.map((rm) => (
                <Link
                  key={rm.id}
                  href={`/roadmaps/${rm.slug}`}
                  className="card-glass p-6 flex flex-col group"
                >
                  <h3 className="font-bold text-sm group-hover:text-[#D4FF3F] transition-colors mb-2 leading-snug">
                    {rm.title}
                  </h3>
                  <p className="text-[#808080] text-xs leading-relaxed flex-1 mb-4">{rm.description}</p>
                  <div className="flex items-center gap-1 text-[#444] group-hover:text-[#D4FF3F] transition-colors text-xs font-bold uppercase tracking-widest mt-auto">
                    View Details →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
