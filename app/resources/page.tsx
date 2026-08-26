import Link from 'next/link'

const TOOL_CATEGORIES = [
  {
    id: 'uiux',
    label: 'UI / UX Design',
    icon: '🎨',
    desc: 'Design your interface with AI-assisted tools before writing a single line of code.',
    tools: [
      {
        name: 'Figma AI',
        tagline: 'AI-assisted design in the browser',
        desc: 'Use Figma\'s built-in AI to generate designs, auto-layout, and create prototypes. Free plan available.',
        url: 'https://figma.com',
        free: true,
        badge: 'Start Here',
      },
      {
        name: 'Galileo AI',
        tagline: 'Text-to-UI generation',
        desc: 'Describe your UI in plain English and get complete, editable Figma designs instantly.',
        url: 'https://usegalileo.ai',
        free: false,
        badge: 'Paid',
      },
      {
        name: 'Uizard',
        tagline: 'Sketch to prototype in seconds',
        desc: 'Convert hand-drawn wireframes or screenshots into interactive prototypes with AI.',
        url: 'https://uizard.io',
        free: true,
        badge: 'Free Tier',
      },
      {
        name: 'Framer AI',
        tagline: 'AI-generated landing pages',
        desc: 'Type a prompt and get a fully designed, published website. Great for fast UI mockups.',
        url: 'https://framer.com',
        free: true,
        badge: 'Free Tier',
      },
    ],
  },
  {
    id: 'frontend',
    label: 'Figma → Frontend Code',
    icon: '⚡',
    desc: 'Convert your Figma designs directly into production-ready React, HTML, or Tailwind CSS code.',
    tools: [
      {
        name: 'Builder.io Visual Copilot',
        tagline: 'Figma to React/Vue/HTML instantly',
        desc: 'Install the Figma plugin and convert any frame to clean, editable React code in one click.',
        url: 'https://www.builder.io/blog/figma-to-code-visual-copilot',
        free: true,
        badge: 'Free Plugin',
      },
      {
        name: 'Anima',
        tagline: 'Figma to React / HTML / Vue',
        desc: 'Export Figma components to production-ready React with real component structure and props.',
        url: 'https://www.animaapp.com',
        free: true,
        badge: 'Free Tier',
      },
      {
        name: 'Locofy.ai',
        tagline: 'Figma to Next.js / React Native',
        desc: 'One-click Figma-to-code with full responsiveness. Supports Tailwind, CSS Modules, and more.',
        url: 'https://locofy.ai',
        free: true,
        badge: 'Free Tier',
      },
      {
        name: 'DhiWise',
        tagline: 'Figma to Flutter / React / Node',
        desc: 'Full-stack code generation from Figma. Generates frontend and backend boilerplate together.',
        url: 'https://dhiwise.com',
        free: true,
        badge: 'Free',
      },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & AI Coding',
    icon: '🤖',
    desc: 'Use AI assistants to write APIs, database schemas, and backend logic for free.',
    tools: [
      {
        name: 'Claude (Anthropic)',
        tagline: 'Best for backend logic & architecture',
        desc: 'Free on claude.ai — write REST APIs, database schemas, and complex backend logic with detailed explanations.',
        url: 'https://claude.ai',
        free: true,
        badge: 'Free',
      },
      {
        name: 'GitHub Copilot',
        tagline: 'In-editor AI code completion',
        desc: 'Real-time code suggestions in VS Code. Free for students and open source contributors.',
        url: 'https://github.com/features/copilot',
        free: true,
        badge: 'Free for Students',
      },
      {
        name: 'Cursor',
        tagline: 'AI-first code editor',
        desc: 'VS Code fork with deep AI integration. Ask it to refactor files, write tests, or explain code. Free tier available.',
        url: 'https://cursor.sh',
        free: true,
        badge: 'Free Tier',
      },
      {
        name: 'Codeium',
        tagline: 'Free AI code completion',
        desc: 'Completely free alternative to Copilot. Works in VS Code, JetBrains, and 40+ other editors.',
        url: 'https://codeium.com',
        free: true,
        badge: 'Fully Free',
      },
    ],
  },
  {
    id: 'database',
    label: 'Database & Backend Infra',
    icon: '🗄️',
    desc: 'Free backend infrastructure and database tools to ship faster.',
    tools: [
      {
        name: 'Supabase',
        tagline: 'Open-source Firebase alternative',
        desc: 'Free Postgres database with auth, storage, and real-time subscriptions built-in. 2 free projects.',
        url: 'https://supabase.com',
        free: true,
        badge: 'Free Tier',
      },
      {
        name: 'Neon',
        tagline: 'Serverless Postgres',
        desc: 'Branching database with generous free tier. Perfect for Next.js apps with Prisma.',
        url: 'https://neon.tech',
        free: true,
        badge: 'Free Tier',
      },
      {
        name: 'PlanetScale',
        tagline: 'MySQL-compatible serverless DB',
        desc: 'Vitess-powered MySQL with schema branching. Great for apps that need horizontal scaling.',
        url: 'https://planetscale.com',
        free: true,
        badge: 'Free Tier',
      },
      {
        name: 'Railway',
        tagline: 'Deploy backends in seconds',
        desc: 'One-click deploy for Node.js, Python, or any backend. Free $5 credit monthly, no credit card needed.',
        url: 'https://railway.app',
        free: true,
        badge: 'Free Credits',
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI & ML Integration',
    icon: '🧠',
    desc: 'Add AI capabilities to your app for free.',
    tools: [
      {
        name: 'Google AI Studio',
        tagline: 'Free Gemini API access',
        desc: 'Get a free Gemini API key for Gemini 2.5 Flash. 500 req/day. Perfect for adding AI to your app.',
        url: 'https://aistudio.google.com',
        free: true,
        badge: 'Free',
      },
      {
        name: 'Hugging Face',
        tagline: 'Thousands of free AI models',
        desc: 'Host and run ML models for free. Use the Inference API to add NLP, image, or audio AI to your app.',
        url: 'https://huggingface.co',
        free: true,
        badge: 'Free Tier',
      },
      {
        name: 'Replicate',
        tagline: 'Run open-source AI models via API',
        desc: 'Pay-per-use pricing for image generation (SDXL), video, and more. Free credits on signup.',
        url: 'https://replicate.com',
        free: true,
        badge: 'Free Credits',
      },
      {
        name: 'LangChain',
        tagline: 'Framework for AI-powered apps',
        desc: 'Build AI agents, RAG pipelines, and chat apps. Works with any LLM. Completely free and open-source.',
        url: 'https://langchain.com',
        free: true,
        badge: 'Open Source',
      },
    ],
  },
]

const ROADMAPS = [
  { role: 'Frontend Developer', path: 'frontend', emoji: '🖥️', desc: 'HTML → CSS → JS → React → Next.js and beyond.' },
  { role: 'Backend Developer', path: 'backend', emoji: '⚙️', desc: 'APIs, databases, authentication, scaling, and deployment.' },
  { role: 'Full Stack Developer', path: 'full-stack', emoji: '🚀', desc: 'The complete path from zero to full-stack engineer.' },
  { role: 'DevOps Engineer', path: 'devops', emoji: '🔧', desc: 'CI/CD, Docker, Kubernetes, cloud, and infrastructure.' },
  { role: 'AI Engineer', path: 'ai-data-scientist', emoji: '🤖', desc: 'ML, LLMs, RAG, fine-tuning, and AI product development.' },
  { role: 'React Developer', path: 'react', emoji: '⚛️', desc: 'Deep dive into the React ecosystem and best practices.' },
]

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Nav */}
      <nav className="nav-fixed">
        <Link href="/" className="text-sm font-bold tracking-widest uppercase text-white">DevFlow AI</Link>
        <span className="tag-lavender hidden md:inline-flex">Resources Hub</span>
        <Link href="/generate" className="btn-lime text-xs uppercase tracking-widest py-2.5 px-5">
          Generate Workflow →
        </Link>
      </nav>

      <div className="pt-28 pb-24 px-6 max-w-6xl mx-auto">

        {/* Hero */}
        <div className="mb-20 pb-12 border-b border-white/8">
          <span className="mono-label reveal">/ Curated Tools & Roadmaps</span>
          <h1 className="text-display mt-4 mb-5 reveal reveal-delay-1">
            Build smarter<br />
            <span className="text-outlined">with the right tools.</span>
          </h1>
          <p className="text-[#808080] text-base leading-relaxed max-w-2xl reveal reveal-delay-2">
            Every tool you need — from designing in Figma to converting it to React code, adding a backend with Claude, and deploying in seconds. Curated, categorized, and mostly free.
          </p>
        </div>

        {/* Tool Categories */}
        {TOOL_CATEGORIES.map((cat, ci) => (
          <section key={cat.id} className="mb-20">
            <div className="mb-8 reveal">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{cat.icon}</span>
                <span className="mono-label">{String(ci + 1).padStart(2, '0')} / {cat.label}</span>
              </div>
              <p className="text-[#808080] text-sm max-w-xl">{cat.desc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.tools.map((tool, ti) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`card-glass p-6 block group reveal reveal-delay-${Math.min(ti + 1, 5)}`}
                >
                  <div className="flex items-start justify-between mb-3 gap-3">
                    <div className="min-w-0">
                      <h3 className="font-bold text-base group-hover:text-[#D4FF3F] transition-colors leading-snug mb-1">
                        {tool.name}
                      </h3>
                      <span className="text-[#808080] text-xs">{tool.tagline}</span>
                    </div>
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest flex-shrink-0 whitespace-nowrap ${
                      tool.free
                        ? 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400'
                        : 'bg-orange-500/10 border border-orange-500/25 text-orange-400'
                    }`}>
                      {tool.badge}
                    </span>
                  </div>
                  <p className="text-[#808080] text-xs leading-relaxed mb-4">{tool.desc}</p>
                  <div className="flex items-center gap-1 text-[#444] group-hover:text-[#D4FF3F] transition-colors text-xs font-bold uppercase tracking-widest">
                    Visit →
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}

        {/* Roadmaps Section */}
        <section className="mb-16">
          <div className="divider mb-16" />
          <div className="mb-10 reveal">
            <span className="mono-label">06 / Developer Roadmaps</span>
            <h2 className="text-heading mt-3 mb-3">
              Don&apos;t know what to learn next?
            </h2>
            <p className="text-[#808080] text-sm max-w-xl leading-relaxed">
              These are interactive, structured learning paths to help you navigate your developer journey and build the right skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROADMAPS.map((rm, i) => (
              <Link
                key={rm.role}
                href={`/roadmaps/${rm.path}`}
                className={`card-glass p-6 flex items-start gap-4 group reveal reveal-delay-${Math.min(i + 1, 5)}`}
              >
                <span className="text-2xl flex-shrink-0">{rm.emoji}</span>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm group-hover:text-[#D4FF3F] transition-colors mb-1.5 leading-snug">
                    {rm.role}
                  </h3>
                  <p className="text-[#808080] text-xs leading-relaxed">{rm.desc}</p>
                  <div className="mt-3 flex items-center gap-1 text-[#444] group-hover:text-[#D4FF3F] transition-colors text-xs font-bold uppercase tracking-widest">
                    View Roadmap →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* roadmaps full link */}
          <div className="mt-8 text-center reveal">
            <Link
              href="/roadmaps"
              className="btn-ghost text-xs uppercase tracking-widest py-3 px-8"
            >
              Browse All Roadmaps →
            </Link>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center pt-12 border-t border-white/8 reveal">
          <span className="mono-label block mb-4">/ Ready to build?</span>
          <h2 className="text-heading mb-6">Turn your idea into a plan.</h2>
          <Link href="/generate" className="btn-lime text-sm uppercase tracking-widest">
            Generate Your Workflow →
          </Link>
        </div>
      </div>
    </main>
  )
}
