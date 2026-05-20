import React, { useRef, useState, useEffect } from "react";
import { IStudent } from "@/types/student.types";
import { HintBox } from "./HintBox";
import { isHaloAvailable, isReadableHint } from "@/utils/student.utils";

interface AronaHintsProps {
  targetStudent: IStudent;
  attempts: number;
}

const censorName = (text: string, name: string) => {
  if (!text || !name) return text;
  const baseName = name.split("(")[0].trim();

  const escapedName = baseName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`\\b${escapedName}\\b`, "gi");

  return text.replace(regex, "****");
};

const lockLabel = (fails: number) =>
  `Locked (${fails} Fail${fails === 1 ? "" : "s"})`;

export const AronaHints: React.FC<AronaHintsProps> = ({
  targetStudent,
  attempts,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(0);

  const haloAvailable = isHaloAvailable(targetStudent.haloImage);
  const hobbyAvailable = isReadableHint(targetStudent.hobby);
  const ssrAvailable = isReadableHint(targetStudent.ssrDescription);

  const preHobbyShift = haloAvailable ? 0 : 1;
  const postHobbyShift = preHobbyShift + (hobbyAvailable ? 0 : 1);

  const haloUnlock = 1;
  const hobbyUnlock = 2 - preHobbyShift;
  const weaponUnlock = 3 - postHobbyShift;
  const ssrUnlock = 4 - postHobbyShift;
  const gearUnlock = 5 - postHobbyShift;
  const voiceUnlock = 6 - postHobbyShift;
  const clubUnlock = 7 - postHobbyShift;

  const showRow2 = attempts >= ssrUnlock - 1;
  const showRow3 = attempts >= gearUnlock - 1;

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.scrollHeight);
    }
  }, [attempts, showRow2, showRow3]);

  return (
    <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700 fill-mode-forwards">
      <div
        className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100 relative overflow-hidden transition-[height] duration-700 ease-in-out"
        style={{ height: height ? `${height}px` : "auto" }}
      >
        <div ref={containerRef} className="p-6 md:p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-transparent opacity-30 rounded-full -mr-32 -mt-32"></div>

          <div className="relative">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <h3 className="text-sm font-black uppercase tracking-widest text-blue-600">
                Arona&apos;s Hints
              </h3>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-1">
                <HintBox
                  title="Halo Pattern"
                  image={targetStudent.haloImage}
                  isLocked={attempts < haloUnlock}
                  lockLabel={lockLabel(haloUnlock)}
                  delay={0}
                  unavailable={!haloAvailable}
                  unavailableLabel="I have no halo for this student, sensei!"
                />
              </div>
              <div
                className={`
                  col-span-1 md:col-span-2 flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-500 min-h-[140px]
                  ${attempts >= hobbyUnlock ? "bg-pink-50 border-pink-200" : "bg-slate-50 border-slate-200 border-dashed opacity-60"}
               `}
              >
                {attempts >= hobbyUnlock ? (
                  <div className="text-center animate-in zoom-in w-full">
                    <span className="text-xs font-bold text-pink-400 uppercase tracking-widest block mb-1">
                      Hobby
                    </span>
                    {hobbyAvailable ? (
                      <p className="font-bold text-slate-700 text-sm md:text-base leading-tight">
                        {targetStudent.hobby}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 italic leading-tight">
                        I could not translate this one, sensei!
                      </p>
                    )}
                  </div>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">
                    {lockLabel(hobbyUnlock)}
                  </span>
                )}
              </div>

              <div className="col-span-2 md:col-span-1">
                <HintBox
                  title="Weapon"
                  image={targetStudent.gunImage}
                  isLocked={attempts < weaponUnlock}
                  lockLabel={lockLabel(weaponUnlock)}
                  delay={100}
                />
              </div>

              {showRow2 && (
                <div
                  className={`
                    col-span-2 md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-500 min-h-[100px] animate-in fade-in slide-in-from-top-2
                    ${attempts >= ssrUnlock ? "bg-amber-50 border-amber-200" : "bg-slate-50 border-slate-200 border-dashed opacity-60"}
                 `}
                >
                  {attempts >= ssrUnlock ? (
                    <div className="text-center animate-in zoom-in">
                      <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">
                        Birthday: {targetStudent.birthday}
                      </span>
                      {ssrAvailable && (
                        <p className="text-xs text-slate-600 italic line-clamp-3">
                          &quot;
                          {censorName(
                            targetStudent.ssrDescription,
                            targetStudent.name,
                          )}
                          &quot;
                        </p>
                      )}
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {lockLabel(ssrUnlock)}
                    </span>
                  )}
                </div>
              )}

              {showRow3 && (
                <>
                  <div
                    className="col-span-1 animate-in fade-in slide-in-from-top-2"
                    style={{ animationDelay: "100ms" }}
                  >
                    <HintBox
                      title="Unique Gear"
                      image={targetStudent.itemImage}
                      isLocked={attempts < gearUnlock}
                      lockLabel={lockLabel(gearUnlock)}
                      delay={200}
                    />
                  </div>

                  <div
                    className={`
                      col-span-1 md:col-span-1 flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-500 min-h-[140px] animate-in fade-in slide-in-from-top-2
                      ${attempts >= voiceUnlock ? "bg-indigo-50 border-indigo-200" : "bg-slate-50 border-slate-200 border-dashed opacity-60"}
                   `}
                    style={{ animationDelay: "150ms" }}
                  >
                    {attempts >= voiceUnlock ? (
                      <div className="flex flex-col items-center w-full animate-in zoom-in duration-300">
                        <span className="text-2xl mb-2">🔊</span>
                        <audio
                          controls
                          src={targetStudent.voiceline}
                          className="w-full h-8 mb-2 max-w-[150px]"
                        />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-white px-2 py-1 rounded-full">
                          Audio
                        </span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-2xl mb-2 grayscale opacity-50">
                          🔇
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {lockLabel(voiceUnlock)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div
                    className={`
                      col-span-2 md:col-span-2 flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-500 min-h-[140px] animate-in fade-in slide-in-from-top-2
                      ${attempts >= clubUnlock ? "bg-purple-50 border-purple-200" : "bg-slate-50 border-slate-200 border-dashed opacity-60"}
                   `}
                    style={{ animationDelay: "200ms" }}
                  >
                    {attempts >= clubUnlock ? (
                      <div className="text-center animate-in zoom-in w-full">
                        <span className="text-xs font-bold text-purple-500 uppercase tracking-widest block mb-1">
                          Club
                        </span>
                        <p className="font-bold text-slate-700 text-sm md:text-base leading-tight">
                          {targetStudent.club}
                        </p>
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">
                        {lockLabel(clubUnlock)}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
