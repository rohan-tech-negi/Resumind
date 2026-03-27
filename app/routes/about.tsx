import Navbar from "~/components/Navbar";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Bot, Target, Zap, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";

gsap.registerPlugin(ScrollTrigger);

export const meta = () => ([
    { title: 'Resumind | How ATS Works' },
    { name: 'description', content: 'Understand how Applicant Tracking Systems evaluate your resume' },
]);

const About = () => {
    const mainRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".hero-text",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out" }
            );

            gsap.utils.toArray<HTMLElement>('.step-card').forEach((card, i) => {
                gsap.fromTo(card,
                    { y: 50, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                        },
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out"
                    }
                );
            });
        }, mainRef);
        
        return () => ctx.revert();
    }, []);

    return (
        <main ref={mainRef} className="bg-[#FAFAFC] min-h-screen relative flex flex-col pt-32 pb-24 overflow-hidden">
            <Navbar />

            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#8e98ff]/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[60%] bg-[#606beb]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Hero Section */}
            <section className="w-full max-w-5xl mx-auto px-6 mb-24 relative z-10 text-center">
                <h1 className="hero-text text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
                    Demystifying the <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8e98ff] to-[#606beb]">ATS Black Box</span>
                </h1>
                <p className="hero-text text-xl md:text-2xl text-gray-500 font-medium max-w-3xl mx-auto">
                    75% of resumes are rejected before a human ever sees them. Learn how Applicant Tracking Systems work and how Resumind helps you beat the bots.
                </p>
            </section>

            {/* The Process */}
            <section className="w-full max-w-6xl mx-auto px-6 relative z-10">
                <div className="flex flex-col gap-12 md:gap-24">
                    
                    {/* Step 1 */}
                    <div className="step-card flex flex-col md:flex-row items-center gap-10 md:gap-16">
                        <div className="w-full md:w-1/2 order-2 md:order-1 glass-card p-10 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#8e98ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Bot size={80} className="text-[#8e98ff] mb-6 animate-pulse" />
                            <h3 className="text-2xl font-bold tracking-tight text-gray-800 text-center">Parsing & Extraction</h3>
                            <p className="text-gray-500 text-center mt-3 font-medium">The system reads your PDF and attempts to convert it into raw, structured data.</p>
                        </div>
                        <div className="w-full md:w-1/2 order-1 md:order-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8e98ff]/10 text-[#606beb] font-bold text-sm tracking-wide uppercase mb-4">
                                Step 1
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">The Parsing Phase</h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                When you submit your resume, the ATS first rips it apart. Complex formatting, weird fonts, and graphics confuse the parser. If the bot can't read your contact info, skills, or employment history correctly, your application is instantly trashed.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="step-card flex flex-col md:flex-row items-center gap-10 md:gap-16">
                        <div className="w-full md:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] font-bold text-sm tracking-wide uppercase mb-4">
                                Step 2
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">Keyword Matching</h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                Once parsed, the ATS compares your structured data against the job description. It scans for hard skills, certifications, and specific industry terminology. If your keyword match rate falls below a certain threshold (usually 70-80%), you get an automated rejection email.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 glass-card p-10 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Target size={80} className="text-[#F59E0B] mb-6" />
                            <h3 className="text-2xl font-bold tracking-tight text-gray-800 text-center">Contextual Analysis</h3>
                            <p className="text-gray-500 text-center mt-3 font-medium">The system looks for exact keyword matches mapped against the open requisition.</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="step-card flex flex-col md:flex-row items-center gap-10 md:gap-16">
                        <div className="w-full md:w-1/2 order-2 md:order-1 glass-card p-10 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden group bg-gradient-to-br from-[#10B981]/5 to-transparent">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/10 rounded-full blur-2xl" />
                            <Zap size={80} className="text-[#10B981] mb-6" />
                            <h3 className="text-2xl font-bold tracking-tight text-gray-800 text-center">Human Review</h3>
                            <p className="text-gray-500 text-center mt-3 font-medium">Only the top 10-25% of candidates make it to the recruiter's desk.</p>
                        </div>
                        <div className="w-full md:w-1/2 order-1 md:order-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] font-bold text-sm tracking-wide uppercase mb-4">
                                Step 3
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">The Recruiter Dashboard</h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium mb-6">
                                The surviving resumes are ranked and presented to the human recruiter. Now, your resume must be visually appealing, concise, and impactful to convince the human to schedule an interview.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-gray-700 font-medium">
                                    <CheckCircle2 size={20} className="text-[#10B981]" /> Clear structure and hierarchy
                                </li>
                                <li className="flex items-center gap-3 text-gray-700 font-medium">
                                    <CheckCircle2 size={20} className="text-[#10B981]" /> Quantifiable achievements
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full max-w-4xl mx-auto px-6 mt-32 relative z-10 text-center">
                <div className="glass-panel p-12 custom-shadow">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">Ready to beat the system?</h2>
                    <p className="text-xl text-gray-500 font-medium mb-8">
                        Resumind simulates an enterprise ATS scan to tell you exactly why your resume is failing, and how to fix it.
                    </p>
                    <Link to="/upload" className="primary-gradient text-white text-lg font-bold py-4 px-10 rounded-full inline-flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl">
                        Scan My Resume <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default About;
