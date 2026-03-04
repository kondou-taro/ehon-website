import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Header() {
    return (
        <header className="fixed top-4 left-0 right-0 z-[100] px-4">
            <div className="container mx-auto px-6 h-18 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-accent/10 shadow-[0_8px_32px_rgb(91,58,41,0.1)] flex items-center justify-between organic-border">
                <Link
                    href="/"
                    className="text-2xl font-bold text-accent hover:opacity-80 transition-all flex items-center gap-2 group"
                >
                    <BookOpen className="w-8 h-8 text-accent group-hover:rotate-12 transition-transform duration-300" />
                    <span className="tracking-tighter">ちいさなとしょかん</span>
                </Link>
                <nav>
                    <ul className="flex items-center gap-8">
                        <li>
                            <Link
                                href="/"
                                className="text-accent font-bold hover:text-accent/60 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
                            >
                                トップ
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/videos"
                                className="text-accent font-bold hover:text-accent/60 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
                            >
                                動画一覧
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
