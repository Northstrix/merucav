"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface FAQItem {
    id: string;
    question: React.ReactNode;
    answer: React.ReactNode;
}

interface UnfoldingCardProps {
    faqs: FAQItem[];
    openId: string | null;
    setOpenId: (id: string | null) => void;
    customRounding?: string;
    borderColor?: string;
    questionBackground?: string;
    answerBackground?: string;
    textColor?: string;
    questionFontSize?: string;
    answerFontSize?: string;
    isRTL?: boolean;
    isMobile?: boolean;
}

const HighlightHover: React.FC<{
    children: React.ReactNode;
    hovered?: boolean;
    className?: string;
    style?: React.CSSProperties
}> = React.memo(({
    children,
    hovered = false,
    className,
    style
}) => {
    const textAnim = {
        rest: {
            color: "var(--foreground)",
        },
        hover: {
            color: "hsl(var(--primary))",
        },
    };

    return (
        <motion.div
            initial="rest"
            animate={hovered ? "hover" : "rest"}
            className={cn("relative cursor-pointer select-none overflow-visible", className)}
            style={{
                position: "relative",
                zIndex: 1,
                display: "inline-block",
                ...style,
            }}
        >
            <motion.span variants={textAnim} className="relative z-[1] inline-block">{children}</motion.span>
        </motion.div>
    );
});
HighlightHover.displayName = 'HighlightHover';

export const UnfoldingCard: React.FC<UnfoldingCardProps> = ({
    faqs,
    openId,
    setOpenId,
    customRounding = "8px",
    borderColor = "hsl(var(--border))",
    questionBackground = "hsl(var(--card))",
    answerBackground = "hsl(var(--muted) / 0.3)",
    textColor = "hsl(var(--card-foreground))",
    questionFontSize = "1rem",
    answerFontSize = "0.95rem",
    isRTL = false,
    isMobile = false,
}) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const toggleFAQ = useCallback((id: string) => {
        setOpenId(prev => (prev === id ? null : id));
    }, [setOpenId]);

    const paddingY = isMobile ? 12 : 16;
    const paddingX = isMobile ? 10 : 20;

    return (
        <div className="w-full flex flex-col gap-4 py-0" dir={isRTL ? "rtl" : "ltr"}>
            {faqs.map((faq) => {
                const isOpen = openId === faq.id;
                const isHovered = hoveredId === faq.id && !isMobile;

                return (
                    <motion.div
                        key={faq.id}
                        className="relative w-full overflow-hidden group"
                        onMouseEnter={() => !isMobile && setHoveredId(faq.id)}
                        onMouseLeave={() => !isMobile && setHoveredId(null)}
                        style={{
                            border: `1px solid ${borderColor}`,
                            borderRadius: customRounding,
                            backgroundColor: "transparent",
                            transition: "border-color 0.25s ease, background-color 0.25s ease",
                            willChange: "transform, background-color, border-color",
                        }}
                    >
                        <div
                            className="relative z-10 flex items-center select-none"
                            onClick={() => toggleFAQ(faq.id)}
                            style={{
                                padding: `${paddingY}px ${paddingX}px`,
                                minHeight: 56,
                                justifyContent: "space-between",
                                backgroundColor: questionBackground,
                                borderTopLeftRadius: customRounding,
                                borderTopRightRadius: customRounding,
                                borderBottomLeftRadius: isOpen ? "0px" : customRounding,
                                borderBottomRightRadius: isOpen ? "0px" : customRounding,
                                transition: "border-radius 0.25s ease",
                                userSelect: "none",
                                cursor: 'pointer',
                                flexDirection: isRTL ? 'row-reverse' : 'row',
                            }}
                        >
                            <HighlightHover
                                hovered={isHovered}
                                className="flex-grow"
                                style={{
                                    fontSize: isMobile ? `calc(${questionFontSize} * 0.88)` : questionFontSize,
                                    color: textColor,
                                    whiteSpace: "normal",
                                    textAlign: isRTL ? "right" : "left",
                                    fontWeight: "bold",
                                }}
                            >
                                {faq.question}
                            </HighlightHover>
                             <motion.span
                                className="flex-shrink-0 select-none"
                                style={{
                                    color: isHovered ? textColor : "var(--muted-foreground)",
                                    fontSize: questionFontSize,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 24,
                                    height: 24,
                                }}
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                            >
                                <ChevronDown size={24} strokeWidth={2} />
                            </motion.span>
                        </div>
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: "auto",
                                        opacity: 1,
                                        transition: { height: { duration: 0.35, ease: "easeInOut" }, opacity: { duration: 0.25, delay: 0.1 } },
                                    }}
                                    exit={{
                                        height: 0,
                                        opacity: 0,
                                        transition: { height: { duration: 0.3, ease: "easeInOut" }, opacity: { duration: 0.2 } },
                                    }}
                                    style={{
                                        overflow: "hidden",
                                        backgroundColor: answerBackground,
                                        borderBottomLeftRadius: customRounding,
                                        borderBottomRightRadius: customRounding,
                                        marginTop: -1,
                                        willChange: "height, opacity",
                                    }}
                                >
                                    <div
                                        className="relative z-10"
                                        style={{
                                            padding: `${paddingY}px ${paddingX}px`,
                                            color: "var(--muted-foreground)",
                                            fontSize: isMobile ? `calc(${answerFontSize} * 0.92)` : answerFontSize,
                                            fontWeight: 500,
                                            textAlign: isRTL ? "right" : "left",
                                        }}
                                    >
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
};
