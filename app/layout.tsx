import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, Geist_Mono } from 'next/font/google'
import { SmoothScroll } from '@/components/providers/smooth-scroll'
import { Providers } from '@/components/providers/providers'
import './globals.css'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ThreadCounty — AI-Powered Textile Intelligence',
  description:
    'Upload fabric images and receive instant AI-driven textile analysis with enterprise-grade precision. Thread density, warp & weft counts, and quality scoring in seconds.',
  generator: 'v0.app',
  keywords: [
    'textile AI',
    'fabric analysis',
    'thread count',
    'warp weft detection',
    'textile intelligence',
    'quality inspection',
  ],
  openGraph: {
    title: 'ThreadCounty — AI-Powered Textile Intelligence',
    description:
      'Instant AI-driven textile analysis with enterprise-grade precision.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0B0B0F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <Providers>
          <SmoothScroll>{children}</SmoothScroll>
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
