import Link from "next/link";
import Image from "next/image";
import { Video } from "@/lib/types";
import { Sparkles, Calendar } from "lucide-react";

export default function VideoCard({ video }: { video: Video }) {
    return (
        <Link href={`/videos/${video.id}`} className="group block h-full">
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_15px_45px_rgb(91,58,41,0.06)] border border-accent/5 transition-all duration-500 group-hover:shadow-[0_25px_60px_rgb(91,58,41,0.12)] group-hover:-translate-y-2 flex flex-col h-full organic-border">
                {/* サムネイル */}
                <div className="relative aspect-video overflow-hidden w-[92%] mx-auto mt-4 rounded-2xl organic-border shadow-inner">
                    <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-accent px-3 py-1 rounded-full text-xs font-bold shadow-sm organic-blob-1 border border-accent/5">
                        <Sparkles className="w-3 h-3" />
                        {video.theme}
                    </div>
                </div>

                {/* コンテンツ */}
                <div className="p-7 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3 text-accent/40 font-bold text-xs tracking-widest uppercase">
                        <Calendar className="w-3 h-3" />
                        {new Date(video.publishedAt).toLocaleDateString("ja-JP")}
                    </div>

                    <h3 className="text-xl font-bold text-accent mb-3 line-clamp-2 leading-[1.4] group-hover:text-accent/70 transition-colors">
                        {video.title}
                    </h3>

                    <div className="mt-auto pt-4 flex items-center justify-between">
                        <span className="text-xs font-bold text-accent/50 bg-main/50 px-3 py-1 rounded-full organic-border">
                            対象年齢: {video.targetAge}
                        </span>
                        <span className="text-accent group-hover:translate-x-1 transition-transform">
                            →
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
