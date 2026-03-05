import { getVideos, getVideoById } from "@/lib/data";
import YouTubePlayer from "@/components/YouTubePlayer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PawDecoration } from "@/components/Decorations";
import { FadeUp } from "@/components/AnimatedText";
import { BookOpen, ArrowLeft, ArrowRight, Clock, Sparkles } from "lucide-react";

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
        <article className="container mx-auto px-4 pt-28 pb-20 max-w-3xl relative">
            <PawDecoration className="absolute right-0 top-1/3 w-20 h-20 text-accent opacity-[0.04]" />

            {/* Back link */}
            <FadeUp>
                <Link
                    href="/videos"
                    className="inline-flex items-center gap-2 text-sm font-bold text-accent/40 hover:text-accent transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    動画一覧にもどる
                </Link>
            </FadeUp>

            {/* Meta tags */}
            <FadeUp delay={0.1}>
                <div className="flex flex-wrap items-center gap-2.5 mb-5">
                    <div className="flex items-center gap-1.5 text-accent/30 text-xs font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(video.publishedAt).toLocaleDateString("ja-JP")}
                    </div>
                    <span className="bg-warm/15 text-warm px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {video.theme}
                    </span>
                    <span className="bg-accent/5 text-accent/50 px-3 py-1 rounded-lg text-xs font-bold">
                        {video.targetAge}
                    </span>
                </div>
            </FadeUp>

            {/* Title */}
            <FadeUp delay={0.2}>
                <h1 className="text-3xl md:text-4xl font-bold text-accent leading-snug tracking-tight mb-10">
                    {video.title}
                </h1>
            </FadeUp>

            {/* Video player */}
            <FadeUp delay={0.3}>
                <div className="bg-white rounded-2xl p-3 md:p-5 shadow-[0_4px_24px_rgb(91,58,41,0.06)] border border-accent/5 mb-12">
                    <div className="rounded-xl overflow-hidden">
                        {video.id.startsWith("video_") ? (
                            <YouTubePlayer videoId="aqz-KE-bpKQ" />
                        ) : (
                            <YouTubePlayer videoId={video.id} />
                        )}
                    </div>
                </div>
            </FadeUp>

            {/* Synopsis */}
            <FadeUp delay={0.4}>
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-accent/5 mb-12 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 bg-warm/15 rounded-xl flex items-center justify-center">
                            <BookOpen className="w-4.5 h-4.5 text-warm" />
                        </div>
                        <h2 className="text-xl font-bold text-accent">あらすじ</h2>
                    </div>
                    <p className="text-accent/60 leading-[1.9] text-[15px] whitespace-pre-line">
                        {video.description}
                    </p>

                    <div className="mt-8 p-5 bg-main rounded-xl border border-accent/5">
                        <h3 className="font-bold text-accent text-sm mb-2 flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-warm" />
                            テーマ
                        </h3>
                        <p className="text-accent/50 text-sm leading-relaxed">
                            {video.theme}の大切さについて、動物たちの姿を通してやさしく学べるストーリーです。
                        </p>
                    </div>
                </div>
            </FadeUp>

            {/* Prev / Next */}
            <FadeUp delay={0.5}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {prevVideo ? (
                        <Link
                            href={`/videos/${prevVideo.id}`}
                            className="flex flex-col p-5 rounded-2xl bg-white border border-accent/5 hover:border-warm/20 hover:shadow-md transition-all group"
                        >
                            <span className="text-[11px] font-bold text-accent/25 mb-2 tracking-widest uppercase">前のおはなし</span>
                            <span className="text-sm font-bold text-accent group-hover:text-warm transition-colors line-clamp-1 flex items-center gap-2">
                                <ArrowLeft className="w-3.5 h-3.5 shrink-0 group-hover:-translate-x-0.5 transition-transform" />
                                {prevVideo.title}
                            </span>
                        </Link>
                    ) : <div />}
                    {nextVideo ? (
                        <Link
                            href={`/videos/${nextVideo.id}`}
                            className="flex flex-col items-end p-5 rounded-2xl bg-white border border-accent/5 hover:border-warm/20 hover:shadow-md transition-all group"
                        >
                            <span className="text-[11px] font-bold text-accent/25 mb-2 tracking-widest uppercase">次のおはなし</span>
                            <span className="text-sm font-bold text-accent group-hover:text-warm transition-colors line-clamp-1 flex items-center gap-2">
                                {nextVideo.title}
                                <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                        </Link>
                    ) : <div />}
                </div>
            </FadeUp>
        </article>
    );
}
