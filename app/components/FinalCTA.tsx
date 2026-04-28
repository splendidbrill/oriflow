import Reveal from './Reveal'

export default function FinalCTA() {
  return (
    <section className="final-cta" data-screen-label="06 CTA">
      <div className="final-bg" />
      <div className="wrap">
        <Reveal>
          <h2 className="display">Talk to yourself.<br /><em>Properly, this time.</em></h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="lede">Free forever. Three minutes to start. No card.</p>
        </Reveal>
        <Reveal delay={300}>
          <div className="stores">
            <a href="#" className="store-btn">
              <span style={{ fontSize: 24 }}></span>
              <span>
                <div className="small">Download on</div>
                <div className="big">App Store</div>
              </span>
            </a>
            <a href="#" className="store-btn">
              <span style={{ fontSize: 24 }}>▶</span>
              <span>
                <div className="small">Get it on</div>
                <div className="big">Google Play</div>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
