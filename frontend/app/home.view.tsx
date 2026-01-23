import React from "react";
import { GuessResult } from "./home.services";
import { IStudent } from "@/types/student.types";

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
}

export const HomeView: React.FC<HomeViewProps> = ({
  isLoading,
  searchTerm,
  setSearchTerm,
  searchResults,
  handleGuess,
  guesses,
  hasWon,
  targetStudent,
}) => {
  const attempts = guesses.length;

  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-no-repeat bg-fixed font-sans">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
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

        {!hasWon && !isLoading && targetStudent && attempts >= 3 && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-transparent opacity-30 rounded-full -mr-32 -mt-32"></div>

              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-blue-600">
                    Arona&apos;s Hints
                  </h3>
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 shadow-lg flex items-center justify-center overflow-hidden transition-all hover:scale-105 hover:shadow-xl">
                      <img
                        src={targetStudent.haloImage}
                        alt="Halo Hint"
                        className="w-full h-full object-contain filter drop-shadow-lg"
                      />
                    </div>
                    <span className="mt-3 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-4 py-1.5 rounded-full">
                      Halo Pattern
                    </span>
                  </div>

                  {attempts >= 4 ? (
                    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg border border-blue-100">
                        <audio
                          controls
                          src={targetStudent.voiceline}
                          className="w-64 h-10"
                        />
                      </div>
                      <span className="mt-3 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-4 py-1.5 rounded-full">
                        Audio Log
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center opacity-40">
                      <div className="w-64 h-32 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center">
                        <span className="text-sm font-bold text-slate-400">
                          🔒 LOCKED (4th Try)
                        </span>
                      </div>
                      <span className="mt-3 text-xs font-bold text-slate-300 uppercase tracking-wider">
                        ???
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {!hasWon && !isLoading && (
          <div className="relative mb-8 max-w-2xl mx-auto">
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
                placeholder="Type student name..."
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
                      <div className="w-16 h-16 shrink-0 bg-slate-100 rounded-xl overflow-hidden ring-2 ring-slate-200 group-hover:ring-blue-500 transition-all">
                        <img
                          src={s.studentImage}
                          alt={s.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-slate-800 text-base mb-1">
                          {s.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 font-medium">
                            {s.academy}
                          </span>
                          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                            {s.type}
                          </span>
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

        {hasWon && targetStudent && (
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-center shadow-2xl mb-8 animate-in zoom-in duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

            <div className="relative">
              <h2 className="text-5xl font-black text-white uppercase tracking-wider mb-8 drop-shadow-lg">
                🎉 Mission Complete
              </h2>

              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-40"></div>
                  <img
                    src={targetStudent.studentImage}
                    alt="Winner"
                    className="relative w-40 h-40 rounded-full ring-8 ring-white shadow-2xl object-cover"
                  />
                </div>

                <p className="text-4xl font-black text-white mb-2 drop-shadow-md">
                  {targetStudent.name}
                </p>
                <p className="text-blue-100 font-semibold uppercase tracking-wider text-sm mb-6">
                  {targetStudent.academy}
                </p>

                <audio
                  controls
                  src={targetStudent.voiceline}
                  className="mt-4 opacity-90 hover:opacity-100 transition-opacity rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {guesses.map((guess, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 animate-in fade-in slide-in-from-top-2 duration-300 hover:shadow-xl transition-shadow"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                {/* Student Info */}
                <div className="flex items-center gap-4 lg:w-64 shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden ring-2 ring-slate-200">
                    <img
                      src={guess.student.studentImage}
                      alt={guess.student.name}
                      className="w-full h-full object-cover object-top"
                    />
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

const AttributeBox = ({
  label,
  value,
  isCorrect,
  delay,
}: {
  label: string;
  value: string;
  isCorrect: boolean;
  delay: number;
}) => (
  <div
    className={`
      flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-500 transform hover:scale-105
      ${
        isCorrect
          ? "bg-gradient-to-br from-emerald-50 to-teal-50 ring-2 ring-emerald-400 text-emerald-900 shadow-lg shadow-emerald-100"
          : "bg-gradient-to-br from-red-50 to-rose-50 ring-2 ring-red-400 text-red-900 shadow-lg shadow-red-100"
      }
    `}
    style={{ animationDelay: `${delay}ms` }}
  >
    <span className="text-xs font-bold uppercase opacity-60 mb-1.5 tracking-wider">
      {label}
    </span>
    <span className="text-sm font-black uppercase text-center leading-tight">
      {value}
    </span>
  </div>
);
