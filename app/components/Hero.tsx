import Reveal from './Reveal'
import { HEADLINES, HeadlineConfig, HeadlinePart } from '../lib/constants'

function renderHeadline(parts: HeadlinePart[]) {
  return parts.map((p, i) => {
    if (typeof p === 'string') return <span key={i}>{p}</span>
    if ('br' in p) return <br key={i} />
    if ('alt' in p) return <span key={i} className="alt">{p.alt}</span>
    if ('strike' in p) return <span key={i} className="strike">{p.strike}</span>
    return null
  })
}

function DialogueStage({ showScribbles }: { showScribbles: boolean }) {
  return (
    <div className="stage">
      <Reveal delay={200}>
        <div className="bubble from-me b1">
          <div className="who">you</div>
          I&apos;m fine. It was fine. The day was fine.
          <span className="tail" />
        </div>
      </Reveal>
      <Reveal delay={420}>
        <div className="bubble from-self b2">
          <div className="who">also you</div>
          Three &ldquo;fines&rdquo; in a row. Pick one.
          <span className="tail" />
        </div>
      </Reveal>
      <Reveal delay={640}>
        <div className="bubble from-me b3">
          <div className="who">you</div>
          Okay — tired. And a bit invisible.
          <span className="tail" />
        </div>
      </Reveal>
      <Reveal delay={860}>
        <div className="bubble from-coach b4">
          <div className="who">oriflow</div>
          Good. Now we have something real to sit with. Want to stay here for two minutes?
          <span className="tail" />
        </div>
      </Reveal>
      <Reveal delay={1080}>
        <div className="bubble from-me b5">
          <div className="who">you</div>
          Yeah. Two minutes.
          <span className="tail" />
        </div>
      </Reveal>
      <Reveal delay={1280}>
        <div className="typing">
          <span /><span /><span />
        </div>
      </Reveal>

      {showScribbles && (
        <div
          className="scribble-note"
          style={{ top: -30, right: 20, transform: 'rotate(-4deg)', maxWidth: 200, fontSize: 24, lineHeight: 1.15 }}
        >
          no fake &ldquo;you got this!&rdquo;<br />just real questions →
        </div>
      )}
    </div>
  )
}

export default function Hero({
  headline = HEADLINES.blunt,
  showScribbles = true,
}: {
  headline?: HeadlineConfig
  showScribbles?: boolean
}) {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="sky" />
      <div className="wrap hero-grid">
        <div>
          <Reveal>
            <span className="eyebrow"><span className="dot" />{headline.eyebrow}</span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="display hero-h">{renderHeadline(headline.h1)}</h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="hero-sub">{headline.sub}</p>
          </Reveal>
          <Reveal delay={360}>
            <div className="hero-cta">
              <button className="btn btn-coral">Start a 3-minute talk →</button>
              <button className="btn btn-ghost">How it works</button>
            </div>
          </Reveal>
          <Reveal delay={480}>
            <div className="micro" style={{ marginTop: 28 }}>
              Free forever tier · No credit card · No streak shame
            </div>
          </Reveal>
        </div>
        <DialogueStage showScribbles={showScribbles} />
      </div>
    </section>
  )
}
