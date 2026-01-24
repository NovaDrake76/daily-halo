import React from "react";
import { IStudent } from "@/types/student.types";
import { GameMode } from "../../home.services";
import { getAcademyLogo } from "@/utils/assets.utils";

interface GameResultProps {
  hasWon: boolean;
  targetStudent: IStudent;
  gameMode: GameMode;
  onSwitchMode: (mode: GameMode) => void;
}

export const GameResult: React.FC<GameResultProps> = ({
  hasWon,
  targetStudent,
  gameMode,
  onSwitchMode,
}) => {
  return (
    <div className="mb-8 animate-in zoom-in duration-500">
      <div
        className={`rounded-3xl p-8 text-center shadow-2xl border-4 relative overflow-hidden ${
          hasWon
            ? "bg-gradient-to-br from-blue-500 to-cyan-400 border-white text-white"
            : "bg-gradient-to-br from-red-500 to-pink-500 border-white text-white"
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/bg.jpg')] opacity-10 bg-cover mix-blend-overlay"></div>

        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-2 drop-shadow-md">
            {hasWon
              ? `🎉 Yes, it's ${targetStudent.name}!`
              : "💔 You forgot about me, Sensei?"}
          </h2>
          <p className="text-lg md:text-xl font-medium opacity-90 mb-8">
            {hasWon ? "Excellent work, Sensei!" : "Bro..."}
          </p>

          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 inline-flex flex-col items-center border border-white/30 mb-8">
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div
                  className={`absolute inset-0 rounded-full blur-2xl opacity-40 ${hasWon ? "bg-white" : "bg-red-500"}`}
                ></div>
                <img
                  src={targetStudent.studentImage}
                  alt="Result"
                  className={`relative w-40 h-40 rounded-full ring-8 shadow-2xl object-cover object-top ${hasWon ? "ring-white" : "ring-slate-500 grayscale"}`}
                />
                <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-white rounded-full p-2 shadow-lg flex items-center justify-center ring-4 ring-black/10">
                  <img
                    src={getAcademyLogo(targetStudent.academy)}
                    alt={targetStudent.academy}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="text-2xl font-black uppercase tracking-wider">
              {targetStudent.name}
            </div>
            <div className="text-sm font-bold opacity-75 uppercase tracking-widest">
              {targetStudent.academy}
            </div>
            <div className="w-full flex items-center justify-center">
              <audio
                controls
                src={targetStudent.voiceline}
                className="mt-4 opacity-90 hover:opacity-100 transition-opacity rounded-xl shadow-lg"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {gameMode === "archive" ? (
              <button
                onClick={() => onSwitchMode("archive")}
                className="bg-white text-purple-600 px-8 py-3 rounded-xl font-black uppercase tracking-wider shadow-lg hover:bg-purple-50 transition-transform active:scale-95"
              >
                Play Again (Random)
              </button>
            ) : (
              <button
                onClick={() => onSwitchMode("archive")}
                className="bg-white/20 hover:bg-white/30 text-white border-2 border-white px-8 py-3 rounded-xl font-black uppercase tracking-wider shadow-lg transition-all backdrop-blur-sm"
              >
                Play Unlimited Mode
              </button>
            )}

            {hasWon && gameMode === "daily" && (
              <div className="text-xs font-bold opacity-80 max-w-[200px] leading-tight">
                📅 Come back tomorrow for a new Daily Student!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
