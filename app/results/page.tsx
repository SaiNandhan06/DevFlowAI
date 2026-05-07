'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Workflow } from '@/types'

export default function ResultsPage() {
  const router = useRouter()
  const [workflow, setWorkflow] = useState<Workflow | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
      Loading...
    </div>
  )

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 px-3 py-1 rounded-full">
              Your Workflow is Ready
            </span>
            <button onClick={() => router.push('/generate')}
              className="text-sm text-slate-400 hover:text-white transition-colors">
              ← Generate Another
            </button>
          </div>
          <h1 className="text-3xl font-bold mb-2">{workflow.projectTitle}</h1>
          <p className="text-slate-400">{workflow.summary}</p>
        </div>

        {/* Phases */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-indigo-400">📋 Development Phases</h2>
          <div className="space-y-4">
            {workflow.phases.map((phase) => (
              <div key={phase.phase} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {phase.phase}
                    </span>
                    <span className="font-semibold">{phase.title}</span>
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full">
                    {phase.duration}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {phase.tasks.map((task, i) => (
                    <li key={i} className="text-slate-400 text-sm flex gap-2">
                      <span className="text-indigo-500 mt-0.5">•</span> {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-indigo-400">🛠️ Recommended Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {workflow.tools.map((tool) => (
              <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
                className="bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-xl p-4 transition-colors block">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">{tool.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${tool.free ? 'bg-green-900/50 text-green-400' : 'bg-orange-900/50 text-orange-400'}`}>
                    {tool.free ? 'Free' : 'Paid'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-1">{tool.category}</p>
                <p className="text-slate-400 text-xs">{tool.useCase}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Prompts */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-indigo-400">📝 Prompt Templates</h2>
          <div className="space-y-4">
            {workflow.prompts.map((prompt, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-sm">{prompt.title}</p>
                    <p className="text-xs text-slate-500">Use with: {prompt.tool}</p>
                  </div>
                  <button
                    onClick={() => copyPrompt(prompt.template, `p${i}`)}
                    className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {copied === `p${i}` ? '✅ Copied!' : '📋 '}
                  </button>
                </div>
                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-400 whitespace-pre-wrap leading-relaxed">
                  {prompt.template}
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* References */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-indigo-400">🔗 Reference Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {workflow.references.map((ref) => (
              <a key={ref.name} href={ref.url} target="_blank" rel="noopener noreferrer"
                className="bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-xl p-4 transition-colors flex items-center justify-between group">
                <div>
                  <p className="font-medium text-sm">{ref.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{ref.purpose}</p>
                </div>
                <span className="text-slate-600 group-hover:text-slate-300 transition-colors">→</span>
              </a>
            ))}
          </div>
        </section>

        {/* Feedback */}
        <div className="text-center py-8 border-t border-slate-800">
          <p className="text-slate-500 text-sm mb-4">Was this workflow helpful?</p>
          <div className="flex justify-center gap-3">
            <button className="bg-slate-900 hover:bg-green-900/30 border border-slate-700 hover:border-green-700 text-slate-400 hover:text-green-400 px-6 py-2 rounded-full text-sm transition-all">
              👍 Yes, helpful
            </button>
            <button className="bg-slate-900 hover:bg-red-900/30 border border-slate-700 hover:border-red-700 text-slate-400 hover:text-red-400 px-6 py-2 rounded-full text-sm transition-all">
              👎 Needs improvement
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
