import Link from "next/link";
import Image from "next/image";
import { Video } from "@/lib/types";

interface VideoCardProps {
    video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
    return (
        <Link href={`/videos/${video.id}`} className="group block h-full">
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-accent/5 group-hover:-translate-y-1">
                <div className="relative aspect-video w-full overflow-hidden bg-accent/10">
                    <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-3 text-sm">
                        <span className="bg-main text-accent px-3 py-1 rounded-full font-bold shadow-sm">
                            #{video.theme}
                        </span>
                        <time className="text-accent/60 font-medium">
                            {new Date(video.publishedAt).toLocaleDateString("ja-JP")}
                        </time>
                    </div>

                    <h3 className="text-xl font-bold text-accent mb-2 line-clamp-2 leading-tight group-hover:text-accent/80 transition-colors">
                        {video.title}
                    </h3>

                    <p className="text-accent/70 text-sm mt-auto line-clamp-2">
                        {video.description}
                    </p>
                </div>
            </article>
        </Link>
    );
}
