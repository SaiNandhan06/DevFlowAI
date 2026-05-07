'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Workflow } from '@/types'

export default function ResultsPage() {
  const router = useRouter()
  const [workflow, setWorkflow] = useState<Workflow | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'phases' | 'tools' | 'prompts' | 'refs'>('phases')

  useEffect(() => {
    const saved = localStorage.getItem('devflow_workflow')
    if (!saved) { router.push('/generate'); return }
    setWorkflow(JSON.parse(saved))
  }, [router])

  const copyPrompt = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!workflow) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#D4FF3F] border-t-transparent rounded-full animate-spin" />
        <span className="mono-label">Loading your workflow...</span>
      </div>
    </div>
  )

  const tabs = [
    { id: 'phases' as const, label: 'Phases', count: workflow.phases.length },
    { id: 'tools' as const, label: 'Tools', count: workflow.tools.length },
    { id: 'prompts' as const, label: 'Prompts', count: workflow.prompts.length },
    { id: 'refs' as const, label: 'References', count: workflow.references.length },
  ]

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Nav */}
      <nav className="nav-fixed">
        <Link href="/" className="text-sm font-bold tracking-widest uppercase text-white">DevFlow AI</Link>
        <span className="tag-lime hidden md:inline-flex">Workflow Ready</span>
        <button
          onClick={() => router.push('/generate')}
          className="btn-ghost text-xs uppercase tracking-widest py-2 px-4"
        >
          ← Generate Another
        </button>
      </nav>

      <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto">

        {/* Hero header */}
        <div className="mb-16 border-b border-white/8 pb-12">
          <span className="mono-label">/ Your Workflow</span>
          <h1 className="text-display mt-3 mb-4">{workflow.projectTitle}</h1>
          <p className="text-[#808080] text-base leading-relaxed max-w-2xl">{workflow.summary}</p>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-1 mb-12 bg-white/5 rounded-xl p-1 border border-white/8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-[#D4FF3F] text-black'
                  : 'text-[#808080] hover:text-white'
              }`}
            >
              {tab.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-black/20 text-black' : 'bg-white/10 text-[#808080]'
              }`}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* ── Phases Tab ──────────────────────── */}
        {activeTab === 'phases' && (
          <div className="space-y-4">
            {workflow.phases.map((phase, i) => (
              <div key={phase.phase} className="card-glass p-6 reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 bg-[#D4FF3F] text-black rounded-full flex items-center justify-center text-xs font-black">
                      {String(phase.phase).padStart(2, '0')}
                    </span>
                    <span className="text-heading text-base font-bold">{phase.title}</span>
                  </div>
                  <span className="mono-label bg-white/5 border border-white/8 px-3 py-1 rounded-full text-xs whitespace-nowrap">
                    {phase.duration}
                  </span>
                </div>
                <ul className="space-y-2 pl-12">
                  {phase.tasks.map((task, j) => (
                    <li key={j} className="text-[#808080] text-sm flex gap-3 items-start">
                      <span className="text-[#D4FF3F] mt-1 text-xs">▸</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* ── Tools Tab ──────────────────────── */}
        {activeTab === 'tools' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workflow.tools.map((tool, i) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-glass p-5 block group reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm group-hover:text-[#D4FF3F] transition-colors">{tool.name}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-widest ${
                    tool.free
                      ? 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400'
                      : 'bg-orange-500/10 border border-orange-500/25 text-orange-400'
                  }`}>
                    {tool.free ? 'Free' : 'Paid'}
                  </span>
                </div>
                <span className="mono-label block mb-2">{tool.category}</span>
                <p className="text-[#808080] text-xs leading-relaxed">{tool.useCase}</p>
                <div className="mt-4 flex items-center gap-1 text-[#444] group-hover:text-[#D4FF3F] transition-colors text-xs font-semibold uppercase tracking-widest">
                  Visit →
                </div>
              </a>
            ))}
          </div>
        )}

        {/* ── Prompts Tab ─────────────────────── */}
        {activeTab === 'prompts' && (
          <div className="space-y-5">
            {workflow.prompts.map((prompt, i) => (
              <div key={i} className="card-glass p-6 reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold text-sm mb-1">{prompt.title}</p>
                    <span className="tag-lavender text-[10px]">Use with: {prompt.tool}</span>
                  </div>
                  <button
                    onClick={() => copyPrompt(prompt.template, `p${i}`)}
                    className={`text-xs px-3 py-2 rounded-lg border transition-all uppercase tracking-widest font-semibold ${
                      copied === `p${i}`
                        ? 'bg-[#D4FF3F] border-[#D4FF3F] text-black'
                        : 'bg-transparent border-white/15 text-[#808080] hover:border-white/35 hover:text-white'
                    }`}
                  >
                    {copied === `p${i}` ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="bg-white/3 border border-white/8 rounded-xl p-4 text-xs text-[#808080] whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {prompt.template}
                </pre>
              </div>
            ))}
          </div>
        )}

        {/* ── References Tab ──────────────────── */}
        {activeTab === 'refs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workflow.references.map((ref, i) => (
              <a
                key={ref.name}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-glass p-5 flex items-center justify-between group reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div>
                  <p className="font-bold text-sm mb-1 group-hover:text-[#D4FF3F] transition-colors">{ref.name}</p>
                  <p className="text-[#808080] text-xs leading-relaxed">{ref.purpose}</p>
                </div>
                <span className="text-[#333] group-hover:text-[#D4FF3F] transition-colors text-lg ml-4 flex-shrink-0">→</span>
              </a>
            ))}
          </div>
        )}

        {/* Footer feedback */}
        <div className="mt-20 pt-8 border-t border-white/8 text-center">
          <span className="mono-label block mb-5">/ Was this workflow helpful?</span>
          <div className="flex justify-center gap-3">
            <button className="btn-ghost text-xs uppercase tracking-widest py-2.5 px-6 hover:border-emerald-500/50 hover:text-emerald-400">
              👍 Helpful
            </button>
            <button className="btn-ghost text-xs uppercase tracking-widest py-2.5 px-6 hover:border-red-500/50 hover:text-red-400">
              👎 Needs Work
            </button>
          </div>
          <div className="mt-8">
            <button
              onClick={() => router.push('/generate')}
              className="btn-lime text-xs uppercase tracking-widest"
            >
              Generate Another →
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
