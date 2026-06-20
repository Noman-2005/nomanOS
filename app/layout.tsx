import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NomanOS — Shibli Noman Arnob',
  description: 'An interactive OS-style portfolio by Shibli Noman Arnob — CSE student, developer, and builder.',
  keywords: ['Noman', 'NomanOS', 'portfolio', 'developer', 'CSE', 'React', 'Next.js'],
  openGraph: {
    title: 'NomanOS',
    description: 'An interactive OS-style portfolio.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}