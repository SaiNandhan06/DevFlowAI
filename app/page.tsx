import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
        <span className="text-xl font-bold text-indigo-400">DevFlow AI</span>
        <Link
          href="/generate"
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-5 py-2 rounded-full transition-colors"
        >
          Try Free →
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <div className="inline-block bg-indigo-900/40 border border-indigo-700/50 text-indigo-300 text-xs px-4 py-1.5 rounded-full mb-6">
          AI-Powered Developer Workflow Advisor
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-4xl">
          From idea to{' '}
          <span className="text-indigo-400">professional workflow</span>{' '}
          in seconds
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10">
          Tell us your project idea. We generate a step-by-step workflow,
          recommend the best free AI tools, and give you the exact prompts
          to use — tailored to your experience level.
        </p>
        <Link
          href="/generate"
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-lg px-10 py-4 rounded-full font-semibold transition-colors shadow-lg shadow-indigo-900/50"
        >
          Generate Your Workflow — Free
        </Link>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-24 max-w-5xl mx-auto">
        {[
          { icon: '🧠', title: 'AI-Generated Plan', desc: 'Get a phased project plan tailored to your idea and experience level instantly.' },
          { icon: '🛠️', title: 'Right Tools Only', desc: 'We recommend only the best free AI tools for each part of your stack.' },
          { icon: '📋', title: 'Ready-to-Use Prompts', desc: ' professional prompt templates for every tool — no guessing required.' },
        ].map((f) => (
          <div key={f.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-3xl mb-4">{f.icon}</div>
            <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center pb-10 text-slate-600 text-sm">
        Built by Sainandhan · DevFlow AI v1.0
      </footer>
    </main>
  )
}
