'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/app/lib/supabase'
import type { User } from '@supabase/supabase-js'

const openAuth = () => window.dispatchEvent(new CustomEvent('open-auth'))

export default function Nav() {
  const [user, setUser] = useState<User | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setDropdownOpen(false)
  }

  const initial = user
    ? (user.user_metadata?.full_name ?? user.email ?? '?')[0].toUpperCase()
    : null

  const displayName = user?.user_metadata?.full_name ?? user?.email ?? ''

  return (
    <nav className="flex items-center justify-between px-8 lg:px-16 py-5 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-full flex-shrink-0"
          style={{
            background:
              "radial-gradient(circle at 38% 32%, #FFCA80, #F06030)",
          }}
        />
        <span className="font-black text-xl text-gray-900 tracking-tight">
          Oriflow
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-9 text-[15px] font-medium text-gray-800">
        <a href="#" className="hover:text-gray-600 transition-colors">
          What&apos;s inside
        </a>
        <a href="#" className="hover:text-gray-600 transition-colors">
          A day with it
        </a>
        <a href="#" className="hover:text-gray-600 transition-colors">
          Why we built it
        </a>
        <a href="#" className="hover:text-gray-600 transition-colors">
          FAQ
        </a>
      </div>

      <div className="flex items-center gap-5">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(o => !o)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 cursor-pointer focus:outline-none"
              style={{ background: 'radial-gradient(circle at 38% 32%, #FFCA80, #F06030)' }}
            >
              {initial}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-1 z-50">
                <div className="px-4 py-2.5 border-b border-gray-100">
                  <p className="text-xs text-gray-400 font-medium truncate">{displayName}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={openAuth}
            className="text-gray-900 font-semibold text-[15px] hidden lg:block hover:text-gray-600 transition-colors cursor-pointer"
          >
            Sign in
          </button>
        )}
        <button
          onClick={openAuth}
          className="bg-gray-900 text-white px-5 py-2.5 rounded-full font-semibold text-[15px] hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Try it free
        </button>
      </div>
    </nav>
  )
}
