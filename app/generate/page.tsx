'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
    <main className="min-h-screen bg-slate-950 text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Generate Your Workflow</h1>
        <p className="text-slate-400 mb-10">Tell us about your project and we'll build your plan.</p>

        {/* Idea input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            What are you building? *
          </label>
          <textarea
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm resize-none focus:outline-none focus:border-indigo-500 transition-colors"
            rows={4}
            placeholder="e.g. A platform that helps developers choose the right AI tools for their project..."
            value={idea}
            onChange={e => setIdea(e.target.value)}
            maxLength={500}
          />
          <p className="text-right text-xs text-slate-600 mt-1">{idea.length}/500</p>
        </div>

        {/* Stack selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Stack areas you need *
          </label>
          <div className="flex flex-wrap gap-2">
            {STACK_OPTIONS.map(s => (
              <button
                key={s}
                onClick={() => toggleStack(s)}
                className={`px-4 py-2 rounded-full text-sm border transition-all ${
                  stack.includes(s)
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Experience level */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Your experience level
          </label>
          <div className="flex gap-3">
            {LEVELS.map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border capitalize transition-all ${
                  level === l
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors text-base"
        >
          {loading ? '⏳ Generating your workflow...' : '✨ Generate Workflow'}
        </button>
      </div>
    </main>
  )
}