import React from "react";
import { GuessResult } from "../../home.services";
import { AttributeBox } from "./AttributeBox";
import { getAcademyLogo } from "@/utils/assets.utils";

interface GuessListProps {
  guesses: GuessResult[];
}

export const GuessList: React.FC<GuessListProps> = ({ guesses }) => {
  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {guesses.map((guess, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 animate-in fade-in slide-in-from-top-2 duration-300"
          style={{ animationDelay: `${idx * 50}ms` }}
        >
          <div className="flex items-center gap-4 mb-4 border-b border-slate-100 pb-3">
            <div className="w-24 h-24 rounded-full bg-slate-100 overflow-hidden ring-2 ring-slate-200 shrink-0">
              <div className="w-36 overflow-hidden flex">
                <img
                  src={guess.student.studentImage}
                  alt={guess.student.name}
                  className="h-full w-auto object-cover -ml-6 -mt-6"
                />
              </div>
            </div>
            <div>
              <p className="font-black text-slate-800 text-lg leading-none">
                {guess.student.name}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 md:grid-cols-10 [&>*]:col-span-1 md:[&>*]:col-span-2 md:[&>*:nth-child(6)]:col-start-2">
            <AttributeBox
              label="Academy"
              value={guess.student.academy}
              status={guess.matches.academy}
              delay={0}
              icon={getAcademyLogo(guess.student.academy)}
            />
            <AttributeBox
              label="Role"
              value={guess.student.role}
              status={guess.matches.role}
              delay={50}
            />
            <AttributeBox
              label="Class"
              value={guess.student.type}
              status={guess.matches.type}
              delay={100}
            />
            <AttributeBox
              label="Rarity"
              value={"★".repeat(guess.student.rarity)}
              status={guess.matches.rarity}
              delay={125}
            />
            <AttributeBox
              label="Attack"
              value={guess.student.attackType}
              status={guess.matches.attackType}
              delay={150}
            />

            <AttributeBox
              label="Defense"
              value={guess.student.defenseType}
              status={guess.matches.defenseType}
              delay={200}
            />
            <AttributeBox
              label="Height"
              value={`${guess.student.height}cm`}
              status={guess.matches.height}
              delay={250}
            />
            <AttributeBox
              label="Age"
              value={guess.student.age}
              status={guess.matches.age}
              delay={300}
            />
            <AttributeBox
              label="Year"
              value={guess.student.schoolYear}
              status={guess.matches.schoolYear}
              delay={350}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
