import { getVideos } from "@/lib/data";
import VideoCard from "@/components/VideoCard";
import { LeafDecoration, StarDecoration } from "@/components/Decorations";
import { Sparkles } from "lucide-react";

export const metadata = {
    title: "動画一覧 | ちいさなとしょかん",
    description: "ちいさなとしょかんの動画一覧です。",
};

export default async function VideosPage() {
    const videos = await getVideos();

    return (
        <div className="container mx-auto px-4 py-32 max-w-6xl relative">
            <LeafDecoration className="absolute -left-20 top-20 w-64 h-64 -rotate-12 opacity-[0.03]" />

            <div className="mb-20 text-center relative z-10">
                <div className="mb-6 inline-flex items-center gap-2 px-6 py-2 bg-accent/5 rounded-full text-accent font-bold text-sm organic-border mx-auto w-fit">
                    <Sparkles className="w-4 h-4" />
                    おはなしの小部屋
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-accent inline-block relative px-12">
                    動画一覧
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-2 bg-accent/10 rounded-full border-b border-accent/5"></span>
                </h1>
                <p className="mt-12 text-accent/50 font-bold tracking-widest uppercase text-sm">
                    全 {videos.length} 冊のおはなし
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
                {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
}
