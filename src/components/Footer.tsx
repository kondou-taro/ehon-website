import Link from "next/link";

import { LeafDecoration, StarDecoration } from "./Decorations";

export default function Footer() {
    return (
        <footer className="bg-accent text-main py-20 mt-32 relative overflow-hidden">
            <LeafDecoration className="absolute -left-10 -top-10 w-40 h-40 rotate-45 opacity-20" />
            <StarDecoration className="absolute right-10 top-10 w-16 h-16 animate-gentle-float opacity-30" />

            <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-8 relative z-10">
                <Link
                    href="/"
                    className="text-3xl font-bold tracking-widest hover:text-main/80 transition-colors hand-drawn-line"
                >
                    ちいさなとしょかん
                </Link>

                <a
                    href="https://www.youtube.com/@chiisanatoshokan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-5 bg-main text-accent rounded-full font-bold text-lg hover:bg-main/90 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.2)] organic-border"
                >
                    <span className="text-2xl">▶︎</span> YouTubeチャンネル
                </a>

                <div className="text-sm font-medium tracking-widest text-main/60 mt-8">
                    &copy; 2026 ちいさなとしょかん
                </div>
            </div>
        </footer>
    );
}
