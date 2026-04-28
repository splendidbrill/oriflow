import Reveal from './Reveal'

const FAQS = [
  { q: "Is this just another meditation app?", a: "No. Meditation is one room of four — sleep, mood, and therapeutic conversation are equal citizens. The throughline is dialogue: with yourself, with a coach, with the part of you that's tired of pretending." },
  { q: "Do I need to journal? I hate journaling.", a: "You can speak instead of write. Or just listen. The whole product is built around how you actually want to think, not a forced productivity ritual." },
  { q: "Will this replace my therapist?", a: "Absolutely not, and we'll say that out loud. Oriflow is a daily practice. Therapy is a relationship. We complement, we don't compete." },
  { q: "What's the catch with the free tier?", a: "There isn't one. You get the daily session, mood check-ins, and a starter library forever. Premium adds the full library, unlimited 1:1 coach sessions, and sleep stories." },
  { q: "My data?", a: "Stays on your device by default. End-to-end encrypted if you choose to sync. We don't sell anything to anyone, ever — that's literally in our charter." },
]

export default function FAQ() {
  return (
    <section className="block" id="faq" data-screen-label="05 FAQ">
      <div className="wrap">
        <Reveal>
          <div className="sec-eyebrow" style={{ textAlign: 'center' }}>// the things you&apos;d actually ask</div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="display sec-h" style={{ textAlign: 'center', margin: '0 auto 56px' }}>
            Yes, but <em>really though.</em>
          </h2>
        </Reveal>
        <div className="faq-wrap">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 60}>
              <details className="faq">
                <summary>{f.q}</summary>
                <div className="ans">{f.a}</div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
