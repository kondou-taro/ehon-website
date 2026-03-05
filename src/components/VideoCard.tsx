import Link from "next/link";
import Image from "next/image";
import { Video } from "@/lib/types";
import { Clock, ArrowUpRight } from "lucide-react";

export default function VideoCard({ video }: { video: Video }) {
    return (
        <Link href={`/videos/${video.id}`} className="group block h-full">
            <article className="bg-white rounded-3xl overflow-hidden shadow-[0_2px_20px_rgb(91,58,41,0.06)] border border-accent/5 transition-all duration-500 group-hover:shadow-[0_12px_40px_rgb(91,58,41,0.12)] group-hover:-translate-y-1 flex flex-col h-full">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Theme badge */}
                    <div className="absolute bottom-3 left-3 bg-warm/90 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm backdrop-blur-sm">
                        {video.theme}
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg">
                            <ArrowUpRight className="w-5 h-5 text-accent" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-base font-bold text-accent mb-2 line-clamp-2 leading-snug group-hover:text-warm transition-colors">
                        {video.title}
                    </h3>

                    <div className="mt-auto pt-3 flex items-center justify-between text-xs text-accent/40">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {new Date(video.publishedAt).toLocaleDateString("ja-JP")}
                        </div>
                        <span className="font-bold bg-main px-2.5 py-0.5 rounded-md">
                            {video.targetAge}
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
