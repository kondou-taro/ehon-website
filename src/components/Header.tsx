import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-main/90 backdrop-blur-sm border-b border-accent/10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-2xl font-bold text-accent hover:opacity-80 transition-opacity flex items-center gap-2"
                >
                    📚 <span className="tracking-wide">ちいさなとしょかん</span>
                </Link>
                <nav>
                    <ul className="flex items-center gap-6">
                        <li>
                            <Link
                                href="/"
                                className="text-accent font-medium hover:text-accent/70 transition-colors"
                            >
                                トップ
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/videos"
                                className="text-accent font-medium hover:text-accent/70 transition-colors"
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
