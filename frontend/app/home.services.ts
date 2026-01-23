import { useState, useEffect } from "react";
import { useRandomStudent, useStudentSearch } from "./home.hooks";
import { IStudent } from "@/types/student.types";

export interface GuessResult {
  student: IStudent;
  matches: {
    rarity: boolean;
    academy: boolean;
    type: boolean;
    role: boolean;
    attackType: boolean;
    defenseType: boolean;
  };
}

const MAX_GUESSES = 10;

export const useHomeService = () => {
  const { data: targetStudent, isLoading: isLoadingTarget } =
    useRandomStudent();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: searchResults = [], isLoading: isSearching } =
    useStudentSearch(debouncedSearchTerm);

  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [hasWon, setHasWon] = useState(false);

  const hasLost = guesses.length >= MAX_GUESSES && !hasWon;
  const isGameOver = hasWon || hasLost;

  const handleGuess = (student: IStudent) => {
    if (!targetStudent || isGameOver) return;

    const isAlreadyGuessed = guesses.some(
      (g) => g.student.name === student.name,
    );

    if (isAlreadyGuessed) {
      setSearchTerm("");
      return;
    }

    const result: GuessResult = {
      student: student,
      matches: {
        rarity: student.rarity === targetStudent.rarity,
        academy: student.academy === targetStudent.academy,
        type: student.type === targetStudent.type,
        role: student.role === targetStudent.role,
        attackType: student.attackType === targetStudent.attackType,
        defenseType: student.defenseType === targetStudent.defenseType,
      },
    };

    setGuesses([result, ...guesses]);
    setSearchTerm("");

    if (student.name === targetStudent.name) {
      setHasWon(true);
    }
  };

  return {
    targetStudent,
    isLoading: isLoadingTarget,

    searchTerm,
    setSearchTerm,
    searchResults: searchTerm ? searchResults : [],
    isSearching: isSearching && searchTerm !== debouncedSearchTerm,

    handleGuess,
    guesses,
    hasWon,
    hasLost,
    isGameOver,
    maxGuesses: MAX_GUESSES,
  };
};
