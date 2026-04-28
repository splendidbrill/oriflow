'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/app/lib/supabase'

export default function AuthModal() {
  const [open, setOpen] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-auth', handler)
    return () => window.removeEventListener('open-auth', handler)
  }, [])

  const close = () => {
    setOpen(false)
    setError(null)
    setMessage(null)
    setConfirmPassword('')
  }

  const handleGoogle = async () => {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
    if (error) { setError(error.message); setLoading(false) }
  }

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    const supabase = createClient()

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError('Passwords do not match.')
        setLoading(false)
        return
      }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${location.origin}/auth/callback` },
      })
      if (error) setError(error.message)
      else setMessage('Check your inbox for a confirmation link.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else close()
    }
    setLoading(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 p-8">
        <button
          onClick={close}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="flex items-center gap-2.5 mb-7">
          <div
            className="w-7 h-7 rounded-full flex-shrink-0"
            style={{ background: 'radial-gradient(circle at 38% 32%, #FFCA80, #F06030)' }}
          />
          <span className="font-black text-lg text-gray-900 tracking-tight">Oriflow</span>
        </div>

        <h2 className="text-2xl font-black text-gray-900 mb-1">
          {isSignUp ? 'Create your account' : 'Welcome back'}
        </h2>
        <p className="text-sm text-gray-500 mb-7">
          {isSignUp
            ? 'Start your 3-minute talk, free forever.'
            : 'Sign in to continue your practice.'}
        </p>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-full py-3 px-5 font-semibold text-[15px] text-gray-800 hover:bg-gray-50 transition-colors mb-5 disabled:opacity-60 cursor-pointer"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleEmail} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-coral transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-coral transition-colors"
          />
          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-coral transition-colors"
            />
          )}

          {error && (
            <p className="text-sm text-red-500 pt-1">{error}</p>
          )}
          {message && (
            <p className="text-sm text-green-600 pt-1">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-coral text-white rounded-full py-3 font-bold text-[15px] hover:opacity-90 transition-opacity disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'Just a sec…' : isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => {
              setIsSignUp(s => !s)
              setError(null)
              setMessage(null)
              setConfirmPassword('')
            }}
            className="text-coral font-semibold hover:underline cursor-pointer"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
      <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.962L3.964 6.294C4.672 4.169 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}
