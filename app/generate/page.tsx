'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const STACK_OPTIONS = ['Frontend', 'Backend', 'AI Integration', 'Deployment', '3D Design', 'Database']
const LEVELS = ['beginner', 'intermediate', 'expert'] as const

export default function GeneratePage() {
  const router = useRouter()
  const [idea, setIdea] = useState('')
  const [stack, setStack] = useState<string[]>([])
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'expert'>('intermediate')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleStack = (s: string) => {
    setStack(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const handleSubmit = async () => {
    if (!idea.trim()) { setError('Please describe your project idea.'); return }
    if (stack.length === 0) { setError('Please select at least one stack area.'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, stack, level }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      localStorage.setItem('devflow_workflow', JSON.stringify(data.workflow))
      router.push('/results')
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Nav */}
      <nav className="nav-fixed">
        <Link href="/" className="text-sm font-bold tracking-widest uppercase text-white">DevFlow AI</Link>
        <span className="mono-label hidden md:block">/ Generate Workflow</span>
        <Link href="/" className="btn-ghost text-xs uppercase tracking-widest py-2 px-4">← Home</Link>
      </nav>

      {/* Form */}
      <div className="min-h-screen dot-grid flex items-center justify-center px-6 pt-28 pb-16">
        <div className="w-full max-w-xl">

          {/* Header */}
          <div className="mb-12">
            <span className="mono-label">/ Your Idea</span>
            <h1 className="text-display mt-3 mb-4">
              Build your<br />
              <span className="text-outlined">workflow.</span>
            </h1>
            <p className="text-[#808080] text-sm leading-relaxed">
              Describe your project and we'll generate a professional plan, toolset, and prompts.
            </p>
          </div>

          {/* Idea */}
          <div className="mb-8">
            <label className="mono-label block mb-3">01 / What are you building?</label>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-[#444] text-sm resize-none focus:outline-none focus:border-[#D4FF3F]/50 transition-colors leading-relaxed"
              rows={4}
              placeholder="e.g. A platform that helps developers choose the right AI tools for their project..."
              value={idea}
              onChange={e => setIdea(e.target.value)}
              maxLength={500}
            />
            <p className="text-right mono-label mt-1">{idea.length}/500</p>
          </div>

          {/* Stack */}
          <div className="mb-8">
            <label className="mono-label block mb-3">02 / Stack areas you need</label>
            <div className="flex flex-wrap gap-2">
              {STACK_OPTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => toggleStack(s)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest border transition-all duration-200 ${
                    stack.includes(s)
                      ? 'bg-[#D4FF3F] border-[#D4FF3F] text-black'
                      : 'bg-transparent border-white/15 text-[#808080] hover:border-white/35 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Level */}
          <div className="mb-10">
            <label className="mono-label block mb-3">03 / Your experience level</label>
            <div className="grid grid-cols-3 gap-3">
              {LEVELS.map(l => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`py-3 rounded-xl text-xs font-semibold uppercase tracking-widest border transition-all duration-200 ${
                    level === l
                      ? 'bg-[#D4FF3F] border-[#D4FF3F] text-black'
                      : 'bg-transparent border-white/15 text-[#808080] hover:border-white/35 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs uppercase tracking-widest px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full btn-lime justify-center py-4 text-sm uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed"
            style={loading ? { background: '#D4FF3F' } : {}}
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Generating your workflow...
              </span>
            ) : (
              'Generate Workflow →'
            )}
          </button>

        </div>
      </div>
    </main>
  )
}