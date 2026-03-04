import Image from "next/image";
import { getVideos } from "@/lib/data";
import VideoCard from "@/components/VideoCard";
import YouTubePlayer from "@/components/YouTubePlayer";

export default async function Home() {
  const videos = await getVideos();
  const latestVideo = videos[0];

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-b from-main to-white py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest text-accent mb-8 leading-tight">
            やさしい絵本のおはなしを、
            <br className="hidden md:block" />
            毎日おとどけ。
          </h1>
          <p className="text-lg md:text-xl text-accent/80 font-medium leading-relaxed max-w-2xl mx-auto">
            📚 動物たちのあったかいストーリーで、
            <br />
            お子さまのおやすみ前にどうぞ。
          </p>
        </div>
      </section>

      {/* 動画がない場合 */}
      {videos.length === 0 && (
        <section className="container mx-auto px-4 text-center py-20">
          <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-accent/5 max-w-2xl mx-auto">
            <span className="text-6xl mb-6 block">✨</span>
            <h2 className="text-2xl font-bold text-accent mb-4">まだ動画がありません</h2>
            <p className="text-accent/70 text-lg">
              もうすぐ絵本のおはなしが届きます。
              <br />
              楽しみにお待ちください。
            </p>
          </div>
        </section>
      )}

      {/* 最新動画プレイヤー */}
      {latestVideo && (
        <section className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-accent inline-block relative">
              最新のおはなし
              <span className="absolute -bottom-3 left-0 w-full h-1 bg-accent/20 rounded-full"></span>
            </h2>
          </div>
          <div className="bg-white p-4 md:p-8 rounded-[2rem] shadow-xl border border-accent/10">
            {/* ダミーデータのIDまたは本番APIのIDを使用 */}
            {latestVideo.id.startsWith("video_") ? (
              <YouTubePlayer videoId="aqz-KE-bpKQ" />
            ) : (
              <YouTubePlayer videoId={latestVideo.id} />
            )}
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold text-accent mb-6">{latestVideo.title}</h3>
              <a
                href="https://www.youtube.com/@chiisanatoshokan?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF0000] text-white rounded-full font-bold text-lg hover:bg-[#CC0000] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/30"
              >
                ▶︎ チャンネル登録してね
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 動画一覧セクション */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-accent relative">
            最近の動画
            <span className="absolute -bottom-3 left-0 w-8 h-1 bg-accent rounded-full"></span>
          </h2>
          <a href="/videos" className="text-accent font-bold hover:text-accent/70 transition-colors flex items-center gap-1">
            もっと見る <span>→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.slice(0, 3).map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
    </div>
  );
}
