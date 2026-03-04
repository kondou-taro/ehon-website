import { getVideos, getVideoById } from "@/lib/data";
import YouTubePlayer from "@/components/YouTubePlayer";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const videos = await getVideos();
    return videos.map((video) => ({
        id: video.id,
    }));
}

export default async function VideoDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const video = await getVideoById(resolvedParams.id);

    if (!video) {
        notFound();
    }

    const allVideos = await getVideos();
    const currentIndex = allVideos.findIndex((v) => v.id === video.id);
    const prevVideo = currentIndex < allVideos.length - 1 ? allVideos[currentIndex + 1] : null;
    const nextVideo = currentIndex > 0 ? allVideos[currentIndex - 1] : null;

    return (
        <article className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-8">
                <Link href="/videos" className="text-accent/60 hover:text-accent font-medium mb-6 inline-block transition-colors">
                    ← 動画一覧にもどる
                </Link>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <time className="text-accent/60 font-medium">
                        {new Date(video.publishedAt).toLocaleDateString("ja-JP")}
                    </time>
                    <span className="bg-main text-accent px-4 py-1.5 rounded-full font-bold shadow-sm border border-accent/10">
                        #{video.theme}
                    </span>
                    <span className="bg-white text-accent/70 px-4 py-1.5 rounded-full font-bold shadow-sm text-sm border border-accent/10">
                        対象年齢: {video.targetAge}
                    </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-accent leading-tight">
                    {video.title}
                </h1>
            </div>

            <div className="mb-12 bg-white p-4 rounded-3xl shadow-lg border border-accent/5">
                {video.id.startsWith("video_") ? (
                    <YouTubePlayer videoId="aqz-KE-bpKQ" />
                ) : (
                    <YouTubePlayer videoId={video.id} />
                )}
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-accent/5 mb-16">
                <h2 className="text-2xl font-bold text-accent mb-6 flex items-center gap-3">
                    <span className="text-3xl">📖</span> あらすじ
                </h2>
                <p className="text-lg text-accent/80 leading-loose">
                    {video.description}
                </p>

                <div className="mt-12 p-6 bg-main/50 rounded-2xl border border-accent/5">
                    <h3 className="font-bold text-accent mb-2">このおはなしの教訓・テーマ：</h3>
                    <p className="text-accent/80">{video.theme}の大切さについて、やさしく学べるストーリーです。</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-accent/10">
                <div className="w-full sm:w-1/2">
                    {prevVideo && (
                        <Link
                            href={`/videos/${prevVideo.id}`}
                            className="flex flex-col items-start group"
                        >
                            <span className="text-sm text-accent/60 mb-2 font-medium">前の動画</span>
                            <span className="text-accent font-bold group-hover:text-accent/70 transition-colors line-clamp-1">
                                {prevVideo.title}
                            </span>
                        </Link>
                    )}
                </div>
                <div className="w-full sm:w-1/2 text-right">
                    {nextVideo && (
                        <Link
                            href={`/videos/${nextVideo.id}`}
                            className="flex flex-col items-end group"
                        >
                            <span className="text-sm text-accent/60 mb-2 font-medium">次の動画</span>
                            <span className="text-accent font-bold group-hover:text-accent/70 transition-colors line-clamp-1">
                                {nextVideo.title}
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}
