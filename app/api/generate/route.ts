import { NextRequest, NextResponse } from 'next/server'
import { gemini } from '@/lib/ai'

export async function POST(req: NextRequest) {
  try {
    const { idea, stack, level } = await req.json()

    if (!idea) {
      return NextResponse.json({ error: 'Project idea is required' }, { status: 400 })
    }

    const prompt = `You are a senior full stack developer and technical advisor.

A ${level} developer wants to build: "${idea}"
Preferred stack areas: ${stack.join(', ')}

Respond ONLY in this exact JSON format, no extra text:

{
  "projectTitle": "short name",
  "summary": "one sentence description",
  "phases": [
    {
      "phase": 1,
      "title": "phase title",
      "duration": "X days",
      "tasks": ["task 1", "task 2", "task 3"]
    }
  ],
  "tools": [
    {
      "name": "tool name",
      "category": "Frontend/Backend/AI/Deployment/Design",
      "useCase": "what to use it for",
      "free": true,
      "url": "https://..."
    }
  ],
  "prompts": [
    {
      "title": "prompt title",
      "tool": "tool name",
      "template": "the full prompt template"
    }
  ],
  "references": [
    {
      "name": "site name",
      "url": "https://...",
      "purpose": "what it is for"
    }
  ]
}`

    const result = await gemini.generateContent(prompt)
    const text = result.response.text()
    const clean = text.replace(/```json|```/g, '').trim()
    const workflow = JSON.parse(clean)

    return NextResponse.json({ workflow })
  } catch (error: any) {
    console.error('Generate error:', error)
    return NextResponse.json({ error: 'Failed to generate workflow', details: error?.message || error }, { status: 500 })
  }
}