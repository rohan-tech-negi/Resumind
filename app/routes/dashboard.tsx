import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  FolderOpen,
  Upload,
  TrendingUp,
  FileText,
  Star,
  Search,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import gsap from "gsap";

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
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "score">("recent");
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/dashboard");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const raw = (await kv.list("resume:*", true)) as KVItem[];
      const parsed = raw?.map((r) => JSON.parse(r.value) as Resume) || [];
      setResumes(parsed);
      setLoadingResumes(false);
    };
    loadResumes();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dash-header",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".stat-card",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.4 }
      );
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const filtered = resumes
    .filter((r) => {
      const q = search.toLowerCase();
      return (
        r.companyName?.toLowerCase().includes(q) ||
        r.jobTitle?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) =>
      sortBy === "score"
        ? (b.feedback?.overallScore ?? 0) - (a.feedback?.overallScore ?? 0)
        : (b.id ?? "").localeCompare(a.id ?? "")
    );

  const avgScore =
    resumes.length > 0
      ? Math.round(
          resumes.reduce((acc, r) => acc + (r.feedback?.overallScore ?? 0), 0) /
            resumes.length
        )
      : 0;

  const bestScore = resumes.length > 0
    ? Math.max(...resumes.map((r) => r.feedback?.overallScore ?? 0))
    : 0;

  return (
    <div ref={mainRef} className="bg-[#FAFAFC] min-h-screen relative overflow-x-hidden">
      {/* Ambient background */}
      <div className="fixed top-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-b from-[#8e98ff]/10 to-transparent rounded-full blur-[150px] pointer-events-none -translate-y-1/3 translate-x-1/4 -z-10" />
      <div className="fixed bottom-0 left-0 w-[40vw] h-[40vw] bg-[#606beb]/5 rounded-full blur-[120px] pointer-events-none translate-x-[-30%] -z-10" />

      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 pt-28 pb-20">
        {/* Page Header */}
        <div className="dash-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 opacity-0">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#8e98ff] mb-2">
              Resume Portfolio
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8e98ff] to-[#606beb]">
                Dashboard
              </span>
            </h1>
            <p className="text-gray-500 font-medium mt-2">
              Track your ATS scores and improvement over time.
            </p>
          </div>
          <Link
            to="/upload"
            className="primary-gradient text-white px-7 py-3.5 rounded-2xl text-sm font-bold flex items-center gap-2 self-start md:self-auto hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            <Upload size={16} />
            New Analysis
          </Link>
        </div>

        {/* Stats Bar */}
        {resumes.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              {
                label: "Total Resumes",
                value: resumes.length,
                icon: FileText,
                color: "text-[#8e98ff]",
                bg: "bg-[#8e98ff]/10",
              },
              {
                label: "Avg. ATS Score",
                value: `${avgScore}%`,
                icon: TrendingUp,
                color: "text-[#10B981]",
                bg: "bg-[#10B981]/10",
              },
              {
                label: "Best Score",
                value: `${bestScore}%`,
                icon: Star,
                color: "text-[#F59E0B]",
                bg: "bg-[#F59E0B]/10",
              },
              {
                label: "Needs Work",
                value: resumes.filter((r) => (r.feedback?.overallScore ?? 0) < 70).length,
                icon: SlidersHorizontal,
                color: "text-[#EF4444]",
                bg: "bg-[#EF4444]/10",
              },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="stat-card glass-card p-5 flex items-center gap-4 opacity-0">
                <div className={`w-11 h-11 ${bg} rounded-2xl flex items-center justify-center shrink-0`}>
                  <Icon size={20} className={color} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{value}</p>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Toolbar */}
        {resumes.length > 0 && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by company or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="!pl-10 !py-2.5 !text-sm h-10"
              />
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "recent" | "score")}
                className="appearance-none glass-panel h-10 px-4 pr-9 text-sm font-medium text-gray-700 rounded-xl border-white/50 cursor-pointer outline-none"
              >
                <option value="recent">Most Recent</option>
                <option value="score">Highest Score</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Loading */}
        {loadingResumes && (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full border-4 border-[#8e98ff]/20 border-t-[#8e98ff] animate-spin" />
              <div className="absolute inset-2 rounded-full bg-[#8e98ff]/5" />
            </div>
            <p className="text-gray-500 font-medium animate-pulse">Loading your portfolio…</p>
          </div>
        )}

        {/* Resume Grid */}
        {!loadingResumes && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((resume, idx) => (
              <div
                key={resume.id}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${idx * 80}ms`, animationFillMode: "both" }}
              >
                <ResumeCard resume={resume} />
              </div>
            ))}
          </div>
        )}

        {/* Empty — no matches for search */}
        {!loadingResumes && resumes.length > 0 && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">No results found</h3>
            <p className="text-gray-400 text-sm">Try a different company name or role.</p>
          </div>
        )}

        {/* Empty — no resumes yet */}
        {!loadingResumes && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[55vh]">
            <div className="glass-panel p-12 md:p-16 flex flex-col items-center text-center max-w-lg w-full border-dashed border-2 border-[#8e98ff]/20 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#8e98ff]/10 rounded-full blur-2xl" />
              <div className="w-20 h-20 bg-gradient-to-tr from-[#8e98ff]/20 to-[#606beb]/10 rounded-3xl flex items-center justify-center mb-6 text-[#8e98ff]">
                <FolderOpen size={36} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                No resumes yet
              </h2>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                Upload your first resume to get a detailed AI-powered ATS score and actionable feedback.
              </p>
              <Link
                to="/upload"
                className="primary-gradient text-white px-8 py-4 rounded-2xl text-base font-bold flex items-center gap-2 hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <Upload size={18} />
                Upload Your First Resume
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
