import Link from 'next/link'

const FEATURES = [
  {
    num: '01',
    title: 'AI-Generated Plan',
    desc: 'Get a phased project plan tailored to your idea and experience level. No templates. Pure intelligence.',
  },
  {
    num: '02',
    title: 'Right Tools Only',
    desc: 'We cut through the noise. You get only the best free AI tools, matched precisely to your stack.',
  },
  {
    num: '03',
    title: 'Ready-to-Use Prompts',
    desc: 'Professional prompt templates for every tool in your workflow — no guessing, no wasted time.',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* ── Fixed Nav ────────────────────────────── */}
      <nav className="nav-fixed">
        <span className="text-sm font-bold tracking-widest uppercase text-white">DevFlow AI</span>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/generate" className="text-sm text-[#808080] hover:text-white transition-colors">Generate</Link>
          <Link href="/resources" className="text-sm text-[#808080] hover:text-white transition-colors">Resources</Link>
          <Link href="#features" className="text-sm text-[#808080] hover:text-white transition-colors">Features</Link>
        </div>
        <Link href="/generate" className="btn-lime text-xs uppercase tracking-widest py-2.5 px-5">
          Try Free →
        </Link>
      </nav>

      {/* ── Hero ─────────────────────────────────── */}
      <section className="dot-grid min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D4FF3F]/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-[#B692FE]/5 blur-[100px] pointer-events-none" />

        <span className="tag-lavender mb-8 reveal">AI-Powered Developer Workflow Advisor</span>

        <h1 className="text-mega mb-2 reveal reveal-delay-1">
          FROM IDEA
        </h1>
        <h1 className="text-mega text-outlined mb-2 reveal reveal-delay-2">
          TO WORKFLOW
        </h1>
        <h1 className="text-mega mb-10 reveal reveal-delay-3">
          IN <span style={{ color: '#D4FF3F' }}>SECONDS</span>
        </h1>

        <p className="text-[#808080] text-lg md:text-xl max-w-xl mb-12 leading-relaxed reveal reveal-delay-4">
          Tell us your project idea. We generate a step-by-step plan,
          curate the best free AI tools, and hand you the exact prompts to use.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center reveal reveal-delay-5">
          <Link href="/generate" className="btn-lime text-sm uppercase tracking-widest">
            Generate Your Workflow
          </Link>
          <Link href="#features" className="btn-ghost text-sm uppercase tracking-widest">
            See How It Works
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="mono-label">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────── */}
      <div className="divider" />
      <div className="py-5 overflow-hidden border-y border-white/5 select-none">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {['AI Workflow', 'Dev Tools', 'Prompt Engineering', 'Phase Planning', 'Stack Advisor', 'Free Tools', 'AI Workflow', 'Dev Tools'].map((text, j) => (
                <span key={j} className="text-sm font-medium tracking-widest uppercase text-[#333] whitespace-nowrap flex items-center gap-4">
                  {text}
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF3F] inline-block" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ─────────────────────────────── */}
      <section id="features" className="px-6 md:px-16 py-32 max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="mono-label reveal">/ What We Do</span>
          <h2 className="text-display mt-4 max-w-3xl reveal reveal-delay-1">
            Everything you need to<br />
            <span className="text-outlined">ship smarter.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={f.num}
              className={`card-glass p-8 reveal reveal-delay-${i + 1}`}
            >
              <span className="mono-label block mb-6">{f.num}</span>
              <h3 className="text-heading mb-4">{f.title}</h3>
              <p className="text-[#808080] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Resources Teaser ───────────────────────── */}
      <section className="px-6 md:px-16 py-12 max-w-7xl mx-auto">
        <div className="card-glass p-10 flex flex-col md:flex-row items-center justify-between gap-8 reveal">
          <div>
            <span className="mono-label block mb-3">/ Resources Hub</span>
            <h3 className="text-heading mb-3">
              From Figma to production —<br />
              <span style={{ color: '#D4FF3F' }}>all the free tools you need.</span>
            </h3>
            <p className="text-[#808080] text-sm leading-relaxed max-w-lg">
              Figma AI → Figma-to-code → Claude for backend → deploy. Plus curated developer roadmaps from roadmap.sh.
            </p>
          </div>
          <Link
            href="/resources"
            className="btn-lime text-sm uppercase tracking-widest whitespace-nowrap flex-shrink-0"
          >
            Browse Resources →
          </Link>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="px-6 py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#D4FF3F]/8 blur-[100px] pointer-events-none" />

        <div className="relative">
          <span className="mono-label reveal">/ Get Started</span>
          <h2 className="text-mega mt-4 mb-2 reveal reveal-delay-1">
            BUILD
          </h2>
          <h2 className="text-mega text-outlined-lime mb-12 reveal reveal-delay-2">
            SMARTER
          </h2>
          <Link href="/generate" className="btn-lime text-sm uppercase tracking-widest glow-lime reveal reveal-delay-3">
            Generate Your Workflow — Free
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────── */}
      <div className="divider" />
      <footer className="px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm font-bold tracking-widest uppercase text-white">DevFlow AI</span>
        <span className="mono-label">Built by Sainandhan · v1.0</span>
        <div className="flex gap-6">
          <Link href="/generate" className="text-sm text-[#808080] hover:text-white transition-colors">Generate</Link>
          <Link href="/resources" className="text-sm text-[#808080] hover:text-white transition-colors">Resources</Link>
          <a href="https://www.linkedin.com/in/sainandhan/" target="_blank" rel="noopener noreferrer" className="text-sm text-[#808080] hover:text-white transition-colors">LinkedIn</a>
        </div>
      </footer>
    </main>
  )
}
