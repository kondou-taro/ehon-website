import { Video } from "./types";

export interface YouTubeVideoData {
    id: string;
    title: string;
    thumbnailUrl: string;
    publishedAt: string;
    description: string;
}

export function parseDescription(description: string, title: string): {
    synopsis: string;
    theme: string;
    targetAge: string;
} {
    const lines = description.split("\n").map((line) => line.trim());

    const fullText = (title + " " + description).toLowerCase();
    let synopsis = "";
    let themeValue = "";
    let targetAgeValue = "";

    // まず「あらすじ:」「テーマ:」「対象年齢:」のラベル付き行を探す
    lines.forEach((line) => {
        if (line.startsWith("あらすじ:")) {
            synopsis = line.replace("あらすじ:", "").trim();
        } else if (line.startsWith("テーマ:")) {
            themeValue = line.replace("テーマ:", "").trim();
        } else if (line.startsWith("対象年齢:")) {
            targetAgeValue = line.replace("対象年齢:", "").trim();
        }
    });

    // テーマの自動推測（手動設定がない場合）
    if (!themeValue) {
        if (fullText.includes("冒険") || fullText.includes("勇気") || fullText.includes("洞窟")) themeValue = "勇気・冒険";
        else if (fullText.includes("友情") || fullText.includes("ともだち") || fullText.includes("仲間")) themeValue = "友情・きずな";
        else if (fullText.includes("冬") || fullText.includes("雪") || fullText.includes("秋") || fullText.includes("あったかい")) themeValue = "季節のぬくもり";
        else if (fullText.includes("笑") || fullText.includes("おもしろ") || fullText.includes("コミカル") || fullText.includes("ハプニング") || fullText.includes("失敗") || fullText.includes("クスッと")) themeValue = "わらい・おもしろ";
        else if (fullText.includes("魔法") || fullText.includes("ふしぎ") || fullText.includes("夢")) themeValue = "想像力・ゆめ";
        else if (fullText.includes("ありがとう") || fullText.includes("感謝") || fullText.includes("うた")) themeValue = "かんしゃ";
        else if (fullText.includes("自分") || fullText.includes("一生懸命") || fullText.includes("色")) themeValue = "じぶんらしさ";
        else themeValue = "やさしさ";
    }

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
    const theme = themeValue || "やさしさ";
    const targetAge = targetAgeValue || "3〜5歳";

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
        const { synopsis, theme, targetAge } = parseDescription(rawDescription, rawTitle);

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
