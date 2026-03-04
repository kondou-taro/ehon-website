import Link from "next/link";
import { LeafDecoration, StarDecoration } from "./Decorations";
import { Youtube, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-white pt-24 pb-12 overflow-hidden border-t border-accent/5">
            <LeafDecoration className="absolute -left-10 bottom-10 w-48 h-48 opacity-[0.04] rotate-45" />
            <StarDecoration className="absolute right-10 top-10 w-32 h-32 opacity-[0.03] animate-gentle-float" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-3 mb-8 group">
                        <Heart className="w-8 h-8 text-accent animate-pulse" />
                        <h2 className="text-3xl font-bold text-accent tracking-tighter hand-drawn-line px-4">
                            ちいさなとしょかん
                        </h2>
                    </div>

                    <p className="text-accent/60 max-w-md mb-12 font-medium leading-loose">
                        毎日のおやすみ前に、
                        <br />
                        やさしい物語が届きますように。
                    </p>

                    <a
                        href="https://www.youtube.com/@chiisanatoshokan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-4 bg-accent text-[#FFF8E8] rounded-full font-bold shadow-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95 organic-border group"
                    >
                        <Youtube className="w-5 h-5 group-hover:scale-120 transition-transform" />
                        YouTubeで見る
                    </a>

                    <div className="mt-16 pt-8 border-t border-accent/5 w-full text-center">
                        <p className="text-xs font-bold text-accent/30 tracking-widest uppercase">
                            &copy; 2026 ちいさなとしょかん
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
