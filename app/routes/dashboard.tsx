import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import { FolderOpen } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard | Resumind" },
    { name: "description", content: "Your ATS Results Dashboard" },
  ];
}

export default function Dashboard() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/dashboard');
  }, [auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes()
  }, []);

  return <main className="bg-[#FAFAFC] min-h-screen relative overflow-hidden">
    {/* Decorative background gradients */}
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8e98ff]/20 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] bg-[#606beb]/10 rounded-full blur-[100px] pointer-events-none" />
    
    <Navbar />

    <section className="flex flex-col items-center gap-12 pt-32 pb-20 px-6 max-w-[1400px] mx-auto z-10 relative">
      <div className="flex flex-col items-center gap-4 text-center max-w-2xl animate-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
          Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8e98ff] to-[#606beb]">Dashboard</span>
        </h1>
        <p className="text-lg text-gray-500 font-medium">
          Review your analyzed resumes and track your ATS improvement over time.
        </p>
      </div>

      {loadingResumes && (
          <div className="flex flex-col items-center justify-center min-h-[40vh] w-full">
            <div className="w-16 h-16 border-4 border-[#8e98ff]/30 border-t-[#8e98ff] rounded-full animate-spin" />
            <p className="mt-6 text-gray-500 font-medium animate-pulse">Loading your data...</p>
          </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="w-full flex flex-wrap gap-8 justify-center items-start pt-8">
          {resumes.map((resume, idx) => (
            <div key={resume.id} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}>
              <ResumeCard resume={resume} />
            </div>
          ))}
        </div>
      )}

      {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-16 p-16 glass-panel border border-white/50 text-center max-w-lg w-full">
            <div className="w-20 h-20 bg-[#8e98ff]/10 rounded-full flex items-center justify-center mb-6 text-[#8e98ff]">
              <FolderOpen size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Resumes Yet</h2>
            <p className="text-gray-500 mb-8 font-medium">Upload your first resume to get detailed AI feedback and an ATS score.</p>
            <Link to="/upload" className="primary-button inline-flex items-center gap-2 text-lg px-8 py-3.5 shadow-lg group">
              <span>Upload Resume</span>
              <div className="w-2 h-2 rounded-full bg-white/50 group-hover:bg-white transition-all transform group-hover:scale-150" />
            </Link>
          </div>
      )}
    </section>
  </main>
}
