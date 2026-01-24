import React from "react";
import { GameMode } from "../../home.services";

interface HeaderProps {
  isGameOver: boolean;
  guessesLeft: number;
  globalWinCount?: number;
  gameMode: GameMode;
  onSwitchMode: (mode: GameMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isGameOver,
  guessesLeft,
  globalWinCount = 0,
  gameMode,
  onSwitchMode,
}) => {
  return (
    <header className="text-center mb-8 relative">
      <div className="absolute top-0 right-0 hidden md:block">
        {gameMode === "archive" && (
          <button
            onClick={() => onSwitchMode("daily")}
            className="text-xs font-bold bg-blue-100 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
          >
            ← Back to Daily
          </button>
        )}
      </div>

      <div className="inline-block relative">
        <div
          className={`absolute inset-0 blur-3xl opacity-20 scale-150 ${gameMode === "archive" ? "bg-purple-500" : "bg-blue-500"}`}
        ></div>

        <h1
          className={`relative text-6xl md:text-7xl tracking-tight mb-3 italic font-bold shadow-black ${
            gameMode === "archive"
              ? "text-purple-500 drop-shadow-[0_2px_8px_rgba(168,85,247,0.5)]"
              : "text-[#0a8bfa] drop-shadow-[0_2px_8px_rgba(10,139,250,0.5)]"
          }`}
        >
          {gameMode === "archive" ? "Archive" : "Daily"}{" "}
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

      <div className="md:hidden mt-4">
        {gameMode === "archive" && (
          <button
            onClick={() => onSwitchMode("daily")}
            className="text-xs font-bold bg-blue-50 text-blue-600 px-4 py-2 rounded-full border border-blue-100"
          >
            Return to Daily Mode
          </button>
        )}
      </div>

      {gameMode === "archive" && (
        <div className="mt-4 flex justify-center">
          <div className="bg-purple-50 inline-flex items-center px-4 py-2 rounded-full border border-purple-100 shadow-sm animate-in fade-in zoom-in duration-500">
            <span className="text-lg mr-2">♾️</span>
            <p className="text-sm font-bold text-purple-800">
              Archive Mode: Random Play
            </p>
          </div>
        </div>
      )}

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

      {gameMode === "daily" && (
        <div className="mt-4 flex justify-center">
          <div className="bg-blue-50 inline-flex items-center px-4 py-2 rounded-full border border-blue-100 shadow-sm animate-in fade-in zoom-in duration-500">
            <span className="text-lg mr-2">🏆</span>
            <p className="text-sm font-bold text-blue-800">
              {globalWinCount} Sensei{globalWinCount != 1 && "s"} cleared this
              student today!
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
