import { Video } from "./types";

// モックデータを完全に削除
const mockVideos: Video[] = [];

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
