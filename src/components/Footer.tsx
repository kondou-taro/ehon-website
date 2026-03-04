import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-accent text-main py-12 mt-20">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-6">
                <Link
                    href="/"
                    className="text-2xl font-bold tracking-wide hover:text-main/80 transition-colors"
                >
                    ちいさなとしょかん
                </Link>

                <a
                    href="https://www.youtube.com/@chiisanatoshokan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-main text-accent rounded-full font-bold hover:bg-main/90 transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg"
                >
                    ▶︎ YouTubeチャンネル
                </a>

                <div className="text-sm text-main/80 mt-4">
                    &copy; 2026 ちいさなとしょかん
                </div>
            </div>
        </footer>
    );
}
