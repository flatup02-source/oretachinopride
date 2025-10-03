import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 mb-8 text-center bg-prideDark bg-opacity-70 shadow-xl border-b-4 border-prideRed">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-wide font-press-start">
        俺たちのPRIDE伝説
      </h1>
      <p className="text-prideOrange text-lg sm:text-xl mt-2 font-bold font-press-start">
        〜 漢の異名当てクイズ 〜
      </p>
    </header>
  );
};

export default Header;