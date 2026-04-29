import Receipts from "./components/Receipts";
import Features from "./components/Features";
import Practice from "./components/Practice";
import Manifesto from "./components/Manifesto";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <div className="font-sans">
      {/* Sky gradient wraps nav + hero */}
      <div className="relative min-h-screen overflow-hidden">
        <div className="sky" />

        {/* z-10 lifts content above the absolutely-positioned sky (z-index: 0) */}
        <div className="relative z-10">
          <Nav />
          <HeroSection />
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
