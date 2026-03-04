import { getVideos, getVideoById } from "@/lib/data";
import YouTubePlayer from "@/components/YouTubePlayer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeafDecoration, StarDecoration, PawDecoration } from "@/components/Decorations";
import { BookOpen, Calendar, Sparkles } from "lucide-react";

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
        <article className="container mx-auto px-4 py-32 max-w-4xl relative">
            <PawDecoration className="absolute -left-10 top-20 w-32 h-32 opacity-[0.03] -rotate-12" />
            <StarDecoration className="absolute right-0 top-1/2 w-24 h-24 opacity-[0.05] animate-gentle-float" />

            <div className="mb-12 relative z-10">
                <Link
                    href="/videos"
                    className="group text-accent/40 hover:text-accent font-bold mb-10 inline-flex items-center gap-2 transition-all organic-border px-4 py-2 bg-white/50 backdrop-blur-sm border border-accent/5"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> 動画一覧にもどる
                </Link>

                <div className="flex flex-wrap items-center gap-4 mb-8">
                    <div className="flex items-center gap-2 text-accent/30 font-bold tracking-widest text-xs uppercase">
                        <Calendar className="w-4 h-4" />
                        {new Date(video.publishedAt).toLocaleDateString("ja-JP")}
                    </div>
                    <span className="bg-main text-accent px-5 py-2 rounded-full font-bold shadow-sm border border-accent/5 organic-blob-1 text-sm flex items-center gap-2">
                        <Sparkles className="w-3 h-3" />
                        {video.theme}
                    </span>
                    <span className="bg-white text-accent/50 px-5 py-2 rounded-full font-bold shadow-sm text-sm border border-accent/5 organic-blob-2">
                        対象年齢: {video.targetAge}
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-accent leading-[1.2] tracking-tighter">
                    {video.title}
                </h1>
            </div>

            <div className="mb-20 bg-white p-6 md:p-10 rounded-[3rem] shadow-[0_30px_80px_rgb(91,58,41,0.08)] border border-accent/5 organic-border relative z-10">
                <div className="organic-border overflow-hidden shadow-2xl">
                    {video.id.startsWith("video_") ? (
                        <YouTubePlayer videoId="aqz-KE-bpKQ" />
                    ) : (
                        <YouTubePlayer videoId={video.id} />
                    )}
                </div>
            </div>

            <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_10px_40px_rgb(91,58,41,0.03)] border border-accent/5 mb-24 relative z-10 overflow-hidden">
                <LeafDecoration className="absolute -right-10 -bottom-10 w-40 h-40 opacity-[0.03] rotate-180" />

                <h2 className="text-3xl font-bold text-accent mb-10 flex items-center gap-4 hand-drawn-line">
                    <BookOpen className="w-8 h-8 opacity-40" />
                    あらすじ
                </h2>
                <div className="text-xl text-accent/70 leading-[1.8] font-medium italic">
                    {video.description}
                </div>

                <div className="mt-16 p-8 bg-main/30 rounded-[2rem] border-2 border-dashed border-accent/10 relative">
                    <PawDecoration className="absolute -left-6 -top-6 w-12 h-12 opacity-20 rotate-45" />
                    <h3 className="font-bold text-accent mb-3 text-lg">このおはなしの教訓・テーマ：</h3>
                    <p className="text-accent/60 leading-relaxed font-medium">
                        {video.theme}の大切さについて、動物たちの姿を通してやさしく学べるストーリーです。
                        お子さまと一緒に、あたたかい気持ちを分かち合ってみてください。
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch justify-between gap-8 pt-12 border-t-2 border-accent/5 relative z-10">
                <div className="w-full sm:w-1/2">
                    {prevVideo && (
                        <Link
                            href={`/videos/${prevVideo.id}`}
                            className="flex flex-col items-start group p-6 rounded-3xl hover:bg-white transition-all border-2 border-transparent hover:border-accent/5"
                        >
                            <span className="text-xs font-bold text-accent/30 mb-3 tracking-widest uppercase">前の動画</span>
                            <span className="text-accent font-bold group-hover:text-accent/60 transition-colors line-clamp-1 text-lg">
                                ← {prevVideo.title}
                            </span>
                        </Link>
                    )}
                </div>
                <div className="w-full sm:w-1/2 text-right">
                    {nextVideo && (
                        <Link
                            href={`/videos/${nextVideo.id}`}
                            className="flex flex-col items-end group p-6 rounded-3xl hover:bg-white transition-all border-2 border-transparent hover:border-accent/5"
                        >
                            <span className="text-xs font-bold text-accent/30 mb-3 tracking-widest uppercase">次の動画</span>
                            <span className="text-accent font-bold group-hover:text-accent/60 transition-colors line-clamp-1 text-lg text-right">
                                {nextVideo.title} →
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}
