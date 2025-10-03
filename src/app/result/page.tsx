'use client';

import Button from "@/components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { FaXTwitter } from 'react-icons/fa6'; // Twitterアイコン用 (npm install react-icons が必要)

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const scoreParam = searchParams.get('score');
    const totalParam = searchParams.get('total');
    if (scoreParam && totalParam) {
      setScore(parseInt(scoreParam, 10));
      setTotal(parseInt(totalParam, 10));
    } else {
      // パラメータがない場合はトップページに戻すなどのエラーハンドリング
      router.push('/');
    }
  }, [searchParams, router]);

  const percentage = total > 0 ? (score / total) * 100 : 0;

  const getResultMessage = useCallback(() => {
    if (percentage === 100) {
      return "完全勝利！お前は伝説の漢だ！！";
    } else if (percentage >= 80) {
      return "素晴らしい！まだやれるぞ！";
    } else if (percentage >= 50) {
      return "まずまずだ。しかし、伝説への道は遠い…！";
    } else if (percentage < 50 && total > 0) {
      return "出直してこい！もっとPRIDEを観ろ！";
    }
    return "戦績不明...";
  }, [percentage, total]);

  const handleRetry = () => {
    router.push('/');
  };

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=俺たちのPRIDE伝説で${total}問中${score}問正解！\n${encodeURIComponent(getResultMessage())}\n%23PRIDE伝説 %23異名当てクイズ&url=${encodeURIComponent(window.location.origin)}`;

  return (
    <div className="bg-prideDark bg-opacity-80 p-6 sm:p-10 rounded-xl shadow-2xl border-4 border-prideRed w-full max-w-md mx-auto text-center animate-fade-in">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-prideOrange mb-6 font-press-start leading-snug">
        試合終了！
      </h2>
      <p className="text-prideLight text-2xl sm:text-3xl font-bold mb-4">
        戦績：{total > 0 ? `${score} / ${total} 問正解！` : '---'}
      </p>
      <p className="text-white text-xl sm:text-2xl font-bold mb-8">
        正答率：{percentage.toFixed(1)}%
      </p>

      <p className="text-prideLight text-2xl sm:text-3xl font-press-start mb-10">
        {getResultMessage()}
      </p>

      <div className="flex flex-col gap-4">
        <Button onClick={handleRetry} className="w-full">
          もう一度挑戦！
        </Button>
        <Link href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button variant="secondary" className="w-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center">
            <FaXTwitter className="mr-2 text-2xl" /> Xで戦績を叫ぶ！
          </Button>
        </Link>
      </div>
    </div>
  );
}
