const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "sunset",
  "headline": "blunt",
  "density": "comfy",
  "showScribbles": true
} /*EDITMODE-END*/;

const PALETTES = {
  sunset: { peach: "#FFB89A", peachDeep: "#F2926A", lav: "#C8B6E2", lavDeep: "#9E89C9", coral: "#E5654E", sky1: "#FFD5C2", sky2: "#E9D4F0", sky3: "#C9D6F2", butter: "#FFE3B0" },
  meadow: { peach: "#C9E5B4", peachDeep: "#8FC076", lav: "#FFE5A8", lavDeep: "#E8B65C", coral: "#E07A4F", sky1: "#E8F2D4", sky2: "#FFF1C9", sky3: "#D5E8E0", butter: "#FFE3B0" },
  rose: { peach: "#FFC2D1", peachDeep: "#F08AA8", lav: "#D4C5F0", lavDeep: "#A488D4", coral: "#D14B6E", sky1: "#FFD9E4", sky2: "#E5DAF5", sky3: "#FFE0CC", butter: "#FFE0B0" },
  dawn: { peach: "#FFD9B0", peachDeep: "#F0B070", lav: "#A8C4E5", lavDeep: "#6F95C2", coral: "#D85A3B", sky1: "#FFE0C0", sky2: "#D0DCEB", sky3: "#F0E0D0", butter: "#FFE3B0" }
};

const HEADLINES = {
  blunt: {
    eyebrow: "wellness, but make it honest",
    h1: ["Stop fixing yourself.", { br: true }, "Start ", { alt: "listening." }],
    sub: "Oriflow isn't another app that promises a 'better you' in 7 days. It's a quiet space to talk to yourself, properly — without affirmations, gurus, or guilt."
  },
  soft: {
    eyebrow: "a softer kind of work",
    h1: ["Less performance.", { br: true }, "More ", { alt: "presence." }],
    sub: "Oriflow guides you through dialogues with yourself — meditation, sleep, mood, therapy — held together by one idea: you don't need fixing, you need listening."
  },
  rebel: {
    eyebrow: "the anti-wellness wellness app",
    h1: ["Throw out the ", { strike: "10-day program" }, { br: true }, { alt: "and just talk." }],
    sub: "No streaks. No leaderboards. No 'mindset coach' yelling positivity at you. Just structured conversations with the only person who actually has to live in your head."
  }
};

const FAQS = [
{ q: "Is this just another meditation app?", a: "No. Meditation is one room of four — sleep, mood, and therapeutic conversation are equal citizens. The throughline is dialogue: with yourself, with a coach, with the part of you that's tired of pretending." },
{ q: "Do I need to journal? I hate journaling.", a: "You can speak instead of write. Or just listen. The whole product is built around how you actually want to think, not a forced productivity ritual." },
{ q: "Will this replace my therapist?", a: "Absolutely not, and we'll say that out loud. Oriflow is a daily practice. Therapy is a relationship. We complement, we don't compete." },
{ q: "What's the catch with the free tier?", a: "There isn't one. You get the daily session, mood check-ins, and a starter library forever. Premium adds the full library, unlimited 1:1 coach sessions, and sleep stories." },
{ q: "My data?", a: "Stays on your device by default. End-to-end encrypted if you choose to sync. We don't sell anything to anyone, ever — that's literally in our charter." }];


const SESSIONS = [
{ tag: "morning", title: "What am I avoiding today?", meta: "Coach-led · 8 min", dur: "08:00", glyph: "☀︎", tone: "" },
{ tag: "afternoon", title: "The five-why with yourself", meta: "Self-dialogue · 12 min", dur: "12:00", glyph: "◐", tone: "lav" },
{ tag: "evening", title: "What did today actually want?", meta: "Reflection · 6 min", dur: "06:00", glyph: "☾", tone: "butter" },
{ tag: "sleep", title: "Putting the day down", meta: "Sleep dialogue · 22 min", dur: "22:00", glyph: "✦", tone: "lav" },
{ tag: "mood", title: "Naming what you're feeling, badly", meta: "Mood check-in · 4 min", dur: "04:00", glyph: "♡", tone: "" }];


function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {setTimeout(() => el.classList.add("in"), delay);obs.disconnect();}
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div className={`reveal ${className}`} ref={ref}>{children}</div>;
}

function renderHeadline(parts) {
  return parts.map((p, i) => {
    if (typeof p === "string") return <span key={i}>{p}</span>;
    if (p.br) return <br key={i} />;
    if (p.alt) return <span key={i} className="alt">{p.alt}</span>;
    if (p.strike) return <span key={i} className="strike">{p.strike}</span>;
    return null;
  });
}

