import React from "react";

export const LeafDecoration = ({ className = "" }: { className?: string }) => (
    <svg
        viewBox="0 0 100 100"
        className={`fill-accent/10 pointer-events-none ${className}`}
        aria-hidden="true"
    >
        <path d="M50 10C25 10 10 35 10 60C10 85 35 85 50 85C65 85 90 85 90 60C90 35 75 10 50 10ZM50 80C50 80 45 60 50 35C55 60 50 80 50 80Z" />
        <path d="M50 35L40 45M50 50L60 60M50 65L40 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="stroke-accent/20" />
    </svg>
);

export const StarDecoration = ({ className = "" }: { className?: string }) => (
    <svg
        viewBox="0 0 100 100"
        className={`fill-accent/15 pointer-events-none ${className}`}
        aria-hidden="true"
    >
        <path d="M50 5L61 35H95L67 55L78 85L50 67L22 85L33 55L5 35H39L50 5Z" />
    </svg>
);

export const PawDecoration = ({ className = "" }: { className?: string }) => (
    <svg
        viewBox="0 0 100 100"
        className={`fill-accent/10 pointer-events-none ${className}`}
        aria-hidden="true"
    >
        <circle cx="50" cy="65" r="20" />
        <circle cx="25" cy="40" r="10" />
        <circle cx="40" cy="25" r="10" />
        <circle cx="60" cy="25" r="10" />
        <circle cx="75" cy="40" r="10" />
    </svg>
);
