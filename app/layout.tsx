import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DevFlow AI — AI Developer Workflow Advisor',
  description: 'Generate a professional development workflow for any project idea using AI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 antialiased">
        {children}
      </body>
    </html>
  )
}