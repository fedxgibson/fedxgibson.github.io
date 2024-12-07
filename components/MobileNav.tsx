// components/MobileNav.tsx
'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900">
          <div className="flex flex-col h-screen">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col items-center space-y-8 pt-16">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-xl ${
                    pathname === item.href
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}