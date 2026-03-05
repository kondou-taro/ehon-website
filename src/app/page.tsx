import Link from "next/link";
import { getVideos } from "@/lib/data";
import VideoCard from "@/components/VideoCard";
import YouTubePlayer from "@/components/YouTubePlayer";
import { CloudDecoration, SparkleDecoration, PawDecoration, LeafDecoration } from "@/components/Decorations";
import { BouncyText, FadeUp, FloatingElement } from "@/components/AnimatedText";
import { BookOpen, ArrowRight, Youtube, Sparkles } from "lucide-react";

export default async function Home() {
  const videos = await getVideos();
  const latestVideo = videos[0];

  return (
    <div className="flex flex-col relative">

      {/* ━━━━━ KV / Hero ━━━━━ */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden">
        {/* Background decorations */}
        <FloatingElement className="absolute left-[5%] top-[15%] text-accent" duration={8} y={20}>
          <CloudDecoration className="w-48 h-24 opacity-[0.04]" />
        </FloatingElement>
        <FloatingElement className="absolute right-[8%] top-[25%] text-warm" duration={6} y={14}>
          <SparkleDecoration className="w-10 h-10 opacity-30" />
        </FloatingElement>
        <FloatingElement className="absolute left-[15%] bottom-[20%] text-warm" duration={10} y={16}>
          <PawDecoration className="w-20 h-20 opacity-[0.08]" />
        </FloatingElement>
        <FloatingElement className="absolute right-[12%] bottom-[30%] text-accent" duration={9} y={12}>
          <LeafDecoration className="w-16 h-16 opacity-[0.06]" />
        </FloatingElement>

        <div className="container mx-auto max-w-3xl text-center relative z-10 pt-24 pb-16">
          {/* Badge */}
          <FadeUp delay={0}>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-warm/10 text-warm rounded-full text-sm font-bold mb-10">
              <Sparkles className="w-3.5 h-3.5" />
              ちいさなとしょかんへようこそ
            </div>
          </FadeUp>

          {/* Main copy — each line bounces in */}
          <div className="space-y-1 mb-10">
            <BouncyText
              text="やさしい絵本の"
              className="text-4xl md:text-6xl font-bold text-accent tracking-tight"
              delay={0.2}
            />
            <BouncyText
              text="おはなしを、"
              className="text-4xl md:text-6xl font-bold text-accent tracking-tight"
              delay={0.6}
            />
            <div className="pt-2">
              <BouncyText
                text="毎日おとどけ。"
                className="text-4xl md:text-6xl font-bold text-warm tracking-tight hand-drawn-underline"
                delay={1.0}
              />
            </div>
          </div>

          {/* Sub copy */}
          <FadeUp delay={1.4}>
            <p className="text-lg md:text-xl text-accent/50 leading-relaxed max-w-lg mx-auto">
              動物たちのあったかいストーリーで、
              <br />
              お子さまのおやすみ前に夢の入り口を。
            </p>
          </FadeUp>

          {/* CTA */}
          <FadeUp delay={1.8}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
              <a
                href="https://www.youtube.com/@chiisanatoshokan?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#FF0000] text-white rounded-2xl font-bold hover:bg-[#E00] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/20 group"
              >
                <Youtube className="w-5 h-5 group-hover:animate-wiggle" />
                チャンネル登録する
              </a>
              <Link
                href="/videos"
                className="inline-flex items-center gap-2 px-6 py-4 text-accent font-bold hover:bg-accent/5 rounded-2xl transition-all group"
              >
                動画を見る
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ━━━━━ Latest Video ━━━━━ */}
      {latestVideo && (
        <section className="container mx-auto px-4 max-w-4xl py-20 relative">
          <FadeUp>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-warm/15 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-warm" />
              </div>
              <h2 className="text-2xl font-bold text-accent">今日のおはなし</h2>
              <div className="flex-1 h-px bg-accent/5 ml-4"></div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="bg-white rounded-3xl p-5 md:p-8 shadow-[0_8px_40px_rgb(91,58,41,0.06)] border border-accent/5">
              <div className="rounded-2xl overflow-hidden shadow-md">
                {latestVideo.id.startsWith("video_") ? (
                  <YouTubePlayer videoId="aqz-KE-bpKQ" />
                ) : (
                  <YouTubePlayer videoId={latestVideo.id} />
                )}
              </div>
              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-accent leading-snug">
                  {latestVideo.title}
                </h3>
                <Link
                  href={`/videos/${latestVideo.id}`}
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-warm/10 text-warm rounded-xl font-bold text-sm hover:bg-warm/20 transition-colors group"
                >
                  くわしく見る
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </FadeUp>
        </section>
      )}

      {/* ━━━━━ Empty state ━━━━━ */}
      {videos.length === 0 && (
        <section className="container mx-auto px-4 text-center py-20 max-w-md">
          <FadeUp>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-accent/5">
              <div className="w-16 h-16 bg-warm/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-7 h-7 text-warm" />
              </div>
              <h2 className="text-xl font-bold text-accent mb-3">まだ動画がありません</h2>
              <p className="text-accent/40 text-sm leading-relaxed">
                もうすぐ絵本のおはなしが届きます。
                <br />
                楽しみにお待ちください。
              </p>
            </div>
          </FadeUp>
        </section>
      )}

      {/* ━━━━━ Recent Videos ━━━━━ */}
      {videos.length > 0 && (
        <section className="container mx-auto px-4 max-w-6xl py-20">
          <FadeUp>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="wavy-divider"></div>
                <h2 className="text-2xl font-bold text-accent">さいきんのおはなし</h2>
              </div>
              <Link
                href="/videos"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-accent/50 hover:text-accent hover:bg-accent/5 rounded-xl transition-all group"
              >
                すべて見る
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.slice(0, 3).map((video, i) => (
              <FadeUp key={video.id} delay={0.1 * i}>
                <VideoCard video={video} />
              </FadeUp>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
