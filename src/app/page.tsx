import Link from "next/link";
import Image from "next/image";
import { getVideos } from "@/lib/data";
import { Video } from "@/lib/types";
import VideoCard from "@/components/VideoCard";
import ShortVideoCard from "@/components/ShortVideoCard";
import YouTubePlayer from "@/components/YouTubePlayer";
import { SparkleDecoration, PawDecoration, LeafDecoration } from "@/components/Decorations";
import { BouncyText, FadeUp, FloatingElement } from "@/components/AnimatedText";
import { BookOpen, ArrowRight, Youtube, Sparkles } from "lucide-react";

export default async function Home() {
  const videos = await getVideos();
  const regularVideos = videos.filter((v: Video) => !v.isShort);
  const shortVideos = videos.filter((v: Video) => v.isShort);
  const latestVideo = regularVideos.length > 0 ? regularVideos[0] : videos[0];

  return (
    <div className="flex flex-col relative">

      {/* ━━━━━ KV / Hero ━━━━━ */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
        {/* Decorations */}
        <FloatingElement className="absolute right-[8%] top-[18%] text-warm" duration={5} y={10}>
          <SparkleDecoration className="w-8 h-8 opacity-40" />
        </FloatingElement>
        <FloatingElement className="absolute left-[10%] bottom-[25%] text-warm" duration={8} y={14}>
          <PawDecoration className="w-16 h-16 opacity-[0.1]" />
        </FloatingElement>
        <FloatingElement className="absolute right-[15%] bottom-[18%] text-accent" duration={10} y={12}>
          <LeafDecoration className="w-14 h-14 opacity-[0.08]" />
        </FloatingElement>

        <div className="container mx-auto max-w-5xl relative z-10 pt-24 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* Left: Text */}
            <div className="text-center md:text-left order-2 md:order-1">
              <FadeUp delay={0}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-warm/10 text-warm rounded-full text-xs font-bold mb-8">
                  <Sparkles className="w-3 h-3" />
                  ちいさなとしょかんへようこそ
                </div>
              </FadeUp>

              <div className="space-y-0.5 mb-8">
                <BouncyText
                  text="やさしい絵本の"
                  className="text-3xl md:text-5xl font-bold text-accent tracking-tight"
                  delay={0.3}
                />
                <BouncyText
                  text="おはなしを、"
                  className="text-3xl md:text-5xl font-bold text-accent tracking-tight"
                  delay={0.7}
                />
                <div className="pt-1">
                  <BouncyText
                    text="毎日おとどけ。"
                    className="text-3xl md:text-5xl font-bold text-warm tracking-tight hand-drawn-underline"
                    delay={1.1}
                  />
                </div>
              </div>

              <FadeUp delay={1.4}>
                <p className="text-base text-accent/50 leading-relaxed max-w-md mx-auto md:mx-0 mb-10">
                  動物たちのあったかいストーリーで、
                  <br />
                  お子さまのおやすみ前に夢の入り口を。
                </p>
              </FadeUp>

              <FadeUp delay={1.7}>
                <div className="flex flex-col sm:flex-row items-center md:items-start gap-3">
                  <a
                    href="https://www.youtube.com/@chiisanatoshokan?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FF0000] text-white rounded-2xl font-bold text-sm hover:bg-[#E00] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/20 group"
                  >
                    <Youtube className="w-4 h-4 group-hover:animate-wiggle" />
                    チャンネル登録する
                  </a>
                  <Link
                    href="/videos"
                    className="inline-flex items-center gap-2 px-5 py-3.5 text-accent/60 font-bold hover:text-accent hover:bg-accent/5 rounded-2xl transition-all group text-sm"
                  >
                    動画を見る
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </FadeUp>
            </div>

            {/* Right: Hero Illustration */}
            <FadeUp delay={0.5} className="order-1 md:order-2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-warm/5 rounded-full blur-3xl scale-90"></div>
                <Image
                  src="/images/hero.png"
                  alt="動物たちが絵本を読んでいるイラスト"
                  width={500}
                  height={500}
                  className="relative z-10 drop-shadow-lg animate-hero-float rounded-3xl bg-[#FFF8E8]"
                  priority
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ━━━━━ Latest Video ━━━━━ */}
      {latestVideo && (
        <section className="container mx-auto px-4 max-w-4xl py-16 relative">
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
        <section className="container mx-auto px-4 text-center py-16 max-w-md">
          <FadeUp>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-accent/5">
              <Image
                src="/images/empty-state.png"
                alt="星を見つめるくまの子"
                width={240}
                height={240}
                className="mx-auto mb-6 rounded-2xl"
              />
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
      {regularVideos.length > 0 && (
        <section className="container mx-auto px-4 max-w-6xl py-16">
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
            {regularVideos.slice(0, 3).map((video: Video, i: number) => (
              <FadeUp key={video.id} delay={0.1 * i}>
                <VideoCard video={video} />
              </FadeUp>
            ))}
          </div>
        </section>
      )}

      {/* ━━━━━ Shorts Section ━━━━━ */}
      {shortVideos.length > 0 && (
        <section className="container mx-auto px-4 max-w-6xl pt-8 pb-20 relative overflow-hidden">
          <FadeUp>
            <div className="flex flex-col mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="wavy-divider"></div>
                <h2 className="text-2xl font-bold text-accent">ショート絵本</h2>
                <span className="text-xs font-bold text-warm bg-warm/15 px-3 py-1 rounded-full ml-1">
                  サクッと見れる！
                </span>
              </div>
              <p className="text-accent/50 text-sm ml-12">短い時間で楽しめる、ちょっとしたお話。</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            {/* 横スクロール対応コンテナ */}
            <div className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory no-scrollbar">
              {shortVideos.map((video: Video) => (
                <div key={video.id} className="snap-start shrink-0">
                  <ShortVideoCard video={video} />
                </div>
              ))}
            </div>
          </FadeUp>
        </section>
      )}
    </div>
  );
}
