import { cn } from "~/lib/utils";
import { CheckCircle2, AlertCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  const isGood = score > 69;
  const isWarning = score > 39 && score <= 69;

  return (
      <div
          className={cn(
              "flex flex-row gap-1.5 items-center px-3 py-1 rounded-full border shadow-sm transition-all",
              isGood
                  ? "bg-[#10B981]/10 border-[#10B981]/20 text-[#10B981]"
                  : isWarning
                      ? "bg-[#F59E0B]/10 border-[#F59E0B]/20 text-[#F59E0B]"
                      : "bg-[#EF4444]/10 border-[#EF4444]/20 text-[#EF4444]"
          )}
      >
        {isGood ? (
            <CheckCircle2 size={16} strokeWidth={2.5} />
        ) : (
            <AlertCircle size={16} strokeWidth={2.5} />
        )}
        <p className="text-sm font-bold tracking-tight">
          {score}/100
        </p>
      </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
      <div className="flex flex-row gap-4 items-center py-3 w-full group">
        <p className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-[#8e98ff] transition-colors">{title}</p>
        <ScoreBadge score={categoryScore} />
      </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
      <div className="flex flex-col gap-6 w-full pt-4 pb-6">
        {/* Top-level concise tips grid */}
        <div className="bg-white/50 border border-white/60 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {tips.map((tip, index) => (
              <div className="flex items-start gap-3" key={index}>
                <div className="mt-0.5 shrink-0">
                    {tip.type === "good" ? (
                        <CheckCircle2 size={20} className="text-[#10B981]" />
                    ) : (
                        <AlertCircle size={20} className="text-[#F59E0B]" />
                    )}
                </div>
                <p className="text-lg text-gray-700 font-medium leading-snug">{tip.tip}</p>
              </div>
          ))}
        </div>
        
        {/* Detailed explanations list */}
        <div className="flex flex-col gap-4 w-full">
          {tips.map((tip, index) => (
              <div
                  key={index + tip.tip}
                  className={cn(
                      "flex flex-col gap-3 rounded-2xl p-5 border shadow-sm transition-all hover:shadow-md",
                      tip.type === "good"
                          ? "bg-gradient-to-br from-[#10B981]/5 to-transparent border-[#10B981]/20"
                          : "bg-gradient-to-br from-[#F59E0B]/5 to-transparent border-[#F59E0B]/20"
                  )}
              >
                <div className="flex flex-row gap-3 items-center">
                  <div className={cn(
                      "p-2 rounded-xl",
                      tip.type === "good" ? "bg-[#10B981]/15 text-[#10B981]" : "bg-[#F59E0B]/15 text-[#F59E0B]"
                  )}>
                    {tip.type === "good" ? (
                        <CheckCircle2 size={24} />
                    ) : (
                        <AlertCircle size={24} />
                    )}
                  </div>
                  <p className={cn(
                      "text-xl font-bold tracking-tight",
                      tip.type === "good" ? "text-gray-900" : "text-gray-900"
                  )}>{tip.tip}</p>
                </div>
                <p className="text-gray-600 leading-relaxed font-medium ml-[52px]">
                    {tip.explanation}
                </p>
              </div>
          ))}
        </div>
      </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
      <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-forwards opacity-0">
        <div className="glass-card w-full p-2">
            <Accordion>
            <AccordionItem id="tone-style">
                <AccordionHeader itemId="tone-style">
                <CategoryHeader
                    title="Tone & Style"
                    categoryScore={feedback.toneAndStyle.score}
                />
                </AccordionHeader>
                <AccordionContent itemId="tone-style">
                <CategoryContent tips={feedback.toneAndStyle.tips} />
                </AccordionContent>
            </AccordionItem>
            
            <AccordionItem id="content">
                <AccordionHeader itemId="content">
                <CategoryHeader
                    title="Content"
                    categoryScore={feedback.content.score}
                />
                </AccordionHeader>
                <AccordionContent itemId="content">
                <CategoryContent tips={feedback.content.tips} />
                </AccordionContent>
            </AccordionItem>
            
            <AccordionItem id="structure">
                <AccordionHeader itemId="structure">
                <CategoryHeader
                    title="Structure"
                    categoryScore={feedback.structure.score}
                />
                </AccordionHeader>
                <AccordionContent itemId="structure">
                <CategoryContent tips={feedback.structure.tips} />
                </AccordionContent>
            </AccordionItem>
            
            <AccordionItem id="skills">
                <AccordionHeader itemId="skills">
                <CategoryHeader
                    title="Skills"
                    categoryScore={feedback.skills.score}
                />
                </AccordionHeader>
                <AccordionContent itemId="skills">
                <CategoryContent tips={feedback.skills.tips} />
                </AccordionContent>
            </AccordionItem>
            </Accordion>
        </div>
      </div>
  );
};

export default Details;