function App() {
  const [t, setT] = useTweaks(TWEAK_DEFAULTS);
  const palette = PALETTES[t.palette] || PALETTES.sunset;
  const headline = HEADLINES[t.headline] || HEADLINES.blunt;

  // apply palette via CSS vars
  useEffect(() => {
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

  useEffect(() => {
    document.body.dataset.density = t.density;
  }, [t.density]);

  return (
    <>
      <Nav />
      <Hero headline={headline} showScribbles={t.showScribbles} />
      <Receipts />
      <Ethereal />
      <Features />
      <ReasoningStack />
      <OutcomesSandbox />
      <ProductFAQ />
      <Manifesto />
      <FinalCTA />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Palette">
          <TweakRadio label="Mood" value={t.palette} onChange={(v) => setT('palette', v)}
          options={[
          { label: "Sunset", value: "sunset" },
          { label: "Meadow", value: "meadow" },
          { label: "Rose", value: "rose" },
          { label: "Dawn", value: "dawn" }]
          } />
        </TweakSection>
        <TweakSection title="Voice">
          <TweakRadio label="Headline tone" value={t.headline} onChange={(v) => setT('headline', v)}
          options={[
          { label: "Blunt", value: "blunt" },
          { label: "Soft", value: "soft" },
          { label: "Rebel", value: "rebel" }]
          } />
        </TweakSection>
        <TweakSection title="Layout">
          <TweakRadio label="Density" value={t.density} onChange={(v) => setT('density', v)}
          options={[
          { label: "Tight", value: "tight" },
          { label: "Comfy", value: "comfy" },
          { label: "Airy", value: "airy" }]
          } />
          <TweakToggle label="Handwritten margin notes" value={t.showScribbles} onChange={(v) => setT('showScribbles', v)} />
        </TweakSection>
      </TweaksPanel>
    </>);

}

function Nav() {
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
    </nav>);

}

function Hero({ headline, showScribbles }) {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="sky"></div>
      <div className="wrap hero-grid">
        <div>
          <Reveal>
            <span className="eyebrow"><span className="dot"></span>life doesn’t stick to routines</span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="display hero-h">Shape your life,<br /><span className="alt">your way.</span></h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="hero-sub">Start where you are. It begins to come together from there.</p>
          </Reveal>
          <Reveal delay={360}>
            <div className="hero-cta">
              <button className="btn btn-coral">Find your rhythm →</button>
            </div>
          </Reveal>
          <Reveal delay={480}>
            <div className="micro" style={{ marginTop: 28 }}>no more app switching · just what you need · adapts to you</div>
          </Reveal>
        </div>
        <ShapingStage />
      </div>
    </section>);

}

function ShapingStage() {
  // 5 tags, one cycles to active at a time. Each cycle ~7s.
  const TAGS = [
  {
    key: "focus",
    label: "focus",
    title: "Focus",
    principle: "Stay with what you choose.",
    action: "Set aside 10 quiet minutes for a task."
  },
  {
    key: "work",
    label: "work",
    title: "Work",
    principle: "Decide what matters before you begin.",
    action: "Pick one task to do, one to delay, one to drop."
  },
  {
    key: "noise",
    label: "clear the noise",
    title: "Clear the noise",
    principle: "What's in your head needs a place to go.",
    action: "Write everything down without organising it."
  },
  {
    key: "edge",
    label: "push your edge",
    title: "Push your edge",
    principle: "Step just beyond what feels comfortable.",
    action: "Do one thing you've been avoiding."
  },
  {
    key: "health",
    label: "health",
    title: "Health",
    principle: "Energy comes from small resets.",
    action: "Step away for 5 minutes and reset."
  }];


  // Soft, fixed positions for each tag — distributed so all 5 read clearly
  const POSITIONS = [
  { x: "10%", y: "12%", size: 15 },
  { x: "62%", y: "6%",  size: 15 },
  { x: "70%", y: "78%", size: 15 },
  { x: "4%",  y: "70%", size: 15 },
  { x: "82%", y: "42%", size: 15 }];


  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState(0); // 0 settle, 1 emerge, 2 card-in, 3 card-rest, 4 card-out

  useEffect(() => {
    let cancelled = false;
    const tick = () => {
      // Phase timeline per cycle:
      // 0ms       phase 1 (selected tag emerges/glows, others fade back)
      // 2200ms    phase 2 (card morphs in alongside; active tag stays prominent)
      // 5800ms    phase 3 (card rests)
      // 7200ms    phase 4 (card softens out, active tag eases back)
      // 8600ms    advance active, restart
      const t1 = setTimeout(() => !cancelled && setPhase(1), 50);
      const t2 = setTimeout(() => !cancelled && setPhase(2), 2200);
      const t3 = setTimeout(() => !cancelled && setPhase(3), 5800);
      const t4 = setTimeout(() => !cancelled && setPhase(4), 7200);
      const t5 = setTimeout(() => {
        if (cancelled) return;
        setActive((a) => (a + 1) % TAGS.length);
        setPhase(0);
        tick();
      }, 8600);
      return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
    };
    const stop = tick();
    return () => {cancelled = true;stop && stop();};
    // eslint-disable-next-line
  }, []);

  const current = TAGS[active];

  return (
    <div className="shaping-stage" style={{ opacity: "100" }}>
      <div className="aura"></div>
      <div className="stage-mark">oriflow</div>

      {TAGS.map((t, i) => {
        const pos = POSITIONS[i];
        const isActive = i === active;
        let opacity = 0.9,blur = 0,scale = 1;
        if (isActive) {
          if (phase >= 1) {opacity = 1;blur = 0;scale = 1.1;}
          // Active tag now STAYS visible & glowing while the card is shown
          if (phase >= 4) {opacity = 0.9;scale = 1;} // ease back to neutral
        } else {
          if (phase >= 1) {opacity = 0.5;blur = 0.6;scale = 0.96;}
          if (phase >= 4) {opacity = 0.9;blur = 0;scale = 1;}
        }
        return (
          <div key={t.key}
          className={`tag-chip ${isActive ? 'is-selected' : ''}`}
          style={{
            left: pos.x, top: pos.y,
            opacity,
            filter: `blur(${blur}px)`,
            transform: `scale(${scale})`,
            fontSize: pos.size
          }}>
            {t.label}
          </div>);

      })}

      <div className={`shape-card ${phase >= 2 && phase < 4 ? 'is-in' : ''} ${phase >= 4 ? 'is-out' : ''}`}>
        <div className="shape-card-inner" key={current.key}>
          <div className="card-dot is-in"></div>
          <div className="card-title is-in">{current.title}</div>
          <div className="card-body is-in">{current.principle}</div>
          <div className="card-step is-in">
            <span className="step-check"></span>
            <span>{current.action}</span>
          </div>
        </div>
      </div>
    </div>);

}

