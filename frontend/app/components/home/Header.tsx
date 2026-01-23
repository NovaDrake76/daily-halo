import React from "react";

interface HeaderProps {
  isGameOver: boolean;
  guessesLeft: number;
}

export const Header: React.FC<HeaderProps> = ({ isGameOver, guessesLeft }) => {
  return (
    <header className="text-center mb-8">
      <div className="inline-block relative">
        <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 scale-150"></div>
        <h1 className="relative text-6xl md:text-7xl text-[#0a8bfa] tracking-tight mb-3 italic font-bold drop-shadow-[0_2px_8px_rgba(10,139,250,0.5)] shadow-black">
          Daily{" "}
          <span className="text-[#272727] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            Halo
          </span>
        </h1>
      </div>
      <div className="flex items-center justify-center gap-3 mt-4">
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-slate-400 to-transparent drop-shadow-sm"></div>
        <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
          Schale Database
        </p>
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-slate-400 to-transparent drop-shadow-sm"></div>
      </div>
      {!isGameOver && (
        <p className="text-slate-600 mt-6 font-medium text-lg">
          Guess the random student of the day!
        </p>
      )}
      {!isGameOver && (
        <p className="text-slate-500 font-bold mt-2 text-sm">
          Attempts Remaining:{" "}
          <span className={guessesLeft <= 3 ? "text-red-500" : "text-blue-500"}>
            {guessesLeft}
          </span>
        </p>
      )}
    </header>
  );
};
