import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";
import { cn } from "~/lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionContextType {
    activeItems: string[];
    toggleItem: (id: string) => void;
    isItemActive: (id: string) => boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
    undefined
);

const useAccordion = () => {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error("Accordion components must be used within an Accordion");
    }
    return context;
};

interface AccordionProps {
    children: ReactNode;
    defaultOpen?: string;
    allowMultiple?: boolean;
    className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
    children,
    defaultOpen,
    allowMultiple = false,
    className = "",
}) => {
    const [activeItems, setActiveItems] = useState<string[]>(
        defaultOpen ? [defaultOpen] : []
    );

    const toggleItem = (id: string) => {
        setActiveItems((prev) => {
            if (allowMultiple) {
                return prev.includes(id)
                    ? prev.filter((item) => item !== id)
                    : [...prev, id];
            } else {
                return prev.includes(id) ? [] : [id];
            }
        });
    };

    const isItemActive = (id: string) => activeItems.includes(id);

    return (
        <AccordionContext.Provider
            value={{ activeItems, toggleItem, isItemActive }}
        >
            <div className={`space-y-4 ${className}`}>{children}</div>
        </AccordionContext.Provider>
    );
};

interface AccordionItemProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
    id,
    children,
    className = "",
}) => {
    return (
        <div className={`overflow-hidden bg-white/40 border border-white/50 rounded-2xl transition-all duration-300 hover:shadow-md hover:bg-white/60 ${className}`}>
            {children}
        </div>
    );
};

interface AccordionHeaderProps {
    itemId: string;
    children: ReactNode;
    className?: string;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
}

export const AccordionHeader: React.FC<AccordionHeaderProps> = ({
    itemId,
    children,
    className = "",
    icon,
    iconPosition = "right",
}) => {
    const { toggleItem, isItemActive } = useAccordion();
    const isActive = isItemActive(itemId);

    const defaultIcon = (
        <ChevronDown 
            className={cn("w-6 h-6 text-gray-400 transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]", {
                "rotate-180 text-[#8e98ff]": isActive,
            })} 
        />
    );

    const handleClick = () => {
        toggleItem(itemId);
    };

    return (
        <button
            onClick={handleClick}
            className={`
                w-full px-6 py-2 text-left
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8e98ff]/50 focus-visible:ring-offset-2
                transition-colors duration-200 flex items-center justify-between cursor-pointer rounded-2xl
                ${isActive ? 'bg-white/40' : ''}
                ${className}
            `}
        >
            <div className="flex items-center space-x-4 w-full">
                {iconPosition === "left" && (icon || defaultIcon)}
                <div className="flex-1">{children}</div>
            </div>
            {iconPosition === "right" && (icon || defaultIcon)}
        </button>
    );
};

interface AccordionContentProps {
    itemId: string;
    children: ReactNode;
    className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
    itemId,
    children,
    className = "",
}) => {
    const { isItemActive } = useAccordion();
    const isActive = isItemActive(itemId);

    return (
        <div
            className={`
                grid transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]
                ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                ${className}
            `}
        >
            <div className="overflow-hidden">
                <div className="px-6 pb-2 pt-0 w-full">{children}</div>
            </div>
        </div>
    );
};
