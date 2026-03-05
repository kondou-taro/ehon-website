import Link from "next/link";
import Image from "next/image";
import { Video } from "@/lib/types";
import { PlayCircle } from "lucide-react";

export default function ShortVideoCard({ video }: { video: Video }) {
    return (
        <Link href={`/videos/${video.id}`} className="group block relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex-none w-[160px] md:w-[200px] border-[3px] border-white ring-1 ring-accent/5">
            <div className="aspect-[9/16] relative bg-warm/10">
                <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/95 p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <PlayCircle className="w-8 h-8 text-accent" />
                    </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="inline-block px-2 py-0.5 bg-red-500/90 text-white rounded font-bold text-[10px] mb-2 shadow-sm uppercase tracking-wider">
                        Shorts
                    </p>
                    <h3 className="text-white font-bold text-sm leading-snug line-clamp-3 drop-shadow-md">
                        {video.title.replace(/#Shorts/gi, "").trim()}
                    </h3>
                </div>
            </div>
        </Link>
    );
}
