"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
    as?: "h1" | "div" | "span" | "p";
}

// KVの見出しに使う：文字が1文字ずつぴょこっと現れるアニメーション
export const BouncyText = ({
    text,
    className = "",
    delay = 0,
    as = "div",
}: AnimatedTextProps) => {
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.04, delayChildren: delay },
        },
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 14,
                stiffness: 150,
            },
        },
        hidden: {
            opacity: 0,
            y: 30,
        },
    };

    const MotionTag = motion[as];

    return (
        <MotionTag
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
            style={{ display: "block" }}
        >
            {letters.map((letter, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    style={{ display: "inline-block", cursor: "default" }}
                    whileHover={{
                        scale: 1.3,
                        y: -8,
                        color: "#D4845A",
                        transition: { type: "spring", stiffness: 400, damping: 10 },
                    }}
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </MotionTag>
    );
};

// フェードアップで現れるアニメーション（汎用）
export const FadeUp = ({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

// ふわふわ浮遊する装飾用
export const FloatingElement = ({
    children,
    className = "",
    duration = 6,
    y = 12,
}: {
    children: React.ReactNode;
    className?: string;
    duration?: number;
    y?: number;
}) => (
    <motion.div
        animate={{ y: [-y / 2, y / 2, -y / 2] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        className={className}
    >
        {children}
    </motion.div>
);
