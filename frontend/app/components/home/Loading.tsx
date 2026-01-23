import React from "react";

export const Loading = () => {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
        <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="font-bold text-slate-700">INITIALIZING ARONA...</span>
      </div>
    </div>
  );
};
