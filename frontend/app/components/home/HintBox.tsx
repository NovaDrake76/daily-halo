import React, { useState } from "react";

interface HintBoxProps {
  title: string;
  image: string;
  isLocked: boolean;
  lockLabel: string;
  delay: number;
}

export const HintBox: React.FC<HintBoxProps> = ({
  title,
  image,
  isLocked,
  lockLabel,
  delay,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`
      flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-500 h-40
      ${isLocked ? "bg-slate-50 border-slate-200 border-dashed opacity-60" : "bg-white border-blue-100 shadow-lg scale-100"}
  `}
    >
      {isLocked ? (
        <div className="text-center">
          <div className="text-2xl mb-2 grayscale opacity-50">🔒</div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {lockLabel}
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center animate-in zoom-in duration-300 w-full h-full justify-between">
          <div className="flex-1 w-full flex items-center justify-center mb-2 overflow-hidden">
            {image && !imgError ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-contain max-h-[180px] bg-gray-400 rounded-md"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="text-2xl">❓</div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 text-center">
                  This student don&apos;t have one...
                </span>
              </div>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {title}
          </span>
        </div>
      )}
    </div>
  );
};
