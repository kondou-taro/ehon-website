import { Video } from "./types";

// フォールバック用のダミーデータ
export const dummyVideos: Video[] = [
    {
        id: "video_01",
        title: "はりねずみのハリーとあったかいふゆ",
        description: "やさしさは、めぐりめぐって、みんなをあたためる。",
        theme: "やさしさ",
        targetAge: "3〜5歳",
        publishedAt: "2026-03-05",
        thumbnailUrl: "https://images.unsplash.com/photo-1596701550993-41bbd067df41?q=80&w=1280&auto=format&fit=crop",
    },
    {
        id: "video_02",
        title: "うさぎのミミとまほうのはなばたけ",
        description: "やさしいきもちは、おはなをさかせる。",
        theme: "思いやり",
        targetAge: "3〜5歳",
        publishedAt: "2026-03-06",
        thumbnailUrl: "https://images.unsplash.com/photo-1582216669966-285b7c7b8e1a?q=80&w=1280&auto=format&fit=crop",
    },
    {
        id: "video_03",
        title: "くじらのクーとゆうきのうみ",
        description: "こわくても、いっぽふみだせば、せかいはひろがる。",
        theme: "勇気",
        targetAge: "3〜5歳",
        publishedAt: "2026-03-07",
        thumbnailUrl: "https://images.unsplash.com/photo-1549480119-e58f0dd8cc38?q=80&w=1280&auto=format&fit=crop",
    }
];

export async function getVideos(): Promise<Video[]> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
        console.warn("YouTube APIキーまたはチャンネルIDが設定されていません。ダミーデータを表示します。");
        return dummyVideos;
    }

    try {
        // チャンネルのアップロードプレイリストIDを取得
        const channelRes = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
            { next: { revalidate: 3600 } } // 1時間キャッシュ
        );

        if (!channelRes.ok) {
            throw new Error("チャンネル情報の取得に失敗しました");
        }

        const channelData = await channelRes.json();
        if (!channelData.items || channelData.items.length === 0) {
            return dummyVideos;
        }

        const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

        // プレイリストから動画一覧を取得
        const playlistRes = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=10&key=${apiKey}`,
            { next: { revalidate: 3600 } }
        );

        if (!playlistRes.ok) {
            throw new Error("プレイリストの取得に失敗しました");
        }

        const playlistData = await playlistRes.json();

        const videos: Video[] = playlistData.items.map((item: any) => {
            const snippet = item.snippet;
            const id = snippet.resourceId.videoId;
            const title = snippet.title;
            // YouTubeの説明文から改行区切りで情報を抽出する簡易的なロジック
            const fullDesc = snippet.description || "";
            const descLines = fullDesc.split('\n');

            const defaultDesc = "やさしい絵本のストーリーです。";

            return {
                id,
                title,
                description: descLines[0] || defaultDesc,
                theme: "やさしさ・思いやり", // 説明文から抽出できない場合のデフォルト
                targetAge: "3〜5歳",       // デフォルト
                publishedAt: snippet.publishedAt,
                thumbnailUrl: snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
            };
        });

        return videos.length > 0 ? videos : dummyVideos;

    } catch (error) {
        console.error("YouTube APIフェッチエラー:", error);
        return dummyVideos;
    }
}

export async function getVideoById(id: string): Promise<Video | undefined> {
    const videos = await getVideos();
    return videos.find((v) => v.id === id);
}
