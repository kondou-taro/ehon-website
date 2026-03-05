import { Video } from "./types";

export interface YouTubeVideoData {
    id: string;
    title: string;
    thumbnailUrl: string;
    publishedAt: string;
    description: string;
}

export function parseDescription(description: string): {
    synopsis: string;
    theme: string;
    targetAge: string;
} {
    const lines = description.split("\n").map((line) => line.trim());

    let synopsis = "";
    let theme = "やさしさ"; // デフォルト
    let targetAge = "3〜5歳"; // デフォルト

    // まず「あらすじ:」「テーマ:」「対象年齢:」のラベル付き行を探す
    lines.forEach((line) => {
        if (line.startsWith("あらすじ:")) {
            synopsis = line.replace("あらすじ:", "").trim();
        } else if (line.startsWith("テーマ:")) {
            theme = line.replace("テーマ:", "").trim();
        } else if (line.startsWith("対象年齢:")) {
            targetAge = line.replace("対象年齢:", "").trim();
        }
    });

    // あらすじが取得できなかった場合、説明文の冒頭から宣伝文までをあらすじとして使用
    if (!synopsis) {
        const synopsisLines: string[] = [];
        for (const line of lines) {
            // ハッシュタグ行、宣伝・CTA行で区切る
            if (
                line.startsWith("#") ||
                line.startsWith("🌟") ||
                line.includes("チャンネル登録") ||
                line.includes("高評価") ||
                line.includes("グッドボタン") ||
                line.includes("水彩画")
            ) {
                if (synopsisLines.length > 0) break;
                continue;
            }

            // 最初の空行の連続をスキップする
            if (synopsisLines.length === 0 && line === "") {
                continue;
            }

            synopsisLines.push(line);
        }
        // 取得した複数行のテキストの前後の余分な空行をトリムする
        synopsis = synopsisLines.length > 0
            ? synopsisLines.join("\n").trim()
            : "心温まる絵本のストーリーをお楽しみください。";
    }

    // テーマと対象年齢の規定値
    theme = theme || "やさしさ・思いやり";
    targetAge = targetAge || "3〜5歳";

    return { synopsis, theme, targetAge };
}

export async function fetchYouTubeVideos(): Promise<Video[]> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
        throw new Error("YouTube APIキーまたはチャンネルIDが設定されていません。");
    }

    // 1. チャンネルのアップロードプレイリストIDを取得
    const channelRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
        { next: { revalidate: 3600 } }
    );

    if (!channelRes.ok) {
        const errorData = await channelRes.json();
        console.error("YouTube Channel API Error:", errorData);
        throw new Error("YouTubeチャンネル情報の取得に失敗しました。");
    }

    const channelData = await channelRes.json();
    if (!channelData.items || channelData.items.length === 0) {
        throw new Error("YouTubeチャンネルが見つかりませんでした。");
    }

    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // 2. プレイリストから動画一覧を取得
    const playlistRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}`,
        { next: { revalidate: 3600 } }
    );

    if (!playlistRes.ok) {
        const errorData = await playlistRes.json();
        console.error("YouTube Playlist API Error:", errorData);
        throw new Error("YouTubeプレイリストの取得に失敗しました。");
    }

    const playlistData = await playlistRes.json();

    const videos: Video[] = (playlistData.items || []).map((item: any) => {
        const snippet = item.snippet;
        const rawDescription = snippet.description || "";
        const rawTitle = snippet.title || "";
        const isShort = rawTitle.toLowerCase().includes("#shorts") || rawDescription.toLowerCase().includes("#shorts");
        const { synopsis, theme, targetAge } = parseDescription(rawDescription);

        return {
            id: snippet.resourceId.videoId,
            title: snippet.title,
            description: synopsis,
            theme,
            targetAge,
            publishedAt: snippet.publishedAt,
            thumbnailUrl: snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
            isShort,
        };
    });

    return videos;
}
