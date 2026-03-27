import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string, score: number }) => {
    const textColor = score > 70 ? 'text-[#10B981]' // Green
            : score > 49
        ? 'text-[#F59E0B]' // Yellow
        : 'text-[#EF4444]'; // Red

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-white/40 border border-white/50 rounded-2xl hover:bg-white/60 hover:shadow-md transition-all duration-300 group">
            <div className="flex flex-row gap-3 items-center mb-2 sm:mb-0">
                <p className="text-xl font-semibold text-gray-800 tracking-tight group-hover:text-[#8e98ff] transition-colors">{title}</p>
                <ScoreBadge score={score} />
            </div>
            <div className="flex items-baseline gap-1">
                <span className={`text-3xl font-bold tracking-tighter ${textColor}`}>{score}</span>
                <span className="text-gray-400 font-medium text-sm">/ 100</span>
            </div>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="glass-card w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-forwards opacity-0">
            <div className="flex flex-col sm:flex-row items-center p-6 gap-6 sm:gap-10 border-b border-gray-100/50">
                <div className="flex-shrink-0 relative group">
                    <div className="absolute inset-0 bg-[#8e98ff] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                    <ScoreGauge score={feedback.overallScore} />
                </div>

                <div className="flex flex-col gap-2 text-center sm:text-left">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#8e98ff] group-hover:to-[#606beb] transition-all duration-300">Your Resume Score</h2>
                    <p className="text-base text-gray-500 font-medium">
                        This score is calculated based on the variables listed below. Aim for 80+ to maximize your chances.
                    </p>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                <Category title="Content" score={feedback.content.score} />
                <Category title="Structure" score={feedback.structure.score} />
                <Category title="Skills" score={feedback.skills.score} />
            </div>
        </div>
    )
}
export default Summary
