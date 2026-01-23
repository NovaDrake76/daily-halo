import React from "react";
import { MatchStatus } from "../../home.services";

interface AttributeBoxProps {
  label: string;
  value: string | number;
  status: MatchStatus;
  delay: number;
  icon?: string;
}

export const AttributeBox: React.FC<AttributeBoxProps> = ({
  label,
  value,
  status,
  delay,
  icon,
}) => {
  let bgColor = "bg-white";
  let borderColor = "border-slate-200";
  let textColor = "text-slate-800";

  if (status === "CORRECT") {
    bgColor = "bg-emerald-100";
    borderColor = "border-emerald-400";
    textColor = "text-emerald-900";
  } else if (status === "WRONG") {
    bgColor = "bg-red-100";
    borderColor = "border-red-400";
    textColor = "text-red-900";
  } else if (status === "HIGHER" || status === "LOWER") {
    bgColor = "bg-amber-100";
    borderColor = "border-amber-400";
    textColor = "text-amber-900";
  }

  const getTooltip = () => {
    const l = label.toLowerCase();

    if (status === "CORRECT") {
      return `Correct! This matches the student's ${l}.`;
    }

    if (status === "WRONG") {
      return `Incorrect. This is not the student's ${l}.`;
    }

    if (status === "HIGHER") {
      if (l === "age") return "The correct student is Older ↑";
      if (l === "height") return "The correct student is Taller ↑";
      if (l === "year") return "The correct student is in a Higher Grade ↑";
      return "The correct value is Higher ↑";
    }

    if (status === "LOWER") {
      if (l === "age") return "The correct student is Younger ↓";
      if (l === "height") return "The correct student is Shorter ↓";
      if (l === "year") return "The correct student is in a Lower Grade ↓";
      return "The correct value is Lower ↓";
    }

    return "";
  };

  return (
    <div
      title={getTooltip()}
      className={`
      flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all duration-500 transform hover:scale-105 relative overflow-hidden h-full min-h-[70px] cursor-help
      ${bgColor} ${borderColor} ${textColor}
    `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {icon && (
        <div className="absolute opacity-10 w-full h-full flex items-center justify-center pointer-events-none grayscale scale-150">
          <img src={icon} className="w-full h-full object-contain" />
        </div>
      )}

      <span className="text-[10px] font-bold uppercase opacity-60 mb-1 tracking-wider z-10">
        {label}
      </span>

      <div className="flex items-center gap-1 z-10">
        <span className="text-xs md:text-sm font-black uppercase text-center leading-tight truncate px-1">
          {value}
        </span>

        {status === "HIGHER" && (
          <span className="text-xl leading-none animate-bounce">↑</span>
        )}
        {status === "LOWER" && (
          <span className="text-xl leading-none animate-bounce">↓</span>
        )}
      </div>
    </div>
  );
};
