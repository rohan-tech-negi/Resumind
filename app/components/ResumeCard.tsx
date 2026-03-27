import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);

    return (
        <Link to={`/resume/${id}`} className="group relative flex flex-col gap-6 h-[500px] w-full lg:w-[420px] glass-card p-6 overflow-hidden">
            {/* Subtle gradient glow behind the card content */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#8e98ff]/20 to-transparent rounded-full blur-3xl group-hover:opacity-100 opacity-0 transition-opacity duration-700 pointer-events-none" />
            
            <div className="flex flex-row gap-4 justify-between items-start z-10">
                <div className="flex flex-col gap-1.5">
                    {companyName ? (
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#8e98ff] group-hover:to-[#606beb] transition-all duration-300 break-words line-clamp-2">
                            {companyName}
                        </h2>
                    ) : (
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 break-words">Resume</h2>
                    )}
                    {jobTitle && <h3 className="text-sm font-medium tracking-wide break-words text-gray-500/80 uppercase">{jobTitle}</h3>}
                </div>
                <div className="flex-shrink-0 bg-white/50 p-1.5 rounded-full shadow-sm backdrop-blur-md">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>
            {resumeUrl && (
                <div className="relative flex-1 rounded-2xl overflow-hidden glass-panel border-4 border-white/40 shadow-inner group-hover:shadow-[inset_0_4px_24px_rgba(142,152,255,0.1)] transition-all duration-500 z-10">
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
                    <img
                        src={resumeUrl}
                        alt="resume"
                        className="w-full h-[350px] object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                </div>
            )}
        </Link>
    )
}
export default ResumeCard
