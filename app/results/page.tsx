'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Workflow } from '@/types'

type Tab = 'phases' | 'tools' | 'prompts' | 'refs'

export default function ResultsPage() {
    const router = useRouter()
    const [workflow, setWorkflow] = useState<Workflow | null>(null)
    const [copied, setCopied] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<Tab>('phases')

    useEffect(() => {
        const saved = localStorage.getItem('devflow_workflow')
        if (!saved) { router.push('/generate'); return }
        try {
            setWorkflow(JSON.parse(saved))
        } catch {
            router.push('/generate')
        }
    }, [router])

    const copyPrompt = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopied(id)
        setTimeout(() => setCopied(null), 2000)
    }

    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab)
        // Scroll to top of content area smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (!workflow) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-[#D4FF3F] border-t-transparent rounded-full animate-spin" />
                <span className="mono-label">Loading your workflow...</span>
            </div>
        </div>
    )

    const tabs: { id: Tab; label: string; count: number }[] = [
        { id: 'phases', label: 'Phases', count: workflow.phases?.length ?? 0 },
        { id: 'tools', label: 'Tools', count: workflow.tools?.length ?? 0 },
        { id: 'prompts', label: 'Prompts', count: workflow.prompts?.length ?? 0 },
        { id: 'refs', label: 'References', count: workflow.references?.length ?? 0 },
    ]

    return (
        <main className="min-h-screen bg-black text-white">

            {/* ── Nav ──────────────────────────────────── */}
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

            <div className="pt-28 pb-24 px-6 max-w-4xl mx-auto">

                {/* ── Hero header ──────────────────────────── */}
                <div className="mb-12 pb-10 border-b border-white/8">
                    <span className="mono-label">/ Your Workflow</span>
                    <h1 className="text-display mt-3 mb-4">{workflow.projectTitle}</h1>
                    <p className="text-[#808080] text-base leading-relaxed max-w-2xl">{workflow.summary}</p>
                </div>

                {/* ── Sticky Tab navigation ─────────────────── */}
                <div className="sticky top-[73px] z-50 -mx-6 px-6 py-3 bg-black/90 backdrop-blur-xl border-b border-white/8 mb-10">
                    <div className="flex gap-1 bg-white/5 rounded-xl p-1 border border-white/8 max-w-4xl">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`flex-1 py-2.5 px-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-1.5 ${activeTab === tab.id
                                        ? 'bg-[#D4FF3F] text-black'
                                        : 'text-[#555] hover:text-white'
                                    }`}
                            >
                                {tab.label}
                                <span className={`min-w-[18px] h-[18px] px-1 rounded-full text-[9px] flex items-center justify-center font-black ${activeTab === tab.id ? 'bg-black/20 text-black' : 'bg-white/8 text-[#555]'
                                    }`}>{tab.count}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Tab Content ─────────────────────────── */}

                {/* PHASES */}
                {activeTab === 'phases' && (
                    <div className="space-y-4">
                        {(workflow.phases ?? []).map((phase, i) => (
                            <div
                                key={`phase-${i}`}
                                className="card-glass p-6"
                                style={{ animationDelay: `${i * 60}ms` }}
                            >
                                <div className="flex items-start justify-between mb-5">
                                    <div className="flex items-center gap-4">
                                        <span className="w-8 h-8 bg-[#D4FF3F] text-black rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <h3 className="font-bold text-base">{phase.title}</h3>
                                    </div>
                                    <span className="mono-label bg-white/5 border border-white/8 px-3 py-1 rounded-full text-[10px] whitespace-nowrap ml-4 flex-shrink-0">
                                        {phase.duration}
                                    </span>
                                </div>
                                <ul className="space-y-2.5 pl-12">
                                    {(phase.tasks ?? []).map((task, j) => (
                                        <li key={j} className="text-[#808080] text-sm flex gap-3 items-start leading-relaxed">
                                            <span className="text-[#D4FF3F] mt-1 text-xs flex-shrink-0">▸</span>
                                            <span>{task}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {/* TOOLS */}
                {activeTab === 'tools' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(workflow.tools ?? []).map((tool, i) => (
                            <a
                                key={`tool-${i}`}
                                href={tool.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card-glass p-5 block group"
                            >
                                <div className="flex items-start justify-between mb-2 gap-2">
                                    <span className="font-bold text-sm group-hover:text-[#D4FF3F] transition-colors leading-snug">{tool.name}</span>
                                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest flex-shrink-0 ${tool.free
                                            ? 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400'
                                            : 'bg-orange-500/10 border border-orange-500/25 text-orange-400'
                                        }`}>
                                        {tool.free ? 'Free' : 'Paid'}
                                    </span>
                                </div>
                                <span className="mono-label block mb-2">{tool.category}</span>
                                <p className="text-[#808080] text-xs leading-relaxed mb-4">{tool.useCase}</p>
                                <div className="flex items-center gap-1 text-[#444] group-hover:text-[#D4FF3F] transition-colors text-xs font-bold uppercase tracking-widest">
                                    Visit →
                                </div>
                            </a>
                        ))}
                    </div>
                )}

                {/* PROMPTS */}
                {activeTab === 'prompts' && (
                    <div className="space-y-5">
                        {(workflow.prompts ?? []).map((prompt, i) => (
                            <div key={`prompt-${i}`} className="card-glass p-6">
                                <div className="flex items-start justify-between mb-4 gap-4">
                                    <div className="min-w-0">
                                        <p className="font-bold text-sm mb-1.5 leading-snug">{prompt.title}</p>
                                        <span className="tag-lavender text-[10px]">Use with: {prompt.tool}</span>
                                    </div>
                                    <button
                                        onClick={() => copyPrompt(prompt.template, `p${i}`)}
                                        className={`flex-shrink-0 text-[10px] px-3 py-2 rounded-lg border transition-all uppercase tracking-widest font-bold ${copied === `p${i}`
                                                ? 'bg-[#D4FF3F] border-[#D4FF3F] text-black'
                                                : 'bg-transparent border-white/15 text-[#808080] hover:border-white/35 hover:text-white'
                                            }`}
                                    >
                                        {copied === `p${i}` ? '✓ Copied' : 'Copy'}
                                    </button>
                                </div>
                                <pre className="bg-white/3 border border-white/8 rounded-xl p-4 text-xs text-[#808080] whitespace-pre-wrap leading-relaxed overflow-x-auto font-mono">
                                    {prompt.template}
                                </pre>
                            </div>
                        ))}
                    </div>
                )}

                {/* REFERENCES */}
                {activeTab === 'refs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(workflow.references ?? []).map((ref, i) => (
                            <a
                                key={`ref-${i}`}
                                href={ref.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card-glass p-5 flex items-center justify-between gap-4 group"
                            >
                                <div className="min-w-0">
                                    <p className="font-bold text-sm mb-1 group-hover:text-[#D4FF3F] transition-colors leading-snug">{ref.name}</p>
                                    <p className="text-[#808080] text-xs leading-relaxed">{ref.purpose}</p>
                                </div>
                                <span className="text-[#333] group-hover:text-[#D4FF3F] transition-colors text-xl ml-2 flex-shrink-0">→</span>
                            </a>
                        ))}
                    </div>
                )}

                {/* ── Footer feedback ──────────────────────── */}
                <div className="mt-20 pt-8 border-t border-white/8 text-center">
                    <span className="mono-label block mb-5">/ Was this workflow helpful?</span>
                    <div className="flex justify-center gap-3 mb-8">
                        <button className="btn-ghost text-xs uppercase tracking-widest py-2.5 px-6 hover:border-emerald-500/50 hover:text-emerald-400">
                            👍 Helpful
                        </button>
                        <button className="btn-ghost text-xs uppercase tracking-widest py-2.5 px-6 hover:border-red-500/50 hover:text-red-400">
                            👎 Needs Work
                        </button>
                    </div>
                    <button
                        onClick={() => router.push('/generate')}
                        className="btn-lime text-xs uppercase tracking-widest"
                    >
                        Generate Another →
                    </button>
                </div>
            </div>
        </main>
    )
}
