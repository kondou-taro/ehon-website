export interface Video {
    id: string;
    title: string;
    description: string;
    theme: string;
    targetAge: string;
    publishedAt: string;
    thumbnailUrl: string;
    isShort?: boolean;
}
