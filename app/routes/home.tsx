import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import { Link } from "react-router";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileSearch, Zap, Target, ShieldCheck, ArrowRight, CheckCircle2, TrendingUp, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind | Smart ATS Resume Checker" },
    { name: "description", content: "Optimize your resume for ATS systems and get hired faster." },
  ];
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero badge
      gsap.fromTo(".hero-badge",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.3 }
      );

      // Hero Text lines
      gsap.fromTo(".hero-line",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.18, ease: "power4.out", delay: 0.6 }
      );

      // Hero subtitle + CTA
      gsap.fromTo(".hero-sub",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out", delay: 1.1 }
      );

      // Floating cards staggered entrance
      gsap.fromTo(".float-card",
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.12, ease: "power3.out", delay: 0.9 }
      );

      // Floating cards parallax scroll
      gsap.utils.toArray<HTMLElement>(".float-card").forEach((card, i) => {
        gsap.to(card, {
          y: -40 + i * 10,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          }
        });
      });

      // Scroll reveal sections
      gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
        gsap.fromTo(section,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
            }
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-[#FAFAFC] min-h-screen relative selection:bg-[#8e98ff]/30 overflow-x-hidden">
      <Navbar />

      {/* Decorative background blurs */}
      <div className="fixed top-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-b from-[#8e98ff]/10 to-[#606beb]/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/4 -z-10" />
      <div className="fixed top-[40vh] left-0 w-[40vw] h-[40vw] bg-[#8e98ff]/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -z-10" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-44 pb-32 px-6 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="max-w-[1000px] w-full z-10 flex flex-col items-center text-center">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full text-sm font-semibold text-[#606beb] tracking-wide mb-8 opacity-0">
            <Zap size={16} className="fill-[#8e98ff]" />
            <span>AI-Powered ATS Checker</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-[-0.04em] leading-[1.05] text-gray-900 mb-8 overflow-hidden">
            <span className="hero-line block origin-bottom opacity-0">Optimize Your Resume.</span>
            <span className="hero-line block origin-bottom text-transparent bg-clip-text bg-gradient-to-r from-[#8e98ff] to-[#606beb] opacity-0">Beat the ATS.</span>
          </h1>

          <p className="hero-sub max-w-2xl text-xl md:text-2xl text-gray-500 font-medium mb-12 opacity-0">
            Get instant AI feedback, keyword targeting, and formatting checks to ensure your resume gets past the bots and into human hands.
          </p>

          <div className="hero-sub flex flex-col sm:flex-row items-center gap-4 opacity-0">
            <Link to="/upload" className="primary-gradient text-white px-10 py-5 rounded-[2rem] text-lg font-bold hover:shadow-[0_12px_40px_rgba(142,152,255,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
              Upload Resume <ArrowRight size={20} />
            </Link>
            <Link to="/about" className="px-10 py-5 rounded-[2rem] text-lg font-bold text-gray-700 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 hover:bg-gray-50 transition-all duration-300">
              How it works
            </Link>
          </div>
        </div>

        {/* Abstract Floating UI Elements — 6 total */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
          {/* Card 1 — Resume skeleton (left) */}
          <div className="float-card absolute top-[28%] left-[7%] glass-panel p-4 rotate-[-10deg] shadow-xl w-56 opacity-0">
            <div className="flex justify-between items-center mb-3">
              <div className="h-2 w-16 bg-gray-200 rounded-full" />
              <div className="w-5 h-5 rounded-full border-2 border-white bg-green-400" />
            </div>
            <div className="h-12 w-full bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg mb-2" />
            <div className="h-3 w-3/4 bg-gray-100 rounded-full" />
          </div>

          {/* Card 2 — ATS Score (right) */}
          <div className="float-card absolute top-[22%] right-[8%] glass-panel p-5 rotate-[8deg] shadow-xl w-72 opacity-0">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-[#8e98ff] font-bold text-4xl">92</div>
              <div className="flex flex-col">
                <div className="text-sm font-bold text-gray-800">ATS Score</div>
                <div className="text-xs text-green-500 font-medium">Excellent Match</div>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#8e98ff] to-[#606beb] w-[92%]" />
            </div>
          </div>

          {/* Card 3 — Keywords (bottom left) */}
          <div className="float-card absolute top-[62%] left-[12%] glass-panel p-4 rotate-[6deg] shadow-lg w-52 opacity-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Top Keywords</p>
            <div className="flex flex-wrap gap-1.5">
              {["React", "TypeScript", "Node.js"].map(k => (
                <span key={k} className="px-2 py-0.5 bg-[#8e98ff]/10 text-[#606beb] text-xs font-medium rounded-full border border-[#8e98ff]/20">{k}</span>
              ))}
            </div>
          </div>

          {/* Card 4 — Quick Wins (bottom right) */}
          <div className="float-card absolute top-[60%] right-[10%] glass-panel p-4 rotate-[-6deg] shadow-lg w-60 opacity-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Wins</p>
            <div className="flex flex-col gap-2">
              {["Add metrics to experience", "Include summary section"].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                  <p className="text-xs text-gray-600 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 5 — Interview Rate stat (upper center-left) */}
          <div className="float-card absolute top-[15%] left-[30%] glass-panel p-3 rotate-[-4deg] shadow-md w-40 opacity-0">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-[#10B981]" />
              <div>
                <p className="text-xs text-gray-500">Interview Rate</p>
                <p className="text-lg font-bold text-gray-900">+42%</p>
              </div>
            </div>
          </div>

          {/* Card 6 — Sections scanned (upper center-right) */}
          <div className="float-card absolute top-[16%] right-[26%] glass-panel p-3 rotate-[5deg] shadow-md w-44 opacity-0">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-[#8e98ff]" />
              <div>
                <p className="text-xs text-gray-500">Sections Scanned</p>
                <p className="text-lg font-bold text-gray-900">6 / 6</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Stats Section */}
      <section className="reveal-section py-16 border-y border-white/50 bg-white/30 backdrop-blur-sm opacity-0">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-around items-center gap-8 text-center text-gray-600 font-medium">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-gray-900 tracking-tight">50k+</span>
            <span className="text-sm uppercase tracking-widest text-[#8e98ff] mt-1">Resumes Analyzed</span>
          </div>
          <div className="w-px h-12 bg-gray-200 hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-gray-900 tracking-tight">85%</span>
            <span className="text-sm uppercase tracking-widest text-[#8e98ff] mt-1">Interview Rate</span>
          </div>
          <div className="w-px h-12 bg-gray-200 hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-gray-900 tracking-tight">2.5s</span>
            <span className="text-sm uppercase tracking-widest text-[#8e98ff] mt-1">Avg. Analysis Time</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="reveal-section py-32 px-6 opacity-0">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Built for Modern Job Seekers</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Everything you need to perfect your resume and increase your chances of landing that dream role.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 group">
              <div className="w-14 h-14 bg-[#8e98ff]/10 rounded-2xl flex items-center justify-center text-[#8e98ff] mb-6 group-hover:scale-110 group-hover:bg-[#8e98ff] group-hover:text-white transition-all duration-300">
                <FileSearch size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Smart ATS Parsing</h3>
              <p className="text-gray-500 leading-relaxed">Our AI mimics enterprise ATS software to see exactly how your resume will be parsed by recruiters.</p>
            </div>
            <div className="glass-card p-8 group">
              <div className="w-14 h-14 bg-[#8e98ff]/10 rounded-2xl flex items-center justify-center text-[#8e98ff] mb-6 group-hover:scale-110 group-hover:bg-[#8e98ff] group-hover:text-white transition-all duration-300">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Keyword Targeting</h3>
              <p className="text-gray-500 leading-relaxed">Compare your resume against any job description to find missing keywords and boost your match rate.</p>
            </div>
            <div className="glass-card p-8 group">
              <div className="w-14 h-14 bg-[#8e98ff]/10 rounded-2xl flex items-center justify-center text-[#8e98ff] mb-6 group-hover:scale-110 group-hover:bg-[#8e98ff] group-hover:text-white transition-all duration-300">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Format Checking</h3>
              <p className="text-gray-500 leading-relaxed">Ensure your resume doesn't get rejected for bad formatting, unreadable fonts, or strange layouts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="reveal-section py-32 px-6 relative overflow-hidden opacity-0">
        <div className="absolute inset-0 bg-[#8e98ff]/5 skew-y-[-2deg] origin-top-left -z-10" />
        <div className="max-w-4xl mx-auto text-center glass-panel p-16 border-[#8e98ff]/20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Ready to get hired?</h2>
          <Link to="/upload" className="primary-gradient text-white px-12 py-6 rounded-[2rem] text-xl font-bold inline-flex items-center gap-4 hover:scale-105 transition-transform duration-300 shadow-xl">
            Check Your Score Now <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
}
