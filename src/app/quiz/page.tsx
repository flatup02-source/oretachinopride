'use client';

import Button from "@/components/Button";
import { quizData, QuizItem } from "@/data/quiz";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [shuffledQuizData, setShuffledQuizData] = useState<QuizItem[]>([]);

  useEffect(() => {
    // クイズデータをシャッフル
    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    setShuffledQuizData(shuffled);
  }, []);

  const currentQuiz = shuffledQuizData[currentQuestionIndex];

  const playSound = useCallback((type: 'correct' | 'incorrect') => {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.play().catch(e => console.error(`Failed to play ${type} sound:`, e));
  }, []);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return; // 二重回答防止

    setSelectedAnswer(answer);
    if (answer === currentQuiz.answer) {
      setCorrectCount((prev) => prev + 1);
      setFeedback('correct');
      playSound('correct');
    } else {
      setFeedback('incorrect');
      playSound('incorrect');
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setFeedback(null);
    if (currentQuestionIndex < shuffledQuizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // 全てのクイズが終了したら結果ページへ
      router.push(`/result?score=${correctCount}&total=${shuffledQuizData.length}`);
    }
  };

  if (!currentQuiz) {
    return (
      <div className="text-center text-prideLight text-xl font-press-start">
        問題がありません。伝説はこれからだ！
      </div>
    );
  }

  return (
    <div className="bg-prideDark bg-opacity-80 p-6 sm:p-10 rounded-xl shadow-2xl border-4 border-prideRed w-full max-w-md mx-auto animate-fade-in">
      <p className="text-prideLight text-lg sm:text-xl mb-4 text-center font-bold font-press-start">
        第 {currentQuestionIndex + 1} 問 / {shuffledQuizData.length}
      </p>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-prideOrange text-center mb-8 font-press-start leading-snug">
        「{currentQuiz.question}」<br/>といえば？
      </h2>

      <div className="grid grid-cols-1 gap-4 mb-8">
        {currentQuiz.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            className={`
              w-full text-center
              ${selectedAnswer === option && feedback === 'correct' ? 'bg-green-600 border-green-400' : ''}
              ${selectedAnswer === option && feedback === 'incorrect' ? 'bg-red-600 border-red-400' : ''}
              ${selectedAnswer && option === currentQuiz.answer && feedback === 'incorrect' ? 'bg-green-600 border-green-400 animate-pulse-slow' : ''}
              ${selectedAnswer && selectedAnswer !== option && option !== currentQuiz.answer ? 'opacity-60' : ''}
            `}
            variant={selectedAnswer === option && feedback === 'correct' ? 'secondary' : 'primary'} // 色を変えるためにvariantを調整
          >
            {option}
          </Button>
        ))}
      </div>

      {feedback && (
        <div className={`text-center text-2xl sm:text-3xl font-bold mb-6 font-press-start ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
          {feedback === 'correct' ? '正解！さすが漢！' : '残念！出直してこい！'}
        </div>
      )}

      {selectedAnswer && (
        <Button onClick={handleNextQuestion} className="w-full mt-4 bg-prideOrange hover:bg-prideRed">
          {currentQuestionIndex < shuffledQuizData.length - 1 ? "次の問題へ" : "結果を見る"}
        </Button>
      )}
    </div>
  );
}