function Ethereal() {
  const points = [
    { kicker:"START WITH WHAT FEELS MESSY",                  sub:"You don't need to have it figured out." },
    { kicker:"WHAT YOU USE TAKES SHAPE AROUND THAT",         sub:"and stays aligned as things change." },
    { kicker:"GROWS WITH YOU. DOESN'T GET IN YOUR WAY",      sub:"Effortless at first. Indispensable over time." },
    { kicker:"PIVOT, PAUSE, LOSE MOMENTUM",                  sub:"you don't lose what you've built." },
  ];

  // mouse parallax — broadcasts mouse position as CSS vars on the stage
  const stageRef = useRef(null);
  useEffect(() => {
    const el = stageRef.current; if(!el) return;
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;   // -0.5..0.5
      const y = (e.clientY - r.top)  / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(()=>{
        el.style.setProperty('--mx', x.toFixed(3));
        el.style.setProperty('--my', y.toFixed(3));
      });
    };
    const onLeave = () => {
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="ethereal" data-screen-label="02 Ethereal">
      <div className="ethereal-aurora"></div>
      <div className="ethereal-vignette"></div>
      <div className="wrap">
        <div className="ethereal-head">
          <div className="sec-eyebrow">// the ethos</div>
          <h2>A framework for your <em>fluidity.</em></h2>
        </div>

        <div className="thread-stage" ref={stageRef}>
          {/* Luminous glass ribbon — variable width, internal glow */}
          <svg className="glass-thread" viewBox="0 0 1000 720" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="ribbonFlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0"/>
                <stop offset="12%"  stopColor="#FFFFFF" stopOpacity="0.85"/>
                <stop offset="32%"  stopColor="#FFD9C3" stopOpacity="0.65"/>
                <stop offset="55%"  stopColor="#E2D2EE" stopOpacity="0.55"/>
                <stop offset="78%"  stopColor="#FFD9C3" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="ribbonCore" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0"/>
                <stop offset="50%"  stopColor="#FFFFFF" stopOpacity="0.95"/>
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0"/>
              </linearGradient>
              <filter id="ribbonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="b"/>
                <feMerge>
                  <feMergeNode in="b"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="softBlur"><feGaussianBlur stdDeviation="0.6"/></filter>
            </defs>

            {/* outer glow halo — wide, blurred, low opacity */}
            <path
              d="M 90 90 C 380 70, 520 230, 820 220 S 600 470, 320 480 S 700 640, 940 660"
              fill="none"
              stroke="url(#ribbonFlow)"
              strokeWidth="22"
              strokeLinecap="round"
              opacity="0.35"
              filter="url(#ribbonGlow)"
            />
            {/* mid glass body — variable width via dasharray illusion */}
            <path
              d="M 90 90 C 380 70, 520 230, 820 220 S 600 470, 320 480 S 700 640, 940 660"
              fill="none"
              stroke="url(#ribbonFlow)"
              strokeWidth="9"
              strokeLinecap="round"
              opacity="0.55"
              filter="url(#softBlur)"
            />
            {/* bright core — thinnest, sharpest */}
            <path
              d="M 90 90 C 380 70, 520 230, 820 220 S 600 470, 320 480 S 700 640, 940 660"
              fill="none"
              stroke="url(#ribbonCore)"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
              className="thread-path"
            />
            {/* light pulse traveling along the ribbon */}
            <circle r="6" fill="#FFFFFF" filter="url(#ribbonGlow)" opacity="0.85">
              <animateMotion
                dur="14s"
                repeatCount="indefinite"
                path="M 90 90 C 380 70, 520 230, 820 220 S 600 470, 320 480 S 700 640, 940 660"
              />
            </circle>
          </svg>

          {/* Secondary ornaments — floating prisms at varying depth */}
          <span className="prism prism-a" aria-hidden="true"></span>
          <span className="prism prism-b" aria-hidden="true"></span>
          <span className="prism prism-c" aria-hidden="true"></span>
          <span className="prism prism-d" aria-hidden="true"></span>
          <span className="prism prism-e" aria-hidden="true"></span>
          <span className="prism prism-f" aria-hidden="true"></span>
          <span className="petal petal-a" aria-hidden="true"></span>
          <span className="petal petal-b" aria-hidden="true"></span>

          {points.map((p, i) => (
            <Reveal key={i} delay={i * 220} className={`zone zone-${i+1}`}>
              <span className="halo"></span>
              <span className="vapor"></span>
              <div className="zone-kicker">{p.kicker}</div>
              <div className="zone-sub">{p.sub}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Receipts() {
  const items = [
  "no streaks", "no shame spirals", "no daily affirmations", "no 'guru voice'",
  "no leaderboards", "no productivity-bro overlay", "no 'high-vibes only'",
  "no 30-day transformations", "no notification guilt"];

  const doubled = [...items, ...items];
  return (
    <div className="receipts">
      <div className="receipts-track">
        {doubled.map((s, i) => <span key={i}>{s}</span>)}
      </div>
    </div>);

}

function Features() {
  return (
    <section className="block" id="features" data-screen-label="02 Features">
      <div className="wrap">
        <Reveal><div className="sec-eyebrow">// what's inside</div></Reveal>
        <Reveal delay={100}>
          <h2 className="display sec-h">Four rooms. <em>One door.</em><br />You.</h2>
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
              <div className="icon" style={{ background: "linear-gradient(135deg, var(--lav) 0%, #E9D4F0 100%)" }}>☾</div>
              <h3>Sleep Without Optimization</h3>
              <p>No 7-step routine. Just dialogues that put the day down — slowly, with permission to leave things unfinished.</p>
            </div>
          </Reveal>
          <Reveal delay={300} className="feat-3">
            <div className="feat">
              <div className="icon" style={{ background: "linear-gradient(135deg, var(--butter) 0%, var(--peach) 100%)" }}>♡</div>
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
              <div className="icon" style={{ background: "linear-gradient(135deg, var(--lav) 0%, #C8B6E2 100%)" }}>✕</div>
              <h3>Anti-streak</h3>
              <p>Miss a day on purpose. Rest is the practice. We will never guilt-trip you with a flame emoji.</p>
            </div>
          </Reveal>
          <Reveal delay={600} className="feat-6">
            <div className="feat">
              <div className="icon" style={{ background: "linear-gradient(135deg, var(--peach) 0%, var(--coral) 100%)" }}>↺</div>
              <h3>Replay your year</h3>
              <p>Look back at what you said to yourself. Watch the patterns. Notice the shifts.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>);

}

function ReasoningStack() {
  const LAYERS = [
    {
      name: "Philosophy",
      title: "Your view of the world.",
      body: "The bedrock assumptions about what minds are, what change feels like, and what a good life looks like — yours, not a guru's. We start here because every layer above only holds if this one does."
    },
    {
      name: "Principles",
      title: "What you'll never trade away.",
      body: "Translate the philosophy into a handful of personal commitments. Honesty over comfort. Slowness over streaks. Listening before fixing. These are the tests we apply to every reflection."
    },
    {
      name: "Frameworks",
      title: "The shapes thinking takes.",
      body: "Borrowed where useful, adapted where necessary — Socratic dialogue, ACT defusion, CBT reframing. Not as rigid scripts but as scaffolding the conversation can lean on when you don't know where to start."
    },
    {
      name: "Practices",
      title: "Repeatable, ten-minute moves.",
      body: "Concrete things you actually do — naming what you're feeling, the five-why with yourself, putting the day down before sleep. Small enough to fit a commute, deep enough to compound."
    },
    {
      name: "Prompts",
      title: "The questions that crack a session open.",
      body: "Not affirmations. Questions. Honed in collaboration with clinicians and the only people who matter — the ones doing the work. They go where you don't yet know how to look."
    },
    {
      name: "Patterns",
      title: "What you keep saying to yourself.",
      body: "Across weeks and months, the loops emerge — what you avoid, where you defer, the language you reach for under pressure. Surfaced gently, never weaponised."
    },
    {
      name: "Outcomes",
      title: "How a real life actually shifts.",
      body: "Not 'transform in 21 days.' Sleep that returns. A harder conversation, had. A grudge dropped on purpose. Quiet, durable change — the only kind worth measuring."
    }
  ];

  const [active, setActive] = useState(0);
  const defRefs = useRef([]);
  const splitRef = useRef(null);

  // Sticky scroll: activate the layer whose definition is nearest screen center
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const center = window.innerHeight * 0.45;
        let bestIdx = 0;
        let bestDist = Infinity;
        defRefs.current.forEach((el, i) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const mid = r.top + r.height / 2;
          const d = Math.abs(mid - center);
          if (d < bestDist) { bestDist = d; bestIdx = i; }
        });
        setActive(bestIdx);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToLayer = (i) => {
    const el = defRefs.current[i];
    if (!el) return;
    const r = el.getBoundingClientRect();
    const target = window.scrollY + r.top - window.innerHeight * 0.32;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const [sheetOpen, setSheetOpen] = useState(false);
  const goPrev = () => scrollToLayer(Math.max(0, active - 1));
  const goNext = () => scrollToLayer(Math.min(LAYERS.length - 1, active + 1));
  const openLayer = (i) => { setSheetOpen(false); scrollToLayer(i); };

  return (
    <section className="stack-section" data-screen-label="03 Reasoning Stack">
      <div className="stack-aurora"></div>
      <div className="wrap">
        {/* Sticky header — matches the site's section header system */}
        <div className="stack-sticky-head">
          <div className="sec-eyebrow">// the shape of thought, reverse engineered</div>
          <h2 className="display sec-h stack-sec-h">
            An AI reasoning stack that spans every layer of thinking — from <em>first principles</em> to <em>outcome.</em>
          </h2>
        </div>

        {/* sticky split: spine left, defs right */}
        <div className="stack-split" ref={splitRef}>
          <div className="stack-spine">
            {LAYERS.map((l, i) => (
              <button
                key={l.name}
                type="button"
                onClick={() => scrollToLayer(i)}
                className={`lozenge ${i === active ? 'is-active' : ''}`}
              >
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="name">{l.name}</span>
              </button>
            ))}
          </div>

          {/* Mobile-only picker: prev/next + index + tap to open full sheet */}
          <div className="stack-pager" aria-hidden="false">
            <button type="button" className="pager-arrow" onClick={goPrev} disabled={active === 0} aria-label="Previous layer">‹</button>
            <button type="button" className="pager-pill" onClick={() => setSheetOpen(true)}>
              <span className="pager-index">{String(active + 1).padStart(2, '0')}<span className="pager-of"> / 07</span></span>
              <span className="pager-name">{LAYERS[active].name}</span>
              <span className="pager-caret" aria-hidden="true">▾</span>
            </button>
            <button type="button" className="pager-arrow" onClick={goNext} disabled={active === LAYERS.length - 1} aria-label="Next layer">›</button>
          </div>

          {/* Bottom sheet — opens on pager pill tap (mobile only via CSS) */}
          {sheetOpen && (
            <div className="stack-sheet" role="dialog" aria-label="Choose a layer" onClick={() => setSheetOpen(false)}>
              <div className="sheet-card" onClick={(e) => e.stopPropagation()}>
                <div className="sheet-handle" aria-hidden="true"></div>
                <div className="sheet-eyebrow">Jump to a layer</div>
                <div className="sheet-list">
                  {LAYERS.map((l, i) => (
                    <button
                      key={l.name}
                      type="button"
                      onClick={() => openLayer(i)}
                      className={`sheet-row ${i === active ? 'is-active' : ''}`}
                    >
                      <span className="sheet-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="sheet-name">{l.name}</span>
                      <span className="sheet-title">{l.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="stack-defs">
            {LAYERS.map((l, i) => (
              <div
                key={l.name}
                ref={(el) => (defRefs.current[i] = el)}
                className={`stack-def ${i === active ? 'is-active' : ''}`}
              >
                <div className="def-num">Layer {String(i + 1).padStart(2, '0')} · {l.name}</div>
                <h3 className="def-title">{l.title}</h3>
                <p className="def-body">{l.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Connecting thread — vertical 1px gradient line into the pearl */}
        <div className="stack-thread" aria-hidden="true">
          <span className="thread-line"></span>
          <span className="thread-pearl">
            <span className="pearl-glow"></span>
            <span className="pearl-core"></span>
          </span>
        </div>

        {/* Ethereal Capstone — frosted glass resting place that ends the section */}
        <div className="capstone-bridge" aria-hidden="true"></div>
        <Reveal>
          <div className="ethereal-capstone">
            <div className="capstone-aurora" aria-hidden="true"></div>
            <p className="capstone-science">
              <span className="cs-mark" aria-hidden="true"></span>
              Draws from <em>ACT</em> &amp; <em>CBT</em> — without rigidity. Fluid &amp; nuanced.
            </p>
            <p className="capstone-vision">
              Built in pursuit of <span className="vision-grad">human-aligned AGI</span> that improves alongside the people using it.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function OutcomesSandbox() {
  const OUTCOMES = [
    { id: "built-around-you",  title: "Apps built exactly around you",      sub: "No templates. No setup. No compromises. It exists only for what you need.",                w: 280, h: 130, mood: "longevity" },
    { id: "respect-attention", title: "Tools that respect your attention",  sub: "No dark patterns. No addictive loops. Nothing designed to keep you hooked.",              w: 300, h: 120, mood: "autonomy"  },
    { id: "compounds",         title: "Progress compounds, never resets",   sub: "You stop starting over. Traded a shovel for a flywheel. What you learn stays.",          w: 290, h: 140, mood: "longevity" },
    { id: "models",            title: "Mental models, built implicitly",    sub: "You don't just get things done. The way of thinking starts to stick.",                   w: 310, h: 120, mood: "longevity" },
    { id: "less-overhead",     title: "Less cognitive overhead",            sub: "Less to keep track of. Less to hold together. Think about what matters, not how to manage it.", w: 270, h: 130, mood: "efficiency" },
    { id: "intent",            title: "Action connected to intent",         sub: "Not just getting things done. Doing things that actually make sense.",                   w: 280, h: 120, mood: "autonomy"  },
    { id: "survives-change",   title: "Systems that survive change",        sub: "Things don't fall apart when life shifts. They adjust, without needing a rebuild.",      w: 290, h: 130, mood: "longevity" },
    { id: "breathe",           title: "Apps that breathe together",         sub: "No switching. No stitching things together. Everything stays connected by default.",     w: 290, h: 130, mood: "efficiency" }
  ];

  const VERDICTS = {
    longevity:  { label: "Longevity",  line: "You're building for the long arc.",            tint: "#E5A24E" },
    efficiency: { label: "Efficiency", line: "You're building for clarity and signal.",      tint: "#5BC6A0" },
    autonomy:   { label: "Autonomy",   line: "You're building for sovereignty over your tools.", tint: "#9E89C9" }
  };

  const stageRef = useRef(null);
  const pillRefs = useRef({});           // id -> dom node
  const positionsRef = useRef({});       // id -> {x, y, vx, vy}
  const placedRef = useRef(new Set());
  const draggingRef = useRef(null);      // id currently dragging
  const coreRef = useRef(null);
  const [coreItems, setCoreItems] = useState([]);
  const [verdict, setVerdict] = useState(null);
  const [merging, setMerging] = useState(false);
  const [coreHover, setCoreHover] = useState(false);
  const [stageReady, setStageReady] = useState(false);

  // Seed positions once on mount
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const seed = () => {
      const r = stage.getBoundingClientRect();
      if (r.width < 50) return false;
      const cx = r.width / 2, cy = r.height / 2;
      const radius = Math.min(r.width, r.height) * 0.34;
      OUTCOMES.forEach((o, i) => {
        const a = (i / OUTCOMES.length) * Math.PI * 2 - Math.PI / 2;
        const rr = radius + (i % 2 === 0 ? 0 : 30);
        const x = cx + Math.cos(a) * rr - o.w / 2;
        const y = cy + Math.sin(a) * rr - o.h / 2;
        positionsRef.current[o.id] = {
          x, y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4
        };
        const node = pillRefs.current[o.id];
        if (node) node.style.transform = `translate(${x}px, ${y}px)`;
      });
      return true;
    };
    if (!seed()) {
      const t = setTimeout(seed, 50);
      return () => clearTimeout(t);
    }
    setStageReady(true);
  }, []);

  // Physics drift loop — DOM-direct, no React state
  useEffect(() => {
    let raf;
    const CORE_R = 88;
    const step = () => {
      const stage = stageRef.current;
      if (!stage) { raf = requestAnimationFrame(step); return; }
      const r = stage.getBoundingClientRect();
      const W = r.width, H = r.height;
      const cx = W / 2, cy = H / 2;
      const positions = positionsRef.current;
      const ids = OUTCOMES.map(o => o.id);

      for (const o of OUTCOMES) {
        const id = o.id;
        if (placedRef.current.has(id)) continue;
        if (draggingRef.current === id) continue;
        const p = positions[id];
        if (!p) continue;
        // ambient drift
        p.vx += (Math.random() - 0.5) * 0.012;
        p.vy += (Math.random() - 0.5) * 0.012;
        p.vx *= 0.985; p.vy *= 0.985;
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > 0.6) { p.vx = p.vx / sp * 0.6; p.vy = p.vy / sp * 0.6; }
        p.x += p.vx; p.y += p.vy;
        // bounds
        const pad = 8;
        if (p.x < pad) { p.x = pad; p.vx = Math.abs(p.vx) * 0.6; }
        if (p.y < pad) { p.y = pad; p.vy = Math.abs(p.vy) * 0.6; }
        if (p.x + o.w > W - pad) { p.x = W - pad - o.w; p.vx = -Math.abs(p.vx) * 0.6; }
        if (p.y + o.h > H - pad) { p.y = H - pad - o.h; p.vy = -Math.abs(p.vy) * 0.6; }
        // core repel
        const ccx = p.x + o.w / 2, ccy = p.y + o.h / 2;
        const ddx = ccx - cx, ddy = ccy - cy;
        const d = Math.hypot(ddx, ddy);
        const minD = CORE_R + Math.min(o.w, o.h) / 2 + 14;
        if (d < minD && d > 0.01) {
          const f = (minD - d) / minD * 0.8;
          p.x += ddx / d * f;
          p.y += ddy / d * f;
          p.vx += ddx / d * 0.04;
          p.vy += ddy / d * 0.04;
        }
      }

      // separation
      for (let i = 0; i < ids.length; i++) {
        if (placedRef.current.has(ids[i]) || draggingRef.current === ids[i]) continue;
        const oa = OUTCOMES[i], pa = positions[ids[i]]; if (!pa) continue;
        const acx = pa.x + oa.w / 2, acy = pa.y + oa.h / 2;
        for (let j = i + 1; j < ids.length; j++) {
          if (placedRef.current.has(ids[j])) continue;
          const ob = OUTCOMES[j], pb = positions[ids[j]]; if (!pb) continue;
          const bcx = pb.x + ob.w / 2, bcy = pb.y + ob.h / 2;
          const dx = bcx - acx, dy = bcy - acy;
          const dist = Math.hypot(dx, dy);
          const minDist = (oa.w + ob.w) / 2 * 0.7;
          if (dist < minDist && dist > 0.01) {
            const push = (minDist - dist) / minDist * 0.5;
            const nx = dx / dist, ny = dy / dist;
            if (draggingRef.current !== ids[i]) { pa.x -= nx * push; pa.y -= ny * push; }
            if (draggingRef.current !== ids[j]) { pb.x += nx * push; pb.y += ny * push; }
          }
        }
      }

      // write transforms
      for (const o of OUTCOMES) {
        if (placedRef.current.has(o.id)) continue;
        const node = pillRefs.current[o.id];
        const p = positions[o.id];
        if (node && p) {
          const scale = draggingRef.current === o.id ? 1.04 : 1;
          node.style.transform = `translate(${p.x}px, ${p.y}px) scale(${scale})`;
        }
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Wire up Interact.js draggable on each pill
  useEffect(() => {
    if (!stageReady || typeof interact === 'undefined') return;
    const cleanups = [];
    OUTCOMES.forEach(o => {
      const node = pillRefs.current[o.id];
      if (!node) return;
      const inst = interact(node).draggable({
        inertia: false,
        autoScroll: false,
        listeners: {
          start(event) {
            if (placedRef.current.has(o.id) || verdictRef.current) {
              event.interaction.stop();
              return;
            }
            draggingRef.current = o.id;
            node.classList.add('is-dragging');
            node.style.zIndex = 30;
            const p = positionsRef.current[o.id];
            if (p) { p.vx = 0; p.vy = 0; }
          },
          move(event) {
            const p = positionsRef.current[o.id];
            if (!p) return;
            const stage = stageRef.current.getBoundingClientRect();
            p.x = Math.max(0, Math.min(stage.width - o.w, p.x + event.dx));
            p.y = Math.max(0, Math.min(stage.height - o.h, p.y + event.dy));
            node.style.transform = `translate(${p.x}px, ${p.y}px) scale(1.04)`;
            // core hover detection
            const cx = stage.width / 2, cy = stage.height / 2;
            const ccx = p.x + o.w / 2, ccy = p.y + o.h / 2;
            const over = Math.hypot(ccx - cx, ccy - cy) < 110;
            if (coreRef.current) {
              coreRef.current.classList.toggle('is-hover', over);
            }
          },
          end(event) {
            draggingRef.current = null;
            node.classList.remove('is-dragging');
            node.style.zIndex = '';
            const p = positionsRef.current[o.id];
            if (!p) return;
            const stage = stageRef.current.getBoundingClientRect();
            const cx = stage.width / 2, cy = stage.height / 2;
            const ccx = p.x + o.w / 2, ccy = p.y + o.h / 2;
            const over = Math.hypot(ccx - cx, ccy - cy) < 110;
            if (coreRef.current) coreRef.current.classList.remove('is-hover');
            if (over && coreItemsRef.current.length < 3 && !placedRef.current.has(o.id)) {
              placedRef.current.add(o.id);
              // animate into core
              node.style.transition = 'transform .9s cubic-bezier(.6,.05,.2,1), opacity .9s ease';
              node.style.transform = `translate(${cx - o.w / 2}px, ${cy - o.h / 2}px) scale(0.2)`;
              node.style.opacity = '0';
              node.style.pointerEvents = 'none';
              const newCore = [...coreItemsRef.current, o.id];
              setCoreItems(newCore);
              if (newCore.length === 3) {
                const moods = newCore.map(id => OUTCOMES.find(x => x.id === id).mood);
                const tally = moods.reduce((acc, m) => (acc[m] = (acc[m] || 0) + 1, acc), {});
                const winner = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
                setTimeout(() => setMerging(true), 200);
                setTimeout(() => setVerdict(winner), 1100);
              }
            } else {
              p.vx = (Math.random() - 0.5) * 0.3;
              p.vy = (Math.random() - 0.5) * 0.3;
            }
          }
        }
      });
      cleanups.push(() => inst.unset());
    });
    return () => cleanups.forEach(fn => fn());
  }, [stageReady]);

  // Refs that handlers read live
  const coreItemsRef = useRef(coreItems); coreItemsRef.current = coreItems;
  const verdictRef = useRef(verdict); verdictRef.current = verdict;

  const reset = () => {
    setVerdict(null); setMerging(false); setCoreItems([]);
    placedRef.current = new Set();
    OUTCOMES.forEach(o => {
      const node = pillRefs.current[o.id];
      if (node) {
        node.style.transition = '';
        node.style.opacity = '';
        node.style.pointerEvents = '';
      }
    });
    // re-seed
    const stage = stageRef.current;
    if (stage) {
      const r = stage.getBoundingClientRect();
      const cx = r.width / 2, cy = r.height / 2;
      const radius = Math.min(r.width, r.height) * 0.34;
      OUTCOMES.forEach((o, i) => {
        const a = (i / OUTCOMES.length) * Math.PI * 2 - Math.PI / 2;
        const rr = radius + (i % 2 === 0 ? 0 : 30);
        positionsRef.current[o.id] = {
          x: cx + Math.cos(a) * rr - o.w / 2,
          y: cy + Math.sin(a) * rr - o.h / 2,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4
        };
      });
    }
  };

  return (
    <section className="block sandbox-section" data-screen-label="04 Outcomes" style={{ position: "relative" }}>
      <div className="sandbox-bg"></div>
      <div className="wrap">
        <div className="stack-sticky-head">
          <Reveal><div className="sec-eyebrow">// what comes out the other side</div></Reveal>
          <Reveal delay={100}>
            <h2 className="display sec-h stack-sec-h">
              Eight outcomes that don't sit on a slide — they <em>drift, cluster, become yours.</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="sandbox-lede">
              These aren't bullet points. Grab them. Move them. Drop the three that matter most into the Core to find your <strong>mode</strong>.
            </p>
          </Reveal>
        </div>

        <div className="sandbox-stage" ref={stageRef}>
          <div className="sandbox-grid" aria-hidden="true"></div>

          <div ref={coreRef}
               className={`sandbox-core ${verdict ? "is-revealed" : ""} ${merging ? "is-merging" : ""}`}
               style={{ left: '50%', top: '50%' }}>
            <div className="core-aura" aria-hidden="true"></div>
            <div className="core-ring" aria-hidden="true"></div>
            {!verdict ? (
              <div className="core-label">
                <div className="core-pre">{coreItems.length === 0 ? "Drop your priority here" : `${coreItems.length} of 3`}</div>
                <div className="core-dots">
                  {[0,1,2].map(i => <span key={i} className={`core-dot ${i < coreItems.length ? "is-on" : ""}`}></span>)}
                </div>
              </div>
            ) : (
              <div className="core-verdict" style={{ "--tint": VERDICTS[verdict].tint }}>
                <div className="verdict-eyebrow">// your mode</div>
                <div className="verdict-title">{VERDICTS[verdict].label}</div>
                <div className="verdict-line">{VERDICTS[verdict].line}</div>
                <div className="verdict-cta">
                  <button type="button" className="verdict-reset" onClick={reset}>↺ rearrange</button>
                </div>
              </div>
            )}
          </div>

          {OUTCOMES.map(o => (
            <div
              key={o.id}
              ref={el => { if (el) pillRefs.current[o.id] = el; }}
              className="sandbox-pill"
              style={{ width: o.w, height: o.h, transform: 'translate(-9999px,-9999px)' }}
            >
              <div className="pill-iridescence" aria-hidden="true"></div>
              <div className="pill-title">{o.title}</div>
              <div className="pill-sub">{o.sub}</div>
              <div className="pill-grip" aria-hidden="true"><span></span><span></span></div>
            </div>
          ))}
        </div>

        <a href="#quiz" className="findmode-cta" onClick={(e) => { e.preventDefault(); window.location.hash = "quiz"; }}>
          <div className="findmode-aurora" aria-hidden="true"></div>
          <div className="findmode-left">
            <div className="findmode-eyebrow">// 60-second vibe check</div>
            <div className="findmode-title">Find your mode</div>
            <div className="findmode-sub">Stop adapting to the machine. See the exact reasoning stack Oriflow would build for your mind.</div>
          </div>
          <div className="findmode-right">
            <span className="findmode-btn">
              Start the quiz
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}

function ProductFAQ() {
  const FAQS = [
    { q: "What is Oriflow?", a: "Oriflow is a platform where you can create personal apps for growth, clarity, and everyday life using natural language. Instead of forcing yourself into rigid systems, Oriflow helps you build tools that adapt to how you think, work, learn, and live." },
    { q: "Why does Oriflow feel different from other productivity tools?", a: "Most tools expect you to adapt to them. Oriflow adapts to you. It understands context across your apps, adjusts when life changes, and helps you move forward without starting over every time your routines break." },
    { q: "Do I need to know what app I want to build?", a: "No. You can simply describe what you are struggling with, trying to improve, or hoping to achieve. Oriflow helps figure out the right structure, workflow, or system and builds an app around it." },
    { q: "What kinds of problems can Oriflow help with, even if I don't know the right system or method for my problem?", a: "Anything from feeling overwhelmed and inconsistent to building better routines, learning faster, planning life goals, managing focus, tracking goals, or creating more balance in daily life. You do not need to know the framework or method beforehand. Oriflow helps discover what works for you." },
    { q: "Can Oriflow adapt when my routines or priorities change?", a: "Yes. Life changes constantly, and Oriflow is designed for that reality. Your apps can adjust as your goals, energy, schedules, or priorities shift so you can keep moving without rebuilding everything from scratch." },
    { q: "What kinds of apps can I create?", a: "You can create apps for planning, focus, learning, habits, journaling, task management, personal growth, health, career goals, creativity, reflection, and more. Each app is personalized around your needs instead of being a one size fits all template." },
    { q: "How do I create an app in Oriflow?", a: "Just describe what you need in natural language. You can talk about a problem, a goal, a habit, a challenge, or even a messy situation. Oriflow will help shape it into a working app with the right structure and flow." },
    { q: "Why does Oriflow separate things into multiple apps instead of one big dashboard?", a: "Different parts of life need different spaces. Separate apps make it easier to focus on what matters right now without overwhelming you with everything at once. Your apps still stay connected behind the scenes to keep your life in sync, but show to you only what is relevant to you at the moment by this separation." },
    { q: "How many apps can I create right now?", a: "During the current alpha, you can have up to 5 active apps at a time and create up to 30 apps every month. The limit is intentional. Most people benefit more from a few focused, evolving systems rather than managing dozens of fragmented tools at once." },
    { q: "Will there be paid plans in the future?", a: "Oriflow is currently in early alpha and free to try within the current limits. As the platform evolves, we may introduce additional plans, features, and capabilities over time." }
  ];

  return (
    <section className="block product-faq" id="product-faq" data-screen-label="05 Product FAQ" style={{ position: "relative" }}>
      <div className="wrap">
        <div className="stack-sticky-head">
          <Reveal><div className="sec-eyebrow">// the questions you'd actually ask</div></Reveal>
          <Reveal delay={100}>
            <h2 className="display sec-h stack-sec-h">
              Things people ask before they <em>build their first app.</em>
            </h2>
          </Reveal>
        </div>

        <div className="pfaq-list">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 40}>
              <details className="faq pfaq-item">
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

function Practice() {
  return (
    <section className="block" id="practice" data-screen-label="03 Practice" style={{ position: "relative" }}>
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
              {SESSIONS.map((s, i) =>
              <div className={`session ${s.tone}`} key={i}>
                  <div className="glyph">{s.glyph}</div>
                  <div>
                    <div className="title">{s.title}</div>
                    <div className="meta">{s.meta}</div>
                  </div>
                  <div className="dur">{s.dur}</div>
                  <div className="play">▶</div>
                </div>
              )}
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
    </section>);

}

function Manifesto() {
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
    </section>);

}

function FAQ() {
  return (
    <section className="block" id="faq" data-screen-label="05 FAQ">
      <div className="wrap">
        <Reveal><div className="sec-eyebrow" style={{ textAlign: "center" }}>// the things you'd actually ask</div></Reveal>
        <Reveal delay={100}>
          <h2 className="display sec-h" style={{ textAlign: "center", margin: "0 auto 56px" }}>Yes, but <em>really though.</em></h2>
        </Reveal>
        <div className="faq-wrap">
          {FAQS.map((f, i) =>
          <Reveal key={i} delay={i * 60}>
              <details className="faq">
                <summary>{f.q}</summary>
                <div className="ans">{f.a}</div>
              </details>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}

function FinalCTA() {
  return (
    <section className="final-cta" data-screen-label="06 CTA">
      <div className="final-bg"></div>
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
    </section>);

}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-aurora" aria-hidden="true"></div>
      <div className="wrap footer-inner">

        {/* Wordmark, prominent */}
        <div className="footer-mark">
          <span className="footer-mark-dot"></span>
          <span className="footer-mark-word">Oriflow</span>
        </div>

        {/* Closing whisper — display-style, prominent */}
        <h2 className="display footer-display">
          A slower kind of intelligence,<br />made for <em>the long shape of a life.</em>
        </h2>

        {/* Quiet links */}
        <nav className="footer-nav" aria-label="Footer">
          <a href="#">Philosophy</a>
          <span className="footer-dot" aria-hidden="true"></span>
          <a href="#">Charter</a>
          <span className="footer-dot" aria-hidden="true"></span>
          <a href="#">Privacy</a>
          <span className="footer-dot" aria-hidden="true"></span>
          <a href="#">Press</a>
          <span className="footer-dot" aria-hidden="true"></span>
          <a href="#">Careers</a>
        </nav>

        {/* Reach line */}
        <a href="mailto:hi@oriflow.app" className="footer-reach">
          <span className="reach-label">write to us —</span>
          <span className="reach-addr">hi@oriflow.app</span>
        </a>

        {/* Base */}
        <div className="footer-base">
          <span>© 2026 Oriflow</span>
          <span className="footer-base-sep" aria-hidden="true">·</span>
          <span className="footer-base-italic">Made slowly, in pursuit of human-aligned systems.</span>
        </div>
      </div>
    </footer>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);