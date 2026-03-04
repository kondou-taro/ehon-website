import { getVideos } from "@/lib/data";
import VideoCard from "@/components/VideoCard";

export const metadata = {
    title: "動画一覧 | ちいさなとしょかん",
    description: "ちいさなとしょかんの動画一覧です。",
};

export default async function VideosPage() {
    const videos = await getVideos();

    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-accent inline-block relative">
                    動画一覧
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-accent/30 rounded-full"></span>
                </h1>
                <p className="mt-8 text-accent/70 font-medium text-lg">
                    全 {videos.length} 件のおはなし
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
}
