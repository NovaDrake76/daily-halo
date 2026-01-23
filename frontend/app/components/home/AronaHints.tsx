import React from "react";
import { IStudent } from "@/types/student.types";
import { HintBox } from "./HintBox";

interface AronaHintsProps {
  targetStudent: IStudent;
  attempts: number;
}

export const AronaHints: React.FC<AronaHintsProps> = ({
  targetStudent,
  attempts,
}) => {
  return (
    <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700 fill-mode-forwards">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-blue-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-transparent opacity-30 rounded-full -mr-32 -mt-32"></div>

        <div className="relative">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <h3 className="text-sm font-black uppercase tracking-widest text-blue-600">
              Arona&apos;s Hints
            </h3>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <HintBox
              title="Unique Gear"
              image={targetStudent.itemImage}
              isLocked={attempts < 1}
              lockLabel="Locked (1st Try)"
              delay={0}
            />

            <HintBox
              title="Weapon"
              image={targetStudent.gunImage}
              isLocked={attempts < 2}
              lockLabel="Locked (2nd Try)"
              delay={100}
            />

            <HintBox
              title="Halo Pattern"
              image={targetStudent.haloImage}
              isLocked={attempts < 3}
              lockLabel="Locked (3rd Try)"
              delay={200}
            />

            <div
              className={`
               flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-500 h-40
               ${attempts >= 4 ? "bg-indigo-50 border-indigo-200" : "bg-slate-50 border-slate-200 border-dashed opacity-60"}
            `}
            >
              {attempts >= 4 ? (
                <div className="flex flex-col items-center w-full animate-in zoom-in duration-300">
                  <span className="text-2xl mb-2">🔊</span>
                  <audio
                    controls
                    src={targetStudent.voiceline}
                    className="w-full h-8 mb-2 max-w-[150px]"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-white px-2 py-1 rounded-full">
                    Audio Log
                  </span>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-2xl mb-2 grayscale opacity-50">🔇</div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Locked (4th Try)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
