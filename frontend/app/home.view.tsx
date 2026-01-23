import React from "react";
import { GuessResult } from "./home.services";
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
  globalWinCount,
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
            />
          )}

          {isGameOver && targetStudent && (
            <GameResult hasWon={hasWon} targetStudent={targetStudent} />
          )}

          <GuessList guesses={guesses} />
        </div>
      </div>
    </div>
  );
};
