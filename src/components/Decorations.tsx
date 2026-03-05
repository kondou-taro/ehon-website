"use client";

import { motion } from "framer-motion";

// ──── Cloud ────
export const CloudDecoration = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 200 100" className={`pointer-events-none ${className}`} aria-hidden="true">
        <ellipse cx="60" cy="60" rx="50" ry="30" fill="currentColor" />
        <ellipse cx="100" cy="45" rx="40" ry="35" fill="currentColor" />
        <ellipse cx="140" cy="60" rx="45" ry="28" fill="currentColor" />
        <ellipse cx="100" cy="65" rx="70" ry="25" fill="currentColor" />
    </svg>
);

// ──── Book Stack ────
export const BookStackDecoration = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 80 100" className={`pointer-events-none ${className}`} aria-hidden="true">
        <rect x="10" y="60" width="60" height="12" rx="3" fill="currentColor" opacity="0.6" />
        <rect x="15" y="45" width="55" height="12" rx="3" fill="currentColor" opacity="0.4" />
        <rect x="8" y="30" width="65" height="12" rx="3" fill="currentColor" opacity="0.3" />
    </svg>
);

// ──── Small star sparkle ────
export const SparkleDecoration = ({ className = "" }: { className?: string }) => (
    <motion.svg
        viewBox="0 0 40 40"
        className={`pointer-events-none ${className}`}
        aria-hidden="true"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
        <path
            d="M20 4L23 16L36 20L23 24L20 36L17 24L4 20L17 16Z"
            fill="currentColor"
        />
    </motion.svg>
);

// ──── Leaf ────
export const LeafDecoration = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 60 60" className={`pointer-events-none ${className}`} aria-hidden="true">
        <path
            d="M30 5C15 5 5 20 5 35C5 50 15 55 30 55C45 55 55 50 55 35C55 20 45 5 30 5Z"
            fill="currentColor"
            opacity="0.15"
        />
        <path
            d="M30 15V50M20 25L30 30M40 35L30 40"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.1"
        />
    </svg>
);

// ──── Paw Print ────
export const PawDecoration = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 60 60" className={`pointer-events-none ${className}`} aria-hidden="true">
        <circle cx="30" cy="38" r="12" fill="currentColor" opacity="0.12" />
        <circle cx="16" cy="24" r="6" fill="currentColor" opacity="0.1" />
        <circle cx="24" cy="14" r="6" fill="currentColor" opacity="0.1" />
        <circle cx="36" cy="14" r="6" fill="currentColor" opacity="0.1" />
        <circle cx="44" cy="24" r="6" fill="currentColor" opacity="0.1" />
    </svg>
);
