import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        prideRed: '#D60000', // PRIDEロゴの赤をイメージ
        prideOrange: '#FF4500', // 炎のようなオレンジ
        prideDark: '#1a202c', // 基調となるダークカラー
        prideLight: '#e2e8f0', // 明るめのテキストカラー
      },
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'], // カスタムフォントを追加
      },
    },
  },
  plugins: [],
};

export default config;