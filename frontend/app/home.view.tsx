import React, { useState } from "react";
import { GuessResult } from "./home.services";
import { IStudent } from "@/types/student.types";
import { getAcademyLogo } from "@/utils/assets.utils";

interface HomeViewProps {
  targetStudent?: IStudent;
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: IStudent[];
  isSearching: boolean;
  handleGuess: (student: IStudent) => void;
  guesses: GuessResult[];
  hasWon: boolean;
  hasLost: boolean;
  isGameOver: boolean;
  maxGuesses: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  isLoading,
  searchTerm,
  setSearchTerm,
  searchResults,
  handleGuess,
  guesses,
  hasWon,
  hasLost,
  isGameOver,
  targetStudent,
  maxGuesses,
}) => {
  const attempts = guesses.length;
  const guessesLeft = maxGuesses - attempts;

  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed font-sans">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
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
            <p className="text-slate-500 font-bold mt-2 text-sm">
              Attempts Remaining:{" "}
              <span
                className={guessesLeft <= 3 ? "text-red-500" : "text-blue-500"}
              >
                {guessesLeft}
              </span>
            </p>
          )}
        </header>

        {isLoading && (
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
              <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="font-bold text-slate-700">
                INITIALIZING ARONA...
              </span>
            </div>
          </div>
        )}

        {!isGameOver && !isLoading && targetStudent && attempts >= 1 && (
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
                        <div className="text-2xl mb-2 grayscale opacity-50">
                          🔇
                        </div>
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
        )}

        {!isGameOver && !isLoading && (
          <div className="relative mb-8 max-w-2xl mx-auto animate-in fade-in duration-500">
            <div
              className={`relative flex items-center bg-white rounded-2xl shadow-lg transition-all duration-300 ${
                searchTerm
                  ? "ring-2 ring-blue-500 shadow-blue-100"
                  : "hover:shadow-xl"
              }`}
            >
              <div className="pl-5 text-slate-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search student name..."
                className="w-full p-5 bg-transparent outline-none font-semibold text-slate-700 placeholder:text-slate-400"
                autoFocus
              />
            </div>

            {searchTerm && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((s) => (
                    <button
                      key={s._id || s.name}
                      onClick={() => handleGuess(s)}
                      className="w-full text-left p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 flex items-center gap-4 transition-all border-b border-slate-100 last:border-0 group"
                    >
                      <div className="w-28 h-28 shrink-0 bg-slate-100 rounded-xl overflow-hidden ring-2 ring-slate-200 group-hover:ring-blue-500 transition-all">
                        <div className="w-40 overflow-hidden flex">
                          <img
                            src={s.studentImage}
                            alt={s.name}
                            className="h-full w-auto object-cover -ml-8 -mt-4"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-slate-800 text-base mb-1">
                          {s.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                            <img
                              src={getAcademyLogo(s.academy)}
                              alt={s.academy}
                              className="w-4 h-4 object-contain"
                            />
                            <span className="text-xs text-slate-500 font-bold uppercase">
                              {s.academy}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 font-bold text-sm">
                        SELECT →
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-400 font-medium">
                    No students found...
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {isGameOver && targetStudent && (
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
                  ? `🎉 Yes! It's ${targetStudent.name}!`
                  : "💔 You forgot about me, Sensei?"}
              </h2>
              <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-8">
                {hasWon ? "Excellent work, Sensei!" : "Bro..."}
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
        )}

        <div className="space-y-4">
          {guesses.map((guess, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 animate-in fade-in slide-in-from-top-4 duration-500 hover:shadow-xl transition-shadow"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                <div className="flex items-center gap-4 lg:w-64 shrink-0">
                  <div className="w-32 h-32 rounded-2xl bg-slate-100 overflow-hidden ring-2 ring-slate-200">
                    <div className="w-32 overflow-hidden flex">
                      <img
                        src={guess.student.studentImage}
                        alt={guess.student.name}
                        className="h-full w-auto object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-lg mb-1">
                      {guess.student.name}
                    </p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-base ${i < guess.student.rarity ? "text-amber-400" : "text-slate-200"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 flex-1 w-full">
                  <AttributeBox
                    label="Academy"
                    value={guess.student.academy}
                    isCorrect={guess.matches.academy}
                    delay={idx * 50}
                    icon={getAcademyLogo(guess.student.academy)}
                  />
                  <AttributeBox
                    label="Role"
                    value={guess.student.role}
                    isCorrect={guess.matches.role}
                    delay={idx * 50 + 50}
                  />
                  <AttributeBox
                    label="Class"
                    value={guess.student.type}
                    isCorrect={guess.matches.type}
                    delay={idx * 50 + 100}
                  />
                  <AttributeBox
                    label="Attack"
                    value={guess.student.attackType}
                    isCorrect={guess.matches.attackType}
                    delay={idx * 50 + 150}
                  />
                  <AttributeBox
                    label="Defense"
                    value={guess.student.defenseType}
                    isCorrect={guess.matches.defenseType}
                    delay={idx * 50 + 200}
                  />
                  <AttributeBox
                    label="Rarity"
                    value={`${guess.student.rarity}★`}
                    isCorrect={guess.matches.rarity}
                    delay={idx * 50 + 250}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface HintBoxProps {
  title: string;
  image: string;
  isLocked: boolean;
  lockLabel: string;
  delay: number;
}

const HintBox = ({
  title,
  image,
  isLocked,
  lockLabel,
  delay,
}: HintBoxProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`
      flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-500 h-40
      ${isLocked ? "bg-slate-50 border-slate-200 border-dashed opacity-60" : "bg-white border-blue-100 shadow-lg scale-100"}
  `}
    >
      {isLocked ? (
        <div className="text-center">
          <div className="text-2xl mb-2 grayscale opacity-50">🔒</div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {lockLabel}
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center animate-in zoom-in duration-300 w-full h-full justify-between">
          <div className="flex-1 w-full flex items-center justify-center mb-2 overflow-hidden">
            {image && !imgError ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-contain max-h-[80px]"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div className="text-2xl">❓</div>
                <span className="text-xs text-slate-400">
                  This student doesn&apos;t have one...
                </span>
              </div>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {title}
          </span>
        </div>
      )}
    </div>
  );
};

interface AttributeBoxProps {
  label: string;
  value: string;
  isCorrect: boolean;
  delay: number;
  icon?: string;
}

const AttributeBox = ({
  label,
  value,
  isCorrect,
  delay,
  icon,
}: AttributeBoxProps) => (
  <div
    className={`
      flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-500 transform hover:scale-105 relative overflow-hidden
      ${
        isCorrect
          ? "bg-gradient-to-br from-emerald-50 to-teal-50 ring-2 ring-emerald-400 text-emerald-900 shadow-lg shadow-emerald-100"
          : "bg-gradient-to-br from-red-50 to-rose-50 ring-2 ring-red-400 text-red-900 shadow-lg shadow-red-100"
      }
    `}
    style={{ animationDelay: `${delay}ms` }}
  >
    {icon && (
      <div className="absolute opacity-5 w-full h-full flex items-center justify-center pointer-events-none grayscale scale-150">
        <img src={icon} className="w-full h-full object-contain" />
      </div>
    )}
    <span className="text-xs font-bold uppercase opacity-60 mb-1.5 tracking-wider z-10">
      {label}
    </span>
    <div className="flex flex-col items-center z-10 w-full">
      {icon && (
        <img
          src={icon}
          alt=""
          className="w-6 h-6 object-contain mb-1 drop-shadow-sm"
        />
      )}
      <span className="text-sm font-black uppercase text-center leading-tight truncate w-full px-1">
        {value}
      </span>
    </div>
  </div>
);
