import Reveal from './Reveal'

const SESSIONS = [
  { tag: 'morning',   title: "What am I avoiding today?",          meta: 'Coach-led · 8 min',        dur: '08:00', glyph: '☀︎', tone: '' },
  { tag: 'afternoon', title: "The five-why with yourself",          meta: 'Self-dialogue · 12 min',   dur: '12:00', glyph: '◐',  tone: 'lav' },
  { tag: 'evening',   title: "What did today actually want?",       meta: 'Reflection · 6 min',       dur: '06:00', glyph: '☾',  tone: 'butter' },
  { tag: 'sleep',     title: "Putting the day down",                meta: 'Sleep dialogue · 22 min',  dur: '22:00', glyph: '✦',  tone: 'lav' },
  { tag: 'mood',      title: "Naming what you're feeling, badly",   meta: 'Mood check-in · 4 min',    dur: '04:00', glyph: '♡',  tone: '' },
]

export default function Practice() {
  return (
    <section className="block" id="practice" data-screen-label="03 Practice" style={{ position: 'relative' }}>
      <div className="practice-bg" />
      <div className="wrap practice-grid">
        <div>
          <Reveal><div className="sec-eyebrow">// a day with it</div></Reveal>
          <Reveal delay={100}>
            <h2 className="display sec-h">Five tiny conversations <em>and you&apos;re held.</em></h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="sec-lede">
              No 30-day program. Just five short prompts spread across your day, each under twelve minutes.
              Skip any. Repeat any. Nobody&apos;s keeping score.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="session-list">
              {SESSIONS.map((s, i) => (
                <div className={`session ${s.tone}`} key={i}>
                  <div className="glyph">{s.glyph}</div>
                  <div>
                    <div className="title">{s.title}</div>
                    <div className="meta">{s.meta}</div>
                  </div>
                  <div className="dur">{s.dur}</div>
                  <div className="play">▶</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <div className="dialogue-card">
            <div className="session-head">
              <span>Evening · What did today actually want?</span>
              <span className="live">live</span>
            </div>
            <div className="convo">
              <div className="msg self">
                <div className="lbl">oriflow</div>
                Before bed — what does today still want from you?
              </div>
              <div className="msg you">
                <div className="lbl">you</div>
                For me to admit I was hurt by what Sam said.
              </div>
              <div className="msg self">
                <div className="lbl">oriflow</div>
                Out loud, to yourself, just once. Then we put it down.
              </div>
              <div className="msg you">
                <div className="lbl">you</div>
                I was hurt by what Sam said.
              </div>
              <div className="msg self">
                <div className="lbl">oriflow</div>
                Good. That&apos;s enough for tonight.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
