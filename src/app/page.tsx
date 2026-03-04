import Link from "next/link";
import { getVideos } from "@/lib/data";
import VideoCard from "@/components/VideoCard";
import YouTubePlayer from "@/components/YouTubePlayer";
import { LeafDecoration, StarDecoration, PawDecoration } from "@/components/Decorations";

export default async function Home() {
  const videos = await getVideos();
  const latestVideo = videos[0];

  return (
    <div className="flex flex-col gap-24 pb-24 relative pt-20">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 text-center">
        <LeafDecoration className="absolute -left-20 top-0 w-64 h-64 -rotate-12 opacity-[0.03] animate-pulse" />
        <StarDecoration className="absolute right-10 top-20 w-32 h-32 rotate-12 opacity-[0.04] animate-gentle-float" />

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="mb-12 inline-block px-8 py-3 bg-white/50 backdrop-blur-sm border-2 border-accent/10 rounded-full text-accent font-bold tracking-widest text-sm organic-border animate-gentle-float">
            🏠 ちいさなとしょかんへようこそ
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-accent mb-10 leading-[1.1]">
            やさしい絵本の
            <br />
            おはなしを、
            <span className="hand-drawn-line inline-block px-4">毎日おとどけ。</span>
          </h1>
          <p className="text-xl md:text-2xl text-accent/70 font-medium leading-loose max-w-2xl mx-auto italic">
            「動物たちのあったかいストーリーで、
            <br className="hidden md:block" />
            お子さまのおやすみ前に、夢の入り口を。」
          </p>
        </div>
      </section>

      {/* 動画がない場合 */}
      {videos.length === 0 && (
        <section className="container mx-auto px-4 text-center py-20">
          <div className="bg-white p-12 rounded-[3rem] shadow-[0_20px_60px_rgb(91,58,41,0.05)] border border-accent/5 max-w-2xl mx-auto organic-border">
            <span className="text-6xl mb-6 block animate-bounce">✨</span>
            <h2 className="text-2xl font-bold text-accent mb-4">まだ動画がありません</h2>
            <p className="text-accent/60 text-lg leading-relaxed">
              もうすぐ絵本のおはなしが届きます。
              <br />
              楽しみにお待ちください。
            </p>
          </div>
        </section>
      )}

      {/* 最新動画プレイヤー */}
      {latestVideo && (
        <section className="container mx-auto px-4 max-w-5xl relative">
          <PawDecoration className="absolute -right-10 -bottom-10 w-40 h-40 rotate-12 opacity-[0.03]" />

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-accent inline-block relative px-10">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl opacity-20">📖</span>
              今日のおはなし
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-4xl opacity-20">📖</span>
              <span className="absolute -bottom-4 left-0 w-full h-1.5 bg-accent/10 rounded-full border-b border-accent/5"></span>
            </h2>
          </div>
          <div className="bg-white p-6 md:p-12 rounded-[3rem] shadow-[0_30px_100px_rgb(91,58,41,0.1)] border border-accent/5 organic-border relative">
            <div className="organic-border overflow-hidden shadow-2xl">
              {/* ダミーデータのIDまたは本番APIのIDを使用 */}
              {latestVideo.id.startsWith("video_") ? (
                <YouTubePlayer videoId="aqz-KE-bpKQ" />
              ) : (
                <YouTubePlayer videoId={latestVideo.id} />
              )}
            </div>
            <div className="mt-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-accent mb-8 tracking-tight">{latestVideo.title}</h3>
              <a
                href="https://www.youtube.com/@chiisanatoshokan?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-12 py-5 bg-[#FF0000] text-white rounded-full font-bold text-xl hover:bg-[#CC0000] transition-all hover:scale-105 active:scale-95 shadow-[0_15px_40px_rgba(255,0,0,0.3)] organic-border"
              >
                <span>▶︎</span> チャンネル登録してね
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 動画一覧セクション */}
      <section className="container mx-auto px-4 max-w-6xl relative">
        <StarDecoration className="absolute -left-10 bottom-0 w-24 h-24 opacity-10 animate-gentle-float" />

        <div className="flex items-end justify-between mb-16 border-b-2 border-accent/5 pb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-accent flex items-center gap-4">
            <span className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-xl organic-blob-1">🎬</span>
            さいきんの動画
          </h2>
          <Link href="/videos" className="bg-white px-6 py-2.5 rounded-full text-accent font-bold border border-accent/10 hover:bg-accent hover:text-white transition-all shadow-sm organic-border">
            すべて見る <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {videos.slice(0, 3).map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
    </div>
  );
}
