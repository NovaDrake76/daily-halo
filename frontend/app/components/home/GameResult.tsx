import React from "react";
import { IStudent } from "@/types/student.types";
import { getAcademyLogo } from "@/utils/assets.utils";

interface GameResultProps {
  hasWon: boolean;
  targetStudent: IStudent;
}

export const GameResult: React.FC<GameResultProps> = ({
  hasWon,
  targetStudent,
}) => {
  return (
    <div
      className={`
       rounded-3xl p-8 text-center shadow-2xl mb-8 animate-in zoom-in duration-500 relative overflow-hidden border-4
       ${hasWon ? "bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400" : "bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600"}
    `}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

      <div className="relative">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-2 drop-shadow-lg">
          {hasWon
            ? `🎉 Yes, it's ${targetStudent.name}!`
            : "💔 You forgot about me, Sensei?"}
        </h2>
        <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-8">
          {hasWon ? "Excellent work, Sensei!" : "Don't give up, Sensei!"}
        </p>

        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <div
              className={`absolute inset-0 rounded-full blur-2xl opacity-40 ${hasWon ? "bg-white" : "bg-red-500"}`}
            ></div>
            <img
              src={targetStudent.studentImage}
              alt="Result"
              className={`relative w-40 h-40 rounded-full ring-8 shadow-2xl object-cover ${hasWon ? "ring-white" : "ring-slate-500 grayscale"}`}
            />
            <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-white rounded-full p-2 shadow-lg flex items-center justify-center ring-4 ring-black/10">
              <img
                src={getAcademyLogo(targetStudent.academy)}
                alt={targetStudent.academy}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <p className="text-4xl font-black text-white mb-2 drop-shadow-md">
            {targetStudent.name}
          </p>
          <p
            className={`font-semibold uppercase tracking-wider text-sm mb-6 ${hasWon ? "text-blue-100" : "text-slate-400"}`}
          >
            {targetStudent.academy}
          </p>

          <audio
            controls
            src={targetStudent.voiceline}
            className="mt-4 opacity-90 hover:opacity-100 transition-opacity rounded-xl shadow-lg"
          />

          <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <p className="text-white font-bold text-sm">
              📅 Check in tomorrow to guess the next student!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
