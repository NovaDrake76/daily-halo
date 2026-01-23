import React from "react";
import { GuessResult } from "../../home.services";
import { AttributeBox } from "./AttributeBox";
import { getAcademyLogo } from "@/utils/assets.utils";

interface GuessListProps {
  guesses: GuessResult[];
}

export const GuessList: React.FC<GuessListProps> = ({ guesses }) => {
  return (
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
              <div className="w-24 h-24 rounded-2xl bg-slate-100 overflow-hidden ring-2 ring-slate-200">
                <div className="w-40 overflow-hidden flex">
                  <img
                    src={guess.student.studentImage}
                    alt={guess.student.name}
                    className="h-full w-auto object-cover -ml-12 -mt-2"
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
  );
};
