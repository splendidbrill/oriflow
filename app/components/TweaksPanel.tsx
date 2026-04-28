'use client'

import { useState, useEffect } from 'react'
import { PALETTES, HEADLINES, PaletteKey } from '../lib/constants'

const DEFAULTS = {
  palette: 'sunset' as PaletteKey,
  headline: 'blunt',
  density: 'comfy' as 'tight' | 'comfy' | 'airy',
  showScribbles: true,
}

export default function TweaksPanel() {
  const [open, setOpen] = useState(true)
  const [t, setT] = useState(DEFAULTS)

  const set = <K extends keyof typeof DEFAULTS>(key: K, val: (typeof DEFAULTS)[K]) =>
    setT(prev => ({ ...prev, [key]: val }))

  useEffect(() => {
    const palette = PALETTES[t.palette] ?? PALETTES.sunset
    const root = document.documentElement
    root.style.setProperty('--peach', palette.peach)
    root.style.setProperty('--peach-deep', palette.peachDeep)
    root.style.setProperty('--lav', palette.lav)
    root.style.setProperty('--lav-deep', palette.lavDeep)
    root.style.setProperty('--coral', palette.coral)
    root.style.setProperty('--sky-1', palette.sky1)
    root.style.setProperty('--sky-2', palette.sky2)
    root.style.setProperty('--sky-3', palette.sky3)
    root.style.setProperty('--butter', palette.butter)
  }, [t.palette])

  useEffect(() => {
    document.body.dataset.density = t.density
  }, [t.density])

  return (
    <div className="tweaks-panel">
      <div className="tweaks-title" onClick={() => setOpen(o => !o)}>
        Tweaks {open ? '▲' : '▼'}
      </div>
      {open && (
        <div className="tweaks-body">
          <TweakSection title="Palette">
            <TweakRadio
              label="Mood"
              value={t.palette}
              onChange={v => set('palette', v as PaletteKey)}
              options={[
                { label: 'Sunset', value: 'sunset' },
                { label: 'Meadow', value: 'meadow' },
                { label: 'Rose',   value: 'rose' },
                { label: 'Dawn',   value: 'dawn' },
              ]}
            />
          </TweakSection>
          <TweakSection title="Voice">
            <TweakRadio
              label="Headline tone"
              value={t.headline}
              onChange={v => set('headline', v)}
              options={Object.keys(HEADLINES).map(k => ({ label: k.charAt(0).toUpperCase() + k.slice(1), value: k }))}
            />
          </TweakSection>
          <TweakSection title="Layout">
            <TweakRadio
              label="Density"
              value={t.density}
              onChange={v => set('density', v as typeof t.density)}
              options={[
                { label: 'Tight', value: 'tight' },
                { label: 'Comfy', value: 'comfy' },
                { label: 'Airy',  value: 'airy' },
              ]}
            />
            <TweakToggle
              label="Handwritten margin notes"
              value={t.showScribbles}
              onChange={v => set('showScribbles', v)}
            />
          </TweakSection>
        </div>
      )}
    </div>
  )
}

function TweakSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="tweak-section">
      <div className="tweak-section-title">{title}</div>
      {children}
    </div>
  )
}

function TweakRadio({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { label: string; value: string }[]
}) {
  return (
    <div className="tweak-field">
      <div className="tweak-label">{label}</div>
      <div className="tweak-options">
        {options.map(o => (
          <label key={o.value} className={`tweak-opt${value === o.value ? ' active' : ''}`}>
            <input type="radio" name={label} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
            {o.label}
          </label>
        ))}
      </div>
    </div>
  )
}

function TweakToggle({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="tweak-field tweak-toggle">
      <label>
        <input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} />
        {label}
      </label>
    </div>
  )
}
