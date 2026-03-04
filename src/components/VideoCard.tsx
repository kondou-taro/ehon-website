import Link from "next/link";
import Image from "next/image";
import { Video } from "@/lib/types";

interface VideoCardProps {
    video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
    return (
        <Link href={`/videos/${video.id}`} className="group block h-full">
            <article className="bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgb(91,58,41,0.05)] hover:shadow-[0_20px_50px_rgb(91,58,41,0.12)] transition-all duration-500 h-full flex flex-col border border-accent/5 group-hover:-translate-y-2 organic-border">
                <div className="relative aspect-video w-[90%] mx-auto mt-4 overflow-hidden bg-accent/5 organic-border">
                    <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
                </div>

                <div className="p-7 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-4 text-xs">
                        <span className="bg-main text-accent px-4 py-1.5 rounded-full font-bold shadow-sm border border-accent/5 organic-blob-1">
                            #{video.theme}
                        </span>
                        <time className="text-accent/40 font-bold tracking-wider uppercase">
                            {new Date(video.publishedAt).toLocaleDateString("ja-JP")}
                        </time>
                    </div>

                    <h3 className="text-xl font-bold text-accent mb-3 line-clamp-2 leading-[1.4] group-hover:text-accent/70 transition-colors">
                        {video.title}
                    </h3>

                    <p className="text-accent/60 text-sm mt-auto line-clamp-2 leading-relaxed">
                        {video.description}
                    </p>
                </div>
            </article>
        </Link>
    );
}
