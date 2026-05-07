export interface WorkflowPhase {
  phase: number
  title: string
  duration: string
  tasks: string[]
}

export interface WorkflowTool {
  name: string
  category: string
  useCase: string
  free: boolean
  url: string
}

export interface WorkflowPrompt {
  title: string
  tool: string
  template: string
}

export interface WorkflowReference {
  name: string
  url: string
  purpose: string
}

export interface Workflow {
  projectTitle: string
  summary: string
  phases: WorkflowPhase[]
  tools: WorkflowTool[]
  prompts: WorkflowPrompt[]
  references: WorkflowReference[]
}

export interface GenerateRequest {
  idea: string
  stack: string[]
  level: 'beginner' | 'intermediate' | 'expert'
}