'use client';

import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // 効果音のプリロードや再生準備
    // const audio = new Audio('/sounds/start.mp3'); // 自動再生はユーザー体験的に推奨されないため、ボタンクリックで発火がベター
  }, []);

  const handleStartQuiz = () => {
    new Audio('/sounds/start.mp3').play().catch(e => console.error("Failed to play sound:", e));
    router.push('/quiz');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-8 animate-fade-in">
        <Image 
          src="/pride-logo-bg.png" 
          alt="PRIDE Legend Logo" 
          layout="fill" 
          objectFit="contain" 
          priority 
        />
      </div>

      <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-6 font-press-start leading-tight animate-fade-in delay-200">
        伝説の異名を<br className="sm:hidden"/>呼び起こせ！
      </h2>

      <p className="text-xl sm:text-2xl text-prideLight text-center mb-10 animate-fade-in delay-400">
        あの頃の熱狂と興奮が、今、蘇る！
      </p>

      <Button onClick={handleStartQuiz} className="animate-bounce-slow animate-fade-in delay-600">
        <span className="text-2xl sm:text-3xl">異名当てクイズ開始！</span>
      </Button>
    </div>
  );
}