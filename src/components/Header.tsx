import Link from "next/link";
import { BookOpen, Library } from "lucide-react";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-[100]">
            <div className="container mx-auto px-4 pt-4">
                <div className="px-6 py-3.5 glass-card rounded-2xl shadow-[0_4px_24px_rgb(91,58,41,0.08)] flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2.5 group"
                    >
                        <div className="w-9 h-9 bg-warm/20 rounded-xl flex items-center justify-center group-hover:bg-warm/30 transition-colors group-hover:rotate-6 duration-300">
                            <BookOpen className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-lg font-bold text-accent tracking-tight">
                            ちいさなとしょかん
                        </span>
                    </Link>

                    <nav>
                        <ul className="flex items-center gap-1">
                            <li>
                                <Link
                                    href="/"
                                    className="px-4 py-2 text-sm font-bold text-accent/60 hover:text-accent hover:bg-accent/5 rounded-xl transition-all"
                                >
                                    トップ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/videos"
                                    className="px-4 py-2 text-sm font-bold text-accent/60 hover:text-accent hover:bg-accent/5 rounded-xl transition-all flex items-center gap-1.5"
                                >
                                    <Library className="w-3.5 h-3.5" />
                                    動画一覧
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
