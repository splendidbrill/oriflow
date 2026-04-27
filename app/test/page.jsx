"use client"
import React, { useState, useEffect, useRef } from "react";

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "sunset",
  "headline": "blunt",
  "density": "comfy",
  "showScribbles": true
}/*EDITMODE-END*/;

const PALETTES = {
  sunset: { peach:"#FFB89A", peachDeep:"#F2926A", lav:"#C8B6E2", lavDeep:"#9E89C9", coral:"#E5654E", sky1:"#FFD5C2", sky2:"#E9D4F0", sky3:"#C9D6F2", butter:"#FFE3B0" },
  meadow: { peach:"#C9E5B4", peachDeep:"#8FC076", lav:"#FFE5A8", lavDeep:"#E8B65C", coral:"#E07A4F", sky1:"#E8F2D4", sky2:"#FFF1C9", sky3:"#D5E8E0", butter:"#FFE3B0" },
  rose:   { peach:"#FFC2D1", peachDeep:"#F08AA8", lav:"#D4C5F0", lavDeep:"#A488D4", coral:"#D14B6E", sky1:"#FFD9E4", sky2:"#E5DAF5", sky3:"#FFE0CC", butter:"#FFE0B0" },
  dawn:   { peach:"#FFD9B0", peachDeep:"#F0B070", lav:"#A8C4E5", lavDeep:"#6F95C2", coral:"#D85A3B", sky1:"#FFE0C0", sky2:"#D0DCEB", sky3:"#F0E0D0", butter:"#FFE3B0" },
};

const HEADLINES = {
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
};

const FAQS = [
  { q:"Is this just another meditation app?", a:"No. Meditation is one room of four — sleep, mood, and therapeutic conversation are equal citizens. The throughline is dialogue: with yourself, with a coach, with the part of you that's tired of pretending." },
  { q:"Do I need to journal? I hate journaling.", a:"You can speak instead of write. Or just listen. The whole product is built around how you actually want to think, not a forced productivity ritual." },
  { q:"Will this replace my therapist?", a:"Absolutely not, and we'll say that out loud. Oriflow is a daily practice. Therapy is a relationship. We complement, we don't compete." },
  { q:"What's the catch with the free tier?", a:"There isn't one. You get the daily session, mood check-ins, and a starter library forever. Premium adds the full library, unlimited 1:1 coach sessions, and sleep stories." },
  { q:"My data?", a:"Stays on your device by default. End-to-end encrypted if you choose to sync. We don't sell anything to anyone, ever — that's literally in our charter." },
];

const SESSIONS = [
  { tag:"morning", title:"What am I avoiding today?", meta:"Coach-led · 8 min", dur:"08:00", glyph:"☀︎", tone:"" },
  { tag:"afternoon", title:"The five-why with yourself", meta:"Self-dialogue · 12 min", dur:"12:00", glyph:"◐", tone:"lav" },
  { tag:"evening", title:"What did today actually want?", meta:"Reflection · 6 min", dur:"06:00", glyph:"☾", tone:"butter" },
  { tag:"sleep", title:"Putting the day down", meta:"Sleep dialogue · 22 min", dur:"22:00", glyph:"✦", tone:"lav" },
  { tag:"mood", title:"Naming what you're feeling, badly", meta:"Mood check-in · 4 min", dur:"04:00", glyph:"♡", tone:"" },
];

function Reveal({ children, delay=0, className="" }){
  const ref = useRef();
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const obs = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ setTimeout(()=>el.classList.add("in"), delay); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return ()=>obs.disconnect();
  },[delay]);
  return <div className={`reveal ${className}`} ref={ref}>{children}</div>;
}

function renderHeadline(parts){
  return parts.map((p,i)=>{
    if(typeof p === "string") return <span key={i}>{p}</span>;
    if(p.br) return <br key={i} />;
    if(p.alt) return <span key={i} className="alt">{p.alt}</span>;
    if(p.strike) return <span key={i} className="strike">{p.strike}</span>;
    return null;
  });
}

function useTweaks(defaults) {
  const [state, setState] = useState(defaults);
  const set = (key, val) => setState(prev => ({ ...prev, [key]: val }));
  return [state, set];
}

