import { Video } from "./types";

// 念のためここにもダミーを置いておく（fallback用）
const mockVideos: Video[] = [
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

import { fetchYouTubeVideos as fetchFromYouTube } from "./youtube";

export async function getVideos(): Promise<Video[]> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
        return mockVideos;
    }

    try {
        return await fetchFromYouTube();
    } catch (error) {
        console.error("YouTube API Fetch failed, falling back to mock data:", error);
        return mockVideos;
    }
}

export async function getVideoById(id: string): Promise<Video | undefined> {
    const videos = await getVideos();
    return videos.find((v) => v.id === id);
}
