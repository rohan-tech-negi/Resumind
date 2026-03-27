import React from 'react'
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine styling based on score
  const isGood = score > 69;
  const isWarning = score > 49 && score <= 69;
  
  const gradientClass = isGood
    ? 'from-[#10B981]/15 to-transparent border-[#10B981]/20'
    : isWarning
      ? 'from-[#F59E0B]/15 to-transparent border-[#F59E0B]/20'
      : 'from-[#EF4444]/15 to-transparent border-[#EF4444]/20';

  const titleColor = isGood ? 'text-[#10B981]' : isWarning ? 'text-[#F59E0B]' : 'text-[#EF4444]';

  const subtitle = isGood
    ? 'Great Job!'
    : isWarning
      ? 'Good Start'
      : 'Needs Improvement';

  return (
    <div className={`glass-card bg-gradient-to-b ${gradientClass} w-full p-8 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-forwards opacity-0`}>
      {/* Abstract background shape */}
      <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-40 pointer-events-none 
          ${isGood ? 'bg-[#10B981]/30' : isWarning ? 'bg-[#F59E0B]/30' : 'bg-[#EF4444]/30'}`} />

      {/* Top section with icon and headline */}
      <div className="flex items-center gap-5 mb-8 relative z-10">
        <div className={`p-4 rounded-2xl bg-white/60 shadow-sm border border-white/50
            ${isGood ? 'text-[#10B981]' : isWarning ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`}>
          {isGood ? <CheckCircle2 size={36} /> : isWarning ? <AlertCircle size={36} /> : <XCircle size={36} />}
        </div>
        <div>
          <h2 className={`text-3xl font-bold tracking-tight ${titleColor}`}>ATS Score - {score} / 100</h2>
          <h3 className="text-xl font-bold tracking-tight text-gray-900 mt-1">{subtitle}</h3>
        </div>
      </div>

      {/* Description section */}
      <div className="mb-8 relative z-10">
        <p className="text-gray-600 font-medium text-lg leading-relaxed mb-6 bg-white/40 p-5 rounded-2xl border border-white/30">
          This score represents how well your resume is likely to perform in Applicant Tracking Systems used by modern enterprise employers.
        </p>

        {/* Suggestions list */}
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white/50 border border-white/40 hover:bg-white/70 transition-colors">
              <div className="mt-0.5">
                  {suggestion.type === "good" ? (
                      <CheckCircle2 size={20} className="text-[#10B981]" />
                  ) : (
                      <AlertCircle size={20} className="text-[#F59E0B]" />
                  )}
              </div>
              <p className={`font-medium leading-snug ${suggestion.type === "good" ? "text-gray-700" : "text-gray-800"}`}>
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing encouragement */}
      <div className="relative z-10 flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${isGood ? 'bg-[#10B981]' : isWarning ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'}`} />
          <p className="text-gray-500 font-medium text-sm tracking-wide uppercase">
            Keep refining your resume to improve your chances.
          </p>
      </div>
    </div>
  )
}

export default ATS
