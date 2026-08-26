import type { Metadata, Viewport } from 'next'
import './globals.css'
import AnimationProvider from '@/components/AnimationProvider'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devflow-ai.vercel.app'

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'DevFlow AI — AI Developer Workflow Advisor, Hackathon Planner & Tech Roadmaps',
    template: '%s | DevFlow AI',
  },
  description:
    'Turn any project or hackathon idea into a complete phased engineering roadmap, curated AI developer tool stack, Obsidian-style interactive tech graph, and production-ready prompt templates in seconds.',
  keywords: [
    // Hackathons & Prototyping
    'hackathon project planner',
    'hackathon roadmap generator',
    'hackathon ideas to mvp',
    'rapid prototyping ai',
    'hackathon tech stack advisor',
    'build mvp in 48 hours',
    'hackathon starter kit',
    'ai hackathon tools',
    'developer workflow generator',
    
    // Developer Roadmaps & Skills
    'developer roadmaps',
    'frontend developer roadmap',
    'backend developer roadmap',
    'full stack developer roadmap',
    'ai engineer roadmap',
    'devops roadmap',
    'react developer roadmap',
    'structured learning paths for developers',
    'software engineering best practices',
    'how to learn full stack development',

    // AI Tools & Tech Stacks
    'ai developer tools',
    'best free ai tools for coding',
    'cursor ai prompt templates',
    'bolt.new workflow advisor',
    'v0.dev prompt generator',
    'figma to code ai tools',
    'claude ai for backend development',
    'supabase vs neon database',
    'ai code generation tools',
    'feedough prompt engineering for programmers',

    // Architecture & Advisor
    'software architecture advisor',
    'project planning tool for programmers',
    'tech stack selector',
    'interactive developer node graph',
    'devflow ai'
  ],
  authors: [
    {
      name: 'M Sainandhan',
      url: 'https://www.linkedin.com/in/sainandhan/',
    },
  ],
  creator: 'M Sainandhan',
  publisher: 'DevFlow AI',
  category: 'technology',
  classification: 'Developer Tools, AI Workflows & Software Architecture',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'DevFlow AI',
    title: 'DevFlow AI — AI Developer Workflow Advisor & Tech Stack Planner',
    description:
      'Plan your hackathon project or software idea in seconds. Generate phased roadmaps, curated free AI tools, Obsidian-style interactive tech graph, and Feedough-grade prompt templates.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevFlow AI - Developer Workflow Advisor & Hackathon Roadmap Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevFlow AI — AI Developer Workflow Advisor & Hackathon Roadmap Generator',
    description:
      'Turn your project idea into an actionable phased roadmap, curated AI toolset, and production-ready prompts.',
    images: ['/og-image.png'],
    creator: '@SaiNandhan06',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'DevFlow AI',
  headline: 'AI-Powered Developer Workflow & Tech Stack Advisor',
  description:
    'An intelligent advisor that takes your project idea, preferred tech stack, and experience level, generating a phased development roadmap, curated AI tools, and copy-pasteable prompt templates.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  url: SITE_URL,
  author: {
    '@type': 'Person',
    name: 'M Sainandhan',
    url: 'https://www.linkedin.com/in/sainandhan/',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  keywords:
    'hackathon planner, developer roadmaps, ai developer tools, tech stack advisor, cursor prompts, v0 prompts, rapid prototyping, software engineering workflow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black antialiased">
        <AnimationProvider>
          {children}
        </AnimationProvider>
      </body>
    </html>
  )
}