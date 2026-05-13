import { NextRequest, NextResponse } from 'next/server'
import { gemini } from '@/lib/ai'
import { getRelevantRoadmaps } from '@/data/roadmaps'

export async function POST(req: NextRequest) {
  try {
    const { idea, stack, level } = await req.json()

    if (!idea) {
      return NextResponse.json({ error: 'Project idea is required' }, { status: 400 })
    }

    const roadmapQuery = `${stack.join(' ')} ${idea}`
    const relevantRoadmaps = getRelevantRoadmaps(roadmapQuery, 3)
    const roadmapsContext = relevantRoadmaps.length > 0 
      ? `\nHere are some relevant learning roadmaps from roadmap.sh that might help the developer. Feel free to include them in the 'references' section:\n${JSON.stringify(relevantRoadmaps, null, 2)}\n` 
      : ''

    const prompt = `You are a senior full stack developer and technical advisor.

A ${level} developer wants to build: "${idea}"
Preferred stack areas: ${stack.join(', ')}
${roadmapsContext}

IMPORTANT: For the "prompts" section, act as an expert "Feedough AI Prompt Generator". Generate 3 to 5 highly detailed, advanced, copy-pasteable prompt templates that the user can feed into tools like ChatGPT, Cursor, Bolt, or v0 to accelerate their development. The prompts should follow advanced prompt engineering techniques (Persona, Context, Task, Format) and include placeholders (like [Insert specific detail]) where necessary.

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
      "title": "prompt title (e.g. Architecture Setup Prompt)",
      "tool": "Target Tool (e.g. Cursor / ChatGPT / v0)",
      "template": "Act as an expert... [Highly detailed prompt template]"
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