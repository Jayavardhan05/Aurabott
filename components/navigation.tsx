"use client"

import { useState } from "react"
import LoginModal from './LoginModal' // Importing the updated LoginModal component
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Academics", href: "/academics" },
    { name: "Admissions", href: "/admissions" },
    { name: "Research", href: "/research" },
    { name: "Placements", href: "/placements" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="bg-sky-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navItems.map((item: { name: string; href: string }) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition-colors"
                onClick={() => setIsOpen(true)} // This will open the login modal
              >
                Login
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-sky-700 focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-sky-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </nav>
  )
}
