import React from "react";
import { IStudent } from "@/types/student.types";
import { getAcademyLogo } from "@/utils/assets.utils";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: IStudent[];
  handleGuess: (student: IStudent) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  searchResults,
  handleGuess,
}) => {
  return (
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
                <div className="w-16 h-16 shrink-0 bg-slate-100 rounded-xl overflow-hidden ring-2 ring-slate-200 group-hover:ring-blue-500 transition-all">
                  <div className="w-40 overflow-hidden flex">
                    <img
                      src={s.studentImage}
                      alt={s.name}
                      className="h-full w-auto object-cover -ml-12 -mt-6"
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
  );
};
