import Link from "next/link";
import { LeafDecoration } from "./Decorations";
import { Youtube, Heart, BookOpen } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-accent text-main mt-20 overflow-hidden">
            {/* wavy top edge */}
            <div className="absolute -top-1 left-0 w-full overflow-hidden leading-none">
                <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-10 fill-background">
                    <path d="M0,0 L0,30 Q150,0 300,30 Q450,60 600,30 Q750,0 900,30 Q1050,60 1200,30 L1200,0 Z" />
                </svg>
            </div>

            <LeafDecoration className="absolute -left-6 bottom-6 w-36 h-36 text-main/5 rotate-45" />

            <div className="container mx-auto px-6 pt-20 pb-10 relative z-10">
                <div className="flex flex-col items-center text-center gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-main/15 rounded-xl flex items-center justify-center group-hover:bg-main/25 transition-colors">
                            <BookOpen className="w-5 h-5 text-main" />
                        </div>
                        <span className="text-2xl font-bold text-main tracking-tight">
                            ちいさなとしょかん
                        </span>
                    </Link>

                    <p className="text-main/50 max-w-sm text-sm leading-relaxed">
                        毎日のおやすみ前に、やさしい物語を。
                        <br />
                        動物たちのあったかいストーリーをお届けします。
                    </p>

                    {/* CTA */}
                    <a
                        href="https://www.youtube.com/@chiisanatoshokan?sub_confirmation=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#FF0000] text-white rounded-full font-bold text-sm hover:bg-[#E00] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/20 group"
                    >
                        <Youtube className="w-4 h-4 group-hover:animate-wiggle" />
                        チャンネル登録する
                    </a>
                </div>

                {/* Bottom */}
                <div className="mt-14 pt-6 border-t border-main/10 flex items-center justify-center gap-1 text-main/30 text-xs">
                    <span>made with</span>
                    <Heart className="w-3 h-3 text-red-400 animate-pulse" />
                    <span>&copy; 2026 ちいさなとしょかん</span>
                </div>
            </div>
        </footer>
    );
}
