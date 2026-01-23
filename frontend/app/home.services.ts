import { useState, useEffect } from "react";
import { useRandomStudent, useStudentSearch } from "./home.hooks";
import { IStudent } from "@/types/student.types";

export type MatchStatus = "CORRECT" | "WRONG" | "HIGHER" | "LOWER" | "PARTIAL";

export interface GuessResult {
  student: IStudent;
  matches: {
    rarity: MatchStatus;
    academy: MatchStatus;
    type: MatchStatus;
    role: MatchStatus;
    attackType: MatchStatus;
    defenseType: MatchStatus;
    height: MatchStatus;
    age: MatchStatus;
    schoolYear: MatchStatus;
  };
}

const MAX_GUESSES = 10;

const parseAge = (ageStr: string): number => {
  const match = ageStr.match(/(\d+)/);
  return match ? parseInt(match[0], 10) : -1;
};

const parseYear = (yearStr: string): number => {
  const match = yearStr.match(/(\d+)/);
  return match ? parseInt(match[0], 10) : -1;
};

const getNumericComparison = (
  targetVal: number,
  guessVal: number,
): MatchStatus => {
  if (targetVal === -1 || guessVal === -1)
    return targetVal === guessVal ? "CORRECT" : "WRONG";
  if (guessVal === targetVal) return "CORRECT";
  return targetVal > guessVal ? "HIGHER" : "LOWER";
};

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
        rarity: student.rarity === targetStudent.rarity ? "CORRECT" : "WRONG",
        academy:
          student.academy === targetStudent.academy ? "CORRECT" : "WRONG",
        type: student.type === targetStudent.type ? "CORRECT" : "WRONG",
        role: student.role === targetStudent.role ? "CORRECT" : "WRONG",
        attackType:
          student.attackType === targetStudent.attackType ? "CORRECT" : "WRONG",
        defenseType:
          student.defenseType === targetStudent.defenseType
            ? "CORRECT"
            : "WRONG",

        height: getNumericComparison(targetStudent.height, student.height),
        age: getNumericComparison(
          parseAge(targetStudent.age),
          parseAge(student.age),
        ),
        schoolYear: getNumericComparison(
          parseYear(targetStudent.schoolYear),
          parseYear(student.schoolYear),
        ),
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
