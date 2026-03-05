import { getVideos } from "@/lib/data";
import VideoCard from "@/components/VideoCard";
import { CloudDecoration } from "@/components/Decorations";
import { FadeUp } from "@/components/AnimatedText";
import { Library } from "lucide-react";

export const metadata = {
    title: "動画一覧 | ちいさなとしょかん",
    description: "ちいさなとしょかんの動画一覧です。",
};

export default async function VideosPage() {
    const videos = await getVideos();

    return (
        <div className="container mx-auto px-4 pt-28 pb-20 max-w-6xl relative">
            <CloudDecoration className="absolute -right-20 top-10 w-64 h-32 text-accent opacity-[0.03]" />

            <FadeUp>
                <div className="mb-14">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-warm/15 rounded-xl flex items-center justify-center">
                            <Library className="w-5 h-5 text-warm" />
                        </div>
                        <h1 className="text-3xl font-bold text-accent">動画一覧</h1>
                    </div>
                    <p className="text-accent/40 text-sm ml-[52px]">
                        全 {videos.length} 本のおはなし
                    </p>
                </div>
            </FadeUp>

            {videos.length === 0 ? (
                <FadeUp delay={0.2}>
                    <div className="text-center py-20 text-accent/30">
                        <p className="text-lg">まだおはなしがありません</p>
                        <p className="text-sm mt-2">もうすぐ届きます。楽しみにお待ちください。</p>
                    </div>
                </FadeUp>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video, i) => (
                        <FadeUp key={video.id} delay={0.05 * i}>
                            <VideoCard video={video} />
                        </FadeUp>
                    ))}
                </div>
            )}
        </div>
    );
}
