import React from "react";

interface AttributeBoxProps {
  label: string;
  value: string;
  isCorrect: boolean;
  delay: number;
  icon?: string;
}

export const AttributeBox: React.FC<AttributeBoxProps> = ({
  label,
  value,
  isCorrect,
  delay,
  icon,
}) => (
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
