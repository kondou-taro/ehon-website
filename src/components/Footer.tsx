import Link from "next/link";
import Image from "next/image";
import { LeafDecoration } from "./Decorations";
import { Youtube, Heart, BookOpen } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative mt-20 overflow-hidden">
            {/* Village illustration band */}
            <div className="relative h-48 md:h-64 overflow-hidden">
                <Image
                    src="/images/footer-village.png"
                    alt="夜の村のイラスト"
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                />
                {/* Gradient overlay to blend into footer */}
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-[#2A1A10]"></div>
            </div>

            {/* Footer content */}
            <div className="bg-[#2A1A10] text-main relative">
                <LeafDecoration className="absolute -left-6 bottom-6 w-36 h-36 text-main/5 rotate-45" />

                <div className="container mx-auto px-6 pt-12 pb-10 relative z-10">
                    <div className="flex flex-col items-center text-center gap-7">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-9 h-9 bg-main/15 rounded-xl flex items-center justify-center group-hover:bg-main/25 transition-colors">
                                <BookOpen className="w-5 h-5 text-main" />
                            </div>
                            <span className="text-xl font-bold text-main tracking-tight">
                                ちいさなとしょかん
                            </span>
                        </Link>

                        <p className="text-main/40 max-w-sm text-sm leading-relaxed">
                            毎日のおやすみ前に、やさしい物語を。
                            <br />
                            動物たちのあったかいストーリーをお届けします。
                        </p>

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

                    <div className="mt-12 pt-5 border-t border-main/10 flex items-center justify-center gap-1 text-main/25 text-xs">
                        <span>made with</span>
                        <Heart className="w-3 h-3 text-red-400 animate-pulse" />
                        <span>&copy; 2026 ちいさなとしょかん</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
