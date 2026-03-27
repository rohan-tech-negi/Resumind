import { useEffect, useState } from "react";

const ScoreCircle = ({ score = 75 }: { score: number }) => {
    const [animatedScore, setAnimatedScore] = useState(0);
    const radius = 40;
    const stroke = 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const progress = animatedScore / 100;
    const strokeDashoffset = circumference * (1 - progress);

    useEffect(() => {
        // Trigger animation after mount
        const timeout = setTimeout(() => {
            setAnimatedScore(score);
        }, 100);
        return () => clearTimeout(timeout);
    }, [score]);

    // Choose color scheme based on score
    const getColorStops = () => {
        if (score >= 80) return <><stop offset="0%" stopColor="#4ADE80" /><stop offset="100%" stopColor="#10B981" /></>;
        if (score >= 60) return <><stop offset="0%" stopColor="#FBBF24" /><stop offset="100%" stopColor="#F59E0B" /></>;
        return <><stop offset="0%" stopColor="#F87171" /><stop offset="100%" stopColor="#EF4444" /></>;
    };

    return (
        <div className="relative w-[80px] h-[80px] drop-shadow-sm">
            <svg
                height="100%"
                width="100%"
                viewBox="0 0 100 100"
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={normalizedRadius}
                    stroke="#F3F4F6"
                    strokeWidth={stroke}
                    fill="transparent"
                />
                {/* Partial circle with gradient */}
                <defs>
                    <linearGradient id={`grad-${score}`} x1="1" y1="0" x2="0" y2="1">
                        {getColorStops()}
                    </linearGradient>
                </defs>
                <circle
                    cx="50"
                    cy="50"
                    r={normalizedRadius}
                    stroke={`url(#grad-${score})`}
                    strokeWidth={stroke}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1500 ease-out"
                />
            </svg>

            {/* Score and issues */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-bold text-xl tracking-tighter text-gray-800">{String(Math.round(animatedScore))}</span>
            </div>
        </div>
    );
};

export default ScoreCircle;
