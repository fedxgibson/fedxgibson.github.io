// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'
import { Logo } from '@/components/Logo'
import { MobileNav } from '@/components/MobileNav'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Federico Martinez - Technical Partner',
    template: '%s | Federico Martinez'
  },
  description: 'Engineering systematic solutions for long-term success',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <nav className="border-b dark:border-gray-800">
              <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                  <Link href="/" aria-label="Home">
                    <Logo />
                  </Link>
                  
                  <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-8">
                      <Link 
                        href="/blog" 
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                      >
                        Blog
                      </Link>
                      <Link 
                        href="/about"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                      >
                        About
                      </Link>
                      <Link 
                        href="/contact"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                      >
                        Contact
                      </Link>
                    </div>
                    
                    <MobileNav />
                  </div>
                </div>
              </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 py-8">
              {children}
            </main>

            <footer className="border-t dark:border-gray-800 mt-20">
              <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    © {new Date().getFullYear()} Federico Martinez. All rights reserved.
                  </div>
                  <div className="flex gap-6">
                    <a 
                      href="https://github.com/fedxgibson" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      GitHub
                    </a>
                    <a 
                      href="https://linkedin.com/in/fedxgibson" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}