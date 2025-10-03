import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";
// import Script from "next/script"; // next/script は不要です。直接 <head> にリンクタグを記述します。

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "俺たちのPRIDE伝説 - 漢の異名当てクイズ",
  description: "30代〜40代男性が胸アツになるPRIDE異名当てクイズ！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Google Fonts (Press Start 2P) のインポート */}
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}