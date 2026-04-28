export const PALETTES = {
  sunset: { peach:"#FFB89A", peachDeep:"#F2926A", lav:"#C8B6E2", lavDeep:"#9E89C9", coral:"#E5654E", sky1:"#FFD5C2", sky2:"#E9D4F0", sky3:"#C9D6F2", butter:"#FFE3B0" },
  meadow: { peach:"#C9E5B4", peachDeep:"#8FC076", lav:"#FFE5A8", lavDeep:"#E8B65C", coral:"#E07A4F", sky1:"#E8F2D4", sky2:"#FFF1C9", sky3:"#D5E8E0", butter:"#FFE3B0" },
  rose:   { peach:"#FFC2D1", peachDeep:"#F08AA8", lav:"#D4C5F0", lavDeep:"#A488D4", coral:"#D14B6E", sky1:"#FFD9E4", sky2:"#E5DAF5", sky3:"#FFE0CC", butter:"#FFE0B0" },
  dawn:   { peach:"#FFD9B0", peachDeep:"#F0B070", lav:"#A8C4E5", lavDeep:"#6F95C2", coral:"#D85A3B", sky1:"#FFE0C0", sky2:"#D0DCEB", sky3:"#F0E0D0", butter:"#FFE3B0" },
} as const

export type PaletteKey = keyof typeof PALETTES
export type Palette = typeof PALETTES.sunset

export type HeadlinePart =
  | string
  | { br: true }
  | { alt: string }
  | { strike: string }

export type HeadlineConfig = {
  eyebrow: string
  h1: HeadlinePart[]
  sub: string
}

export const HEADLINES: Record<string, HeadlineConfig> = {
  blunt: {
    eyebrow: "wellness, but make it honest",
    h1: ["Stop fixing yourself.", { br: true }, "Start ", { alt: "listening." }],
    sub: "Oriflow isn't another app that promises a 'better you' in 7 days. It's a quiet space to talk to yourself, properly — without affirmations, gurus, or guilt.",
  },
  soft: {
    eyebrow: "a softer kind of work",
    h1: ["Less performance.", { br: true }, "More ", { alt: "presence." }],
    sub: "Oriflow guides you through dialogues with yourself — meditation, sleep, mood, therapy — held together by one idea: you don't need fixing, you need listening.",
  },
  rebel: {
    eyebrow: "the anti-wellness wellness app",
    h1: ["Throw out the ", { strike: "10-day program" }, { br: true }, { alt: "and just talk." }],
    sub: "No streaks. No leaderboards. No 'mindset coach' yelling positivity at you. Just structured conversations with the only person who actually has to live in your head.",
  },
}
