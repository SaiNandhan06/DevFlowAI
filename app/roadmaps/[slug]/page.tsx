import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_ROADMAPS, getRoadmapBySlug } from '@/data/roadmaps'

export function generateStaticParams() {
  return ALL_ROADMAPS.map((roadmap) => ({
    slug: roadmap.slug,
  }))
}

export default async function RoadmapDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const roadmap = getRoadmapBySlug(params.slug)
  
  if (!roadmap) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="nav-fixed">
        <Link href="/" className="text-sm font-bold tracking-widest uppercase text-white">DevFlow AI</Link>
        <span className="tag-lavender hidden md:inline-flex">Roadmap Details</span>
        <Link href="/roadmaps" className="btn-ghost text-xs uppercase tracking-widest py-2.5 px-5">
          ← Back to Roadmaps
        </Link>
      </nav>

      <div className="pt-28 pb-24 px-6 max-w-4xl mx-auto">
        <div className="mb-12 pb-10 border-b border-white/8 reveal">
          <div className="flex items-center gap-3 mb-4">
            <span className="tag-lavender uppercase tracking-widest text-[10px]">{roadmap.category}</span>
          </div>
          <h1 className="text-display mt-3 mb-4">{roadmap.title}</h1>
          <p className="text-[#808080] text-base leading-relaxed max-w-2xl">{roadmap.description}</p>
        </div>

        <div className="card-glass p-8 text-center reveal reveal-delay-1 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4FF3F] opacity-[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="w-16 h-16 bg-[#D4FF3F]/10 text-[#D4FF3F] border border-[#D4FF3F]/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 relative z-10">
            🤖
          </div>
          <h2 className="text-2xl font-bold mb-4 relative z-10">Want a personalized learning path?</h2>
          <p className="text-[#808080] text-sm mb-8 max-w-md mx-auto leading-relaxed relative z-10">
            Use DevFlow AI to automatically generate a custom, step-by-step interactive workflow tailored specifically for learning <strong>{roadmap.title}</strong>, complete with tool suggestions and prompts.
          </p>
          <Link 
            href={`/generate?q=${encodeURIComponent(`I want to learn ${roadmap.title}. Create a detailed step-by-step learning roadmap and suggest the best tools and prompts for each phase.`)}`}
            className="btn-lime text-sm uppercase tracking-widest py-3 px-8 inline-block relative z-10"
          >
            Generate AI Workflow →
          </Link>
        </div>
      </div>
    </main>
  )
}
