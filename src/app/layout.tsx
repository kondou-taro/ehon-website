import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const zenMaruGothic = Zen_Maru_Gothic({
  variable: "--font-zen-maru",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ちいさなとしょかん",
  description: "やさしい絵本のおはなしを、毎日おとどけ。動物たちのあったかいストーリーで、お子さまのおやすみ前にどうぞ。",
  openGraph: {
    title: "ちいさなとしょかん",
    description: "やさしい絵本のおはなしを、毎日おとどけ。動物たちのあったかいストーリーで、お子さまのおやすみ前にどうぞ。",
    images: [
      {
        url: "/images/ogp.png",
        width: 1200,
        height: 630,
        alt: "ちいさなとしょかん - やさしい絵本のおはなしを、毎日おとどけ。",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ちいさなとしょかん",
    description: "やさしい絵本のおはなしを、毎日おとどけ。",
    images: ["/images/ogp.png"],
  },
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${zenMaruGothic.variable} antialiased selection:bg-warm-light selection:text-accent flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
