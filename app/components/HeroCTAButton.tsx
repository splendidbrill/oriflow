'use client'

export default function HeroCTAButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('open-auth'))}
      className="bg-coral text-white px-6 py-3.5 rounded-full font-bold text-base hover:opacity-90 transition-opacity whitespace-nowrap shadow-sm cursor-pointer"
    >
      Start a 3-minute talk →
    </button>
  )
}
