import React from "react";
import { GuessResult, GameMode } from "./home.services";
import { IStudent } from "@/types/student.types";
import { Header } from "./components/home/Header";
import { Loading } from "./components/home/Loading";
import { AronaHints } from "./components/home/AronaHints";
import { SearchBar } from "./components/home/SearchBar";
import { GameResult } from "./components/home/GameResult";
import { GuessList } from "./components/home/GuessList";

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
  globalWinCount: number;
  gameMode: GameMode;
  switchMode: (mode: GameMode) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  isLoading,
  searchTerm,
  setSearchTerm,
  searchResults,
  isSearching,
  handleGuess,
  guesses,
  hasWon,
  hasLost,
  isGameOver,
  targetStudent,
  maxGuesses,
  globalWinCount,
  gameMode,
  switchMode,
}) => {
  const attempts = guesses.length;
  const guessesLeft = maxGuesses - attempts;

  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed font-sans">
      <div className="py-12 ">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200 min-h-[80vh]">
          <Header
            isGameOver={isGameOver}
            guessesLeft={guessesLeft}
            globalWinCount={globalWinCount}
            gameMode={gameMode}
            onSwitchMode={switchMode}
          />

          {isLoading && <Loading />}

          {!isGameOver && !isLoading && targetStudent && attempts >= 1 && (
            <AronaHints targetStudent={targetStudent} attempts={attempts} />
          )}

          {!isGameOver && !isLoading && (
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchResults={searchResults}
              handleGuess={handleGuess}
              isSearching={isSearching}
            />
          )}

          {isGameOver && targetStudent && (
            <GameResult
              hasWon={hasWon}
              targetStudent={targetStudent}
              gameMode={gameMode}
              onSwitchMode={switchMode}
            />
          )}

          <GuessList guesses={guesses} />
        </div>
      </div>
      <a
        href="https://github.com/NovaDrake76/daily-halo"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 text-sm text-slate-600 hover:text-slate-800"
      >
        <img src="/github.png" alt="GitHub" className="inline w-6 h-6 mr-2" />
      </a>
    </div>
  );
};