function App(){
  const [t, setT] = useTweaks(TWEAK_DEFAULTS);
  const palette = PALETTES[t.palette] || PALETTES.sunset;
  const headline = HEADLINES[t.headline] || HEADLINES.blunt;

  // apply palette via CSS vars
  useEffect(()=>{
    const root = document.documentElement;
    root.style.setProperty("--peach", palette.peach);
    root.style.setProperty("--peach-deep", palette.peachDeep);
    root.style.setProperty("--lav", palette.lav);
    root.style.setProperty("--lav-deep", palette.lavDeep);
    root.style.setProperty("--coral", palette.coral);
    root.style.setProperty("--sky-1", palette.sky1);
    root.style.setProperty("--sky-2", palette.sky2);
    root.style.setProperty("--sky-3", palette.sky3);
    root.style.setProperty("--butter", palette.butter);
  }, [palette]);

  useEffect(()=>{
    document.body.dataset.density = t.density;
  }, [t.density]);

  return (
    <>
      <Nav />
      <Hero headline={headline} showScribbles={t.showScribbles} />
      <Receipts />
      <Features />
      <Practice />
      <Manifesto />
      <FAQ />
      <FinalCTA />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Palette">
          <TweakRadio label="Mood" value={t.palette} onChange={v=>setT('palette',v)}
            options={[
              {label:"Sunset", value:"sunset"},
              {label:"Meadow", value:"meadow"},
              {label:"Rose", value:"rose"},
              {label:"Dawn", value:"dawn"},
            ]}/>
        </TweakSection>
        <TweakSection title="Voice">
          <TweakRadio label="Headline tone" value={t.headline} onChange={v=>setT('headline',v)}
            options={[
              {label:"Blunt", value:"blunt"},
              {label:"Soft", value:"soft"},
              {label:"Rebel", value:"rebel"},
            ]}/>
        </TweakSection>
        <TweakSection title="Layout">
          <TweakRadio label="Density" value={t.density} onChange={v=>setT('density',v)}
            options={[
              {label:"Tight", value:"tight"},
              {label:"Comfy", value:"comfy"},
              {label:"Airy", value:"airy"},
            ]}/>
          <TweakToggle label="Handwritten margin notes" value={t.showScribbles} onChange={v=>setT('showScribbles',v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

function Nav(){
  return (
    <nav className="top">
      <div className="wrap nav-row">
        <div className="logo">
          <span className="logo-mark"></span>
          <span>Oriflow</span>
        </div>
        <div className="nav-links">
          <a href="#features">What's inside</a>
          <a href="#practice">A day with it</a>
          <a href="#manifesto">Why we built it</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-cta">
          <button className="btn btn-ghost">Sign in</button>
          <button className="btn btn-primary">Try it free</button>
        </div>
      </div>
    </nav>
  );
}

function Hero({ headline, showScribbles }){
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="sky"></div>
      <div className="wrap hero-grid">
        <div>
          <Reveal>
            <span className="eyebrow"><span className="dot"></span>{headline.eyebrow}</span>
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
            <div className="micro" style={{marginTop:28}}>Free forever tier · No credit card · No streak shame</div>
          </Reveal>
        </div>
        <DialogueStage showScribbles={showScribbles}/>
      </div>
    </section>
  );
}

function DialogueStage({ showScribbles }){
  return (
    <div className="stage">
      <Reveal delay={200}>
        <div className="bubble from-me b1">
          <div className="who">you</div>
          I'm fine. It was fine. The day was fine.
          <span className="tail"></span>
        </div>
      </Reveal>
      <Reveal delay={420}>
        <div className="bubble from-self b2">
          <div className="who">also you</div>
          Three "fines" in a row. Pick one.
          <span className="tail"></span>
        </div>
      </Reveal>
      <Reveal delay={640}>
        <div className="bubble from-me b3">
          <div className="who">you</div>
          Okay — tired. And a bit invisible.
          <span className="tail"></span>
        </div>
      </Reveal>
      <Reveal delay={860}>
        <div className="bubble from-coach b4">
          <div className="who">oriflow</div>
          Good. Now we have something real to sit with. Want to stay here for two minutes?
          <span className="tail"></span>
        </div>
      </Reveal>
      <Reveal delay={1080}>
        <div className="bubble from-me b5">
          <div className="who">you</div>
          Yeah. Two minutes.
          <span className="tail"></span>
        </div>
      </Reveal>
      <Reveal delay={1280}>
        <div className="typing">
          <span></span><span></span><span></span>
        </div>
      </Reveal>

      {showScribbles && (
        <>
          <div className="scribble-note" style={{top:-30, right:20, transform:"rotate(-4deg)", maxWidth:200, fontSize:24, lineHeight:1.15}}>
            no fake "you got this!"<br/>just real questions →
          </div>
        </>
      )}
    </div>
  );
}

function Receipts(){
  const items = [
    "no streaks", "no shame spirals", "no daily affirmations", "no 'guru voice'",
    "no leaderboards", "no productivity-bro overlay", "no 'high-vibes only'",
    "no 30-day transformations", "no notification guilt"
  ];
  const doubled = [...items, ...items];
  return (
    <div className="receipts">
      <div className="receipts-track">
        {doubled.map((s,i)=><span key={i}>{s}</span>)}
      </div>
    </div>
  );
}

function Features(){
  return (
    <section className="block" id="features" data-screen-label="02 Features">
      <div className="wrap">
        <Reveal><div className="sec-eyebrow">// what's inside</div></Reveal>
        <Reveal delay={100}>
          <h2 className="display sec-h">Four rooms. <em>One door.</em><br/>You.</h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="sec-lede">Meditation, sleep, mood, and therapeutic dialogue — built around the same idea: you talking to you, with someone to keep the conversation honest.</p>
        </Reveal>

        <div className="features">
          <Reveal delay={100} className="feat-1">
            <div className="feat">
              <span className="tag">core</span>
              <div className="icon">◇</div>
              <h3>Socratic Sessions</h3>
              <p>Guided dialogues that ask better questions instead of handing you answers. Five minutes, on the bus, before the meeting.</p>
              <div className="big-quote">"What's the <em>actual</em> thing under the thing?"</div>
            </div>
          </Reveal>
          <Reveal delay={200} className="feat-2">
            <div className="feat">
              <div className="icon" style={{background:"linear-gradient(135deg, var(--lav) 0%, #E9D4F0 100%)"}}>☾</div>
              <h3>Sleep Without Optimization</h3>
              <p>No 7-step routine. Just dialogues that put the day down — slowly, with permission to leave things unfinished.</p>
            </div>
          </Reveal>
          <Reveal delay={300} className="feat-3">
            <div className="feat">
              <div className="icon" style={{background:"linear-gradient(135deg, var(--butter) 0%, var(--peach) 100%)"}}>♡</div>
              <h3>Mood, with words</h3>
              <p>Skip the 1–10 sliders. Name it.</p>
            </div>
          </Reveal>
          <Reveal delay={400} className="feat-4">
            <div className="feat">
              <div className="icon">✦</div>
              <h3>1:1 with a real coach</h3>
              <p>Real humans. Trauma-informed. Ten minutes when you need it, not a 50-minute commitment when you don't.</p>
            </div>
          </Reveal>
          <Reveal delay={500} className="feat-5">
            <div className="feat">
              <span className="tag">honest</span>
              <div className="icon" style={{background:"linear-gradient(135deg, var(--lav) 0%, #C8B6E2 100%)"}}>✕</div>
              <h3>Anti-streak</h3>
              <p>Miss a day on purpose. Rest is the practice. We will never guilt-trip you with a flame emoji.</p>
            </div>
          </Reveal>
          <Reveal delay={600} className="feat-6">
            <div className="feat">
              <div className="icon" style={{background:"linear-gradient(135deg, var(--peach) 0%, var(--coral) 100%)"}}>↺</div>
              <h3>Replay your year</h3>
              <p>Look back at what you said to yourself. Watch the patterns. Notice the shifts.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Practice(){
  return (
    <section className="block" id="practice" data-screen-label="03 Practice" style={{position:"relative"}}>
      <div className="practice-bg"></div>
      <div className="wrap practice-grid">
        <div>
          <Reveal><div className="sec-eyebrow">// a day with it</div></Reveal>
          <Reveal delay={100}>
            <h2 className="display sec-h">Five tiny conversations <em>and you're held.</em></h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="sec-lede">No 30-day program. Just five short prompts spread across your day, each under twelve minutes. Skip any. Repeat any. Nobody's keeping score.</p>
          </Reveal>
          <Reveal delay={300}>
            <div className="session-list">
              {SESSIONS.map((s,i)=>(
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
                Good. That's enough for tonight.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Manifesto(){
  return (
    <section className="block" id="manifesto" data-screen-label="04 Manifesto">
      <div className="wrap">
        <div className="manifesto">
          <div className="manifesto-inner">
            <div className="sec-eyebrow">// from the founder</div>
            <h2>The wellness industry has been selling us <em>the wrong promise.</em></h2>
            <p>That with enough discipline, enough breath-work, enough cold showers, we'll arrive at some final, optimized self. We won't. Nobody does. The optimized self is a lie that keeps you buying.</p>
            <p>Oriflow is built on the opposite idea: you don't need to be fixed. You need to be heard — and you happen to already live with the only person who can do it. We just hand you the questions, the structure, and the silence.</p>
            <p>If that sounds underwhelming compared to "transform your life in 21 days," good. That's the whole point.</p>
            <div className="signature">
              <div>
                <div className="sig-name">— Maya R.</div>
                <div className="sig-title">Founder, Oriflow · Former clinical psych, recovering optimizer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ(){
  return (
    <section className="block" id="faq" data-screen-label="05 FAQ">
      <div className="wrap">
        <Reveal><div className="sec-eyebrow" style={{textAlign:"center"}}>// the things you'd actually ask</div></Reveal>
        <Reveal delay={100}>
          <h2 className="display sec-h" style={{textAlign:"center", margin:"0 auto 56px"}}>Yes, but <em>really though.</em></h2>
        </Reveal>
        <div className="faq-wrap">
          {FAQS.map((f,i)=>(
            <Reveal key={i} delay={i*60}>
              <details className="faq">
                <summary>{f.q}</summary>
                <div className="ans">{f.a}</div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA(){
  return (
    <section className="final-cta" data-screen-label="06 CTA">
      <div className="final-bg"></div>
      <div className="wrap">
        <Reveal>
          <h2 className="display">Talk to yourself.<br/><em>Properly, this time.</em></h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="lede">Free forever. Three minutes to start. No card.</p>
        </Reveal>
        <Reveal delay={300}>
          <div className="stores">
            <a href="#" className="store-btn">
              <span style={{fontSize:24}}></span>
              <span>
                <div className="small">Download on</div>
                <div className="big">App Store</div>
              </span>
            </a>
            <a href="#" className="store-btn">
              <span style={{fontSize:24}}>▶</span>
              <span>
                <div className="small">Get it on</div>
                <div className="big">Google Play</div>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer>
      <div className="wrap foot-row">
        <div className="logo">
          <span className="logo-mark"></span>
          <span>Oriflow</span>
        </div>
        <div className="foot-links">
          <a href="#">Privacy</a>
          <a href="#">Charter</a>
          <a href="#">Press</a>
          <a href="#">Careers</a>
          <a href="#">hi@oriflow.app</a>
        </div>
        <div style={{fontSize:13, opacity:.6}}>© 2026 Oriflow · Made slowly</div>
      </div>
    </footer>
  );
}

function TweaksPanel({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="tweaks-panel">
      <div className="tweaks-title" onClick={() => setOpen(o => !o)}>
        {title} {open ? "▲" : "▼"}
      </div>
      {open && <div className="tweaks-body">{children}</div>}
    </div>
  );
}

function TweakSection({ title, children }) {
  return (
    <div className="tweak-section">
      <div className="tweak-section-title">{title}</div>
      {children}
    </div>
  );
}

function TweakRadio({ label, value, onChange, options }) {
  return (
    <div className="tweak-field">
      <div className="tweak-label">{label}</div>
      <div className="tweak-options">
        {options.map(o => (
          <label key={o.value} className={`tweak-opt${value === o.value ? " active" : ""}`}>
            <input type="radio" name={label} value={o.value} checked={value === o.value}
              onChange={() => onChange(o.value)} />
            {o.label}
          </label>
        ))}
      </div>
    </div>
  );
}

function TweakToggle({ label, value, onChange }) {
  return (
    <div className="tweak-field tweak-toggle">
      <label>
        <input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} />
        {label}
      </label>
    </div>
  );
}

export default App;
