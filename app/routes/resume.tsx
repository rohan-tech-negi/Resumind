import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState, useRef } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import gsap from "gsap";
import { ArrowLeft, LayoutDashboard, Loader2 } from "lucide-react";

export const meta = () => ([
    { title: 'Resumind | Review ' },
    { name: 'description', content: 'Detailed overview of your resume' },
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();
    
    const leftPanelRef = useRef<HTMLDivElement>(null);
    const rightPanelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading])

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if (!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
        }

        loadResume();
    }, [id]);

    useEffect(() => {
        if (feedback && imageUrl && leftPanelRef.current && rightPanelRef.current) {
            gsap.fromTo(leftPanelRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );
            gsap.fromTo(rightPanelRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
            );
        }
    }, [feedback, imageUrl]);

    if (!feedback || !imageUrl) {
        return (
            <main className="min-h-screen bg-[#FAFAFC] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#8e98ff]/10 rounded-full blur-[100px]" />
                <Loader2 size={48} className="text-[#8e98ff] animate-spin mb-6" />
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 animate-pulse">Loading Analysis Details</h2>
            </main>
        );
    }

    return (
        <main className="bg-[#FAFAFC] min-h-screen relative overflow-hidden">
            {/* Background embellishments */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8e98ff]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[50%] bg-[#606beb]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

            <nav className="fixed top-0 left-0 right-0 z-50 glass-panel !rounded-none !border-x-0 !border-t-0 px-6 py-4 flex flex-row justify-between items-center shadow-sm">
                <div className="flex items-center gap-4">
                    <Link to="/" className="flex items-center gap-2 group text-gray-600 hover:text-gray-900 transition-colors">
                        <div className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                            <ArrowLeft size={16} />
                        </div>
                        <span className="font-semibold text-sm hidden sm:block">Home</span>
                    </Link>
                </div>
                <p className="text-xl font-bold text-gradient tracking-tight absolute left-1/2 -translate-x-1/2">RESUMIND</p>
                <Link to="/dashboard" className="flex items-center gap-2 text-sm font-semibold text-[#8e98ff] hover:text-[#606beb] transition-colors bg-[#8e98ff]/10 px-4 py-2 rounded-full">
                    <LayoutDashboard size={16} />
                    <span className="hidden sm:block">Dashboard</span>
                </Link>
            </nav>

            <div className="flex flex-col xl:flex-row w-full max-w-[1600px] mx-auto pt-24 px-6 gap-8 pb-12">
                {/* Left Panel - Fixed sticky preview */}
                <section ref={leftPanelRef} className="w-full xl:w-[45%] xl:sticky xl:top-28 xl:h-[calc(100vh-160px)] z-10 opactiy-0">
                    <div className="w-full h-full glass-card p-4 mx-auto max-w-2xl xl:max-w-none shadow-[0_20px_60px_-15px_rgba(142,152,255,0.15)] flex flex-col">
                        <div className="flex flex-row items-center justify-between mb-4 px-2">
                            <h3 className="font-bold text-lg text-gray-800 tracking-tight">Original Document</h3>
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#8e98ff] hover:text-[#606beb] transition-colors">
                                Open PDF
                            </a>
                        </div>
                        <div className="flex-1 bg-gray-100 rounded-xl overflow-hidden border border-gray-200/50 shadow-inner relative group">
                            <img
                                src={imageUrl}
                                className="w-full h-full object-cover object-top"
                                title="resume"
                                alt="Resume preview"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                    </div>
                </section>

                {/* Right Panel - Scrolling feedback */}
                <section ref={rightPanelRef} className="w-full xl:w-[55%] flex flex-col pt-4 xl:pt-0 max-w-3xl mx-auto xl:mx-0 opacity-0 relative z-20">
                    <div className="mb-10 text-center xl:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">Detailed Breakdown</h1>
                        <p className="text-lg text-gray-500 font-medium">Review your ATS score, read custom AI insights, and find out exactly how to improve your resume.</p>
                    </div>

                    <div className="flex flex-col gap-8 pb-32">
                        <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                        <Summary feedback={feedback} />
                        <Details feedback={feedback} />
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Resume
