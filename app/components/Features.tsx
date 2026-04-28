import Reveal from './Reveal'

export default function Features() {
  return (
    <section className="block" id="features" data-screen-label="02 Features">
      <div className="wrap">
        <Reveal><div className="sec-eyebrow">// what&apos;s inside</div></Reveal>
        <Reveal delay={100}>
          <h2 className="display sec-h">Four rooms. <em>One door.</em><br />You.</h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="sec-lede">
            Meditation, sleep, mood, and therapeutic dialogue — built around the same idea:
            you talking to you, with someone to keep the conversation honest.
          </p>
        </Reveal>

        <div className="features">
          <Reveal delay={100}>
            <div className="feat">
              <span className="tag">core</span>
              <div className="icon">◇</div>
              <h3>Socratic Sessions</h3>
              <p>Guided dialogues that ask better questions instead of handing you answers. Five minutes, on the bus, before the meeting.</p>
              <div className="big-quote">&ldquo;What&apos;s the <em>actual</em> thing under the thing?&rdquo;</div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="feat">
              <div className="icon" style={{ background: 'linear-gradient(135deg, var(--lav) 0%, #E9D4F0 100%)' }}>☾</div>
              <h3>Sleep Without Optimization</h3>
              <p>No 7-step routine. Just dialogues that put the day down — slowly, with permission to leave things unfinished.</p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="feat">
              <div className="icon" style={{ background: 'linear-gradient(135deg, var(--butter) 0%, var(--peach) 100%)' }}>♡</div>
              <h3>Mood, with words</h3>
              <p>Skip the 1–10 sliders. Name it.</p>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="feat">
              <div className="icon">✦</div>
              <h3>1:1 with a real coach</h3>
              <p>Real humans. Trauma-informed. Ten minutes when you need it, not a 50-minute commitment when you don&apos;t.</p>
            </div>
          </Reveal>
          <Reveal delay={500}>
            <div className="feat">
              <span className="tag">honest</span>
              <div className="icon" style={{ background: 'linear-gradient(135deg, var(--lav) 0%, #C8B6E2 100%)' }}>✕</div>
              <h3>Anti-streak</h3>
              <p>Miss a day on purpose. Rest is the practice. We will never guilt-trip you with a flame emoji.</p>
            </div>
          </Reveal>
          <Reveal delay={600}>
            <div className="feat">
              <div className="icon" style={{ background: 'linear-gradient(135deg, var(--peach) 0%, var(--coral) 100%)' }}>↺</div>
              <h3>Replay your year</h3>
              <p>Look back at what you said to yourself. Watch the patterns. Notice the shifts.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
