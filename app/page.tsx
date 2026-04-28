import Receipts from "./components/Receipts";
import Features from "./components/Features";
import Practice from "./components/Practice";
import Manifesto from "./components/Manifesto";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import HeroCTAButton from "./components/HeroCTAButton";

export default function Home() {
  return (
    <div className="font-sans">
      {/* Sky gradient wraps nav + hero */}
      <div className="relative min-h-screen overflow-hidden">
        <div className="sky" />

        {/* z-10 lifts content above the absolutely-positioned sky (z-index: 0) */}
        <div className="relative z-10">
          <Nav />

          {/* Hero */}
          <section className="flex flex-col lg:flex-row gap-8 lg:gap-0 px-8 lg:px-16 pt-6 pb-20 max-w-[1400px] mx-auto">
            {/* Left column */}
            <div className="flex-1 lg:max-w-[520px] lg:pt-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 bg-white/70 rounded-full px-4 py-2 mb-8 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-coral flex-shrink-0" />
                <span className="text-sm font-semibold text-gray-800">
                  wellness, but make it honest
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-[72px] xl:text-[82px] font-black leading-[0.93] tracking-tight text-gray-900 mb-7">
                Stop fixing
                <br />
                yourself.
                <br />
                Start{" "}
                <span
                  className="italic text-coral"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  listening.
                </span>
              </h1>

              {/* Body */}
              <p className="text-[17px] leading-[1.7] text-gray-700 mb-9 max-w-[440px]">
                Oriflow isn&apos;t another app that promises a &apos;better you&apos;
                in 7 days. It&apos;s a quiet space to talk to yourself, properly —
                without affirmations, gurus, or guilt.
              </p>

              {/* CTAs */}
              <div className="flex items-center gap-7 mb-5">
                <HeroCTAButton />
                <a
                  href="#"
                  className="text-gray-800 font-semibold text-base hover:text-gray-600 transition-colors"
                >
                  How it works
                </a>
              </div>

              {/* Fine print */}
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <div className="w-5 h-px bg-gray-400" />
                <span>Free forever tier · No credit card · No streak shame</span>
              </div>
            </div>

            {/* Right column — Chat UI */}
            <div className="flex-1 flex flex-col lg:pl-12 max-w-[560px] lg:max-w-none">
              {/* Handwritten annotation */}
              <p
                className="text-coral leading-snug self-end text-right mb-3 lg:mb-1 lg:-mt-1"
                style={{
                  fontFamily: "var(--font-caveat)",
                  fontSize: "22px",
                }}
              >
                no fake &ldquo;you got this!&rdquo;
                <br />
                just real questions →
              </p>

              {/* Chat bubbles */}
              <div className="flex flex-col gap-3 w-full">
                <div className="bg-[#F0B89C] rounded-2xl px-4 py-3.5 max-w-[300px] shadow-sm">
                  <p className="text-[10px] font-bold tracking-[0.14em] text-orange-900/50 mb-1.5 uppercase">
                    You
                  </p>
                  <p className="text-gray-900 font-medium text-[15px]">
                    I&apos;m fine. It was fine. The day was fine.
                  </p>
                </div>

                <div className="bg-[#C9C3E0] rounded-2xl px-4 py-3.5 max-w-[300px] shadow-sm self-end ml-auto">
                  <p className="text-[10px] font-bold tracking-[0.14em] text-purple-900/40 mb-1.5 uppercase">
                    Also you
                  </p>
                  <p className="text-gray-900 font-medium text-[15px]">
                    Three &ldquo;fines&rdquo; in a row. Pick one.
                  </p>
                </div>

                <div className="bg-[#F0B89C] rounded-2xl px-4 py-3.5 max-w-[300px] shadow-sm">
                  <p className="text-[10px] font-bold tracking-[0.14em] text-orange-900/50 mb-1.5 uppercase">
                    You
                  </p>
                  <p className="text-gray-900 font-medium text-[15px]">
                    Okay — tired. And a bit invisible.
                  </p>
                </div>

                <div className="bg-white rounded-2xl px-4 py-3.5 max-w-[360px] shadow-md self-end ml-auto">
                  <p className="text-[10px] font-bold tracking-[0.14em] text-gray-400 mb-1.5 uppercase">
                    Oriflow
                  </p>
                  <p className="text-gray-900 font-medium text-[15px]">
                    Good. Now we have something real to sit with. Want to stay here
                    for two minutes?
                  </p>
                </div>

                <div className="bg-[#F0B89C] rounded-2xl px-4 py-3.5 max-w-[230px] shadow-sm">
                  <p className="text-[10px] font-bold tracking-[0.14em] text-orange-900/50 mb-1.5 uppercase">
                    You
                  </p>
                  <p className="text-gray-900 font-medium text-[15px]">
                    Yeah. Two minutes.
                  </p>
                </div>

                {/* Typing indicator */}
                <div className="bg-white rounded-2xl px-4 py-3.5 shadow-md self-end flex items-center justify-center gap-1.5 w-[72px]">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "160ms" }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "320ms" }} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Receipts />
      <Features />
      <Practice />
      <Manifesto />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
