import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import { Link } from "react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileSearch, Zap, Target, ShieldCheck, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind | Smart ATS Resume Checker" },
    { name: "description", content: "Optimize your resume for ATS systems and get hired faster." },
  ];
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero Title Animation
    if (titleRef.current) {
      gsap.fromTo(titleRef.current.children, 
        { y: 100, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.2, ease: "power4.out", delay: 0.5 }
      );
    }

    // Floating Cards Parallax
    if (cardsRef.current) {
      gsap.to(cardsRef.current.children, {
        y: (i) => -50 + i * 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });
    }

    // Scroll reveal for sections
    gsap.utils.toArray('.reveal-section').forEach((section: any) => {
      gsap.fromTo(section,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: {
          trigger: section,
          start: "top 80%",
        }}
      )
    });

  }, []);

  return (
    <main className="bg-[#FAFAFC] min-h-screen relative selection:bg-[#8e98ff]/30">
      <Navbar />

      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-b from-[#8e98ff]/10 to-[#606beb]/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute top-[40vh] left-0 w-[40vw] h-[40vw] bg-[#8e98ff]/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-40 pb-32 px-6 flex flex-col items-center justify-center min-h-[90vh] overflow-hidden">
        <div className="max-w-[1000px] w-full z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full text-sm font-semibold text-[#606beb] tracking-wide mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Zap size={16} className="fill-[#8e98ff]" />
            <span>AI-Powered ATS Checker</span>
          </div>
          
          <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold tracking-[-0.04em] leading-[1.05] text-gray-900 mb-8" style={{ perspective: '1000px' }}>
            <span className="block origin-bottom">Optimize Your Resume.</span>
            <span className="block origin-bottom text-transparent bg-clip-text bg-gradient-to-r from-[#8e98ff] to-[#606beb]">Beat the ATS.</span>
          </h1>
          
          <p className="max-w-2xl text-xl md:text-2xl text-gray-500 font-medium mb-12 opacity-0 animate-in fade-in slide-in-from-bottom-6 transition-all duration-1000 delay-700 fill-mode-forwards">
            Get instant AI feedback, keyword targeting, and formatting checks to ensure your resume gets past the bots and into human hands.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000 fill-mode-forwards">
            <Link to="/upload" className="primary-gradient text-white px-10 py-5 rounded-[2rem] text-lg font-bold hover:shadow-[0_12px_40px_rgba(142,152,255,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
              Upload Resume <ArrowRight size={20} />
            </Link>
            <Link to="/about" className="px-10 py-5 rounded-[2rem] text-lg font-bold text-gray-700 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 hover:bg-gray-50 transition-all duration-300">
              How it works
            </Link>
          </div>
        </div>

        {/* Abstract Floating UI Elements */}
        <div ref={cardsRef} className="absolute inset-0 pointer-events-none z-0 hidden lg:block perspective-[1000px]">
          <div className="absolute top-[30%] left-[10%] glass-panel p-4 rotate-[-12deg] shadow-xl w-64 opacity-80">
            <div className="flex justify-between items-center mb-4">
              <div className="h-2 w-16 bg-gray-200 rounded-full" />
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full border-2 border-white bg-green-400" />
              </div>
            </div>
            <div className="h-16 w-full bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg mb-2" />
            <div className="h-4 w-3/4 bg-gray-100 rounded-full" />
          </div>

          <div className="absolute top-[25%] right-[10%] glass-panel p-5 rotate-[8deg] shadow-xl w-72 opacity-90 border-[#8e98ff]/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-[#8e98ff] font-bold text-4xl">92</div>
              <div className="flex flex-col">
                <div className="text-sm font-bold text-gray-800">ATS Score</div>
                <div className="text-xs text-green-500 font-medium">Excellent Match</div>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#8e98ff] w-[92%]" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Stats Section */}
      <section className="reveal-section py-16 border-y border-white/50 bg-white/30 backdrop-blur-sm">
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
      <section className="reveal-section py-32 px-6">
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
      <section className="reveal-section py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#8e98ff]/5 skew-y-[-2deg] origin-top-left -z-10" />
        <div className="max-w-4xl mx-auto text-center glass-panel p-16 border-[#8e98ff]/20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Ready to get hired?</h2>
          <Link to="/upload" className="primary-gradient text-white px-12 py-6 rounded-[2rem] text-xl font-bold inline-flex items-center gap-4 hover:scale-105 transition-transform duration-300 shadow-xl">
            Check Your Score Now <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </main>
  );
}
