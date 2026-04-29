'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NODES = [
  { id: 'focus', label: 'focus', title: 'Focus', desc: 'Stay with what you choose.', task: 'Set aside 10 quiet minutes for a task.', color: 'bg-rose-200', x: '10%', y: '15%' },
  { id: 'work', label: 'work', title: 'Work', desc: 'Decide what matters before you begin.', task: 'Pick one task to do, one to delay, one to drop.', color: 'bg-purple-200', x: '60%', y: '5%' },
  { id: 'health', label: 'health', title: 'Health', desc: 'Energy comes from small resets.', task: 'Step away for 5 minutes and reset.', color: 'bg-orange-200', x: '80%', y: '40%' },
  { id: 'noise', label: 'clear the noise', title: 'Clear the noise', desc: "What's in your head needs a place to go.", task: 'Write everything down without organising it.', color: 'bg-blue-200', x: '70%', y: '80%' },
  { id: 'edge', label: 'push your edge', title: 'Push your edge', desc: 'Step just beyond what feels comfortable.', task: "Do one thing you've been avoiding.", color: 'bg-red-200', x: '30%', y: '70%' },
]

const CYCLE_MS = 3000

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // Auto-cycle pauses while the user is hovering a node
  useEffect(() => {
    if (hoveredNode) return
    const id = setInterval(() => {
      setActiveIndex(i => (i + 1) % NODES.length)
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [hoveredNode])

  const displayedId = hoveredNode ?? NODES[activeIndex].id

  return (
    <section className="flex flex-col lg:flex-row gap-8 lg:gap-0 px-8 lg:px-16 pt-10 pb-20 max-w-[1400px] mx-auto min-h-[calc(100vh-64px)] items-center">
      {/* Left column */}
      <div className="flex-1 lg:max-w-[520px]">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-sm border border-white/60">
          <span className="w-2 h-2 rounded-full bg-coral flex-shrink-0" />
          <span className="text-sm font-semibold text-gray-800">quietly empowering</span>
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(52px,6.5vw,82px)] font-black leading-[1.0] tracking-tight text-gray-900 mb-6">
          Shape your life,
          <br />
          <span className="bg-gradient-to-r from-[#E05A3A] to-[#FFB89A] bg-clip-text text-transparent">
            your way.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-[17px] leading-[1.7] text-gray-700 mb-9 max-w-[440px]">
          Choose what matters and take it from there.
        </p>

        {/* CTA */}
        <div className="mb-6">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-auth'))}
            className="bg-coral text-white px-7 py-3.5 rounded-full font-bold text-base hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
          >
            Let&apos;s begin now →
          </button>
        </div>

        {/* Fine print */}
        <p className="text-sm text-gray-500 flex items-center gap-2.5">
          <span className="w-5 h-px bg-gray-400 flex-shrink-0" />
          Free to start · No setup · No streaks
        </p>
      </div>

      {/* Right column — Expanding Spatial Canvas */}
      <div className="flex-1 relative min-h-[500px] self-stretch hidden lg:block">
        {NODES.map((node) => {
          const isActive = displayedId === node.id
          const xVal = parseFloat(node.x)
          const yVal = parseFloat(node.y)
          const cardLeft = xVal > 55 ? undefined : '0'
          const cardRight = xVal > 55 ? '0' : undefined
          const cardTop = yVal > 65 ? undefined : 'calc(100% + 10px)'
          const cardBottom = yVal > 65 ? 'calc(100% + 10px)' : undefined

          return (
            <div
              key={node.id}
              className="absolute"
              style={{ left: node.x, top: node.y }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Pill */}
              <motion.div
                className="relative z-20 rounded-full px-4 py-2 cursor-default select-none whitespace-nowrap"
                animate={{
                  backgroundColor: isActive ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.45)',
                  scale: isActive ? 1.06 : 1,
                  boxShadow: isActive
                    ? '0 4px 20px rgba(0,0,0,0.12)'
                    : '0 0 0 1px rgba(255,255,255,0.6)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <motion.span
                  className="text-sm font-semibold"
                  animate={{ color: isActive ? '#111827' : 'rgba(75,85,99,0.7)' }}
                  transition={{ duration: 0.25 }}
                >
                  {node.label}
                </motion.span>
              </motion.div>

              {/* Expanded card — fades in/out automatically */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute z-30 w-72 bg-white rounded-2xl shadow-xl p-5"
                    style={{ left: cardLeft, right: cardRight, top: cardTop, bottom: cardBottom }}
                    initial={{ opacity: 0, scale: 0.94, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -6 }}
                    transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <div className={`w-10 h-10 rounded-full ${node.color} mb-4`} />
                    <h3 className="text-[20px] font-bold text-gray-900 mb-2">{node.title}</h3>
                    <p className="text-[15px] font-semibold text-gray-800 mb-4">{node.desc}</p>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-coral flex-shrink-0 mt-0.5" />
                      <p className="text-[14px] text-gray-600 leading-snug">{node.task}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
