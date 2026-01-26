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
  const discordUrl = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL;

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

          {discordUrl && (
            <div className="flex items-center justify-center mt-6">
              <div className="w-full max-w-md pt-6 border-t border-white/20 mt-2 ">
                <p className="text-sm font-bold opacity-90 mb-3 uppercase tracking-wider">
                  Want to discuss the game?
                </p>
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:-translate-y-0.5 group w-full"
                >
                  <svg
                    className="w-6 h-6 fill-current group-hover:scale-110 transition-transform"
                    viewBox="0 0 127.14 96.36"
                  >
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.89,105.89,0,0,0,126.6,80.22c1.24-23.28-3.28-47.56-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                  </svg>
                  Join our Discord
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
