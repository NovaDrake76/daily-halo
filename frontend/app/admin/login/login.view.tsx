import React from "react";
import { useLoginService } from "./login.services";

type LoginProps = ReturnType<typeof useLoginService>;

export const LoginView: React.FC<LoginProps> = ({
  password,
  setPassword,
  handleLogin,
  isLoading,
  error,
}) => {
  return (
    <div className="min-h-screen bg-[#002E5D] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[500px] bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-[#1289F1]">
        <div className="bg-[#F3F7F8] p-8 text-center border-b border-[#DCE5EA]">
          <h1 className="text-3xl font-black text-[#002E5D] italic uppercase">
            Schale Admin
          </h1>
          <p className="text-[#1289F1] font-bold text-xs tracking-widest mt-2 uppercase">
            Restricted Access
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#8EB0CD] uppercase tracking-wider">
              Access Code
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F3F7F8] p-4 rounded-lg font-bold text-[#002E5D] text-lg outline-none border-2 border-transparent focus:border-[#1289F1] transition-all"
              placeholder="••••••••"
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-600 text-sm font-bold text-center rounded border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1289F1] hover:bg-[#002E5D] text-white font-black uppercase italic py-4 rounded-lg shadow-lg active:scale-95 transition-all disabled:opacity-50 hover:cursor-pointer"
          >
            {isLoading ? "Verifying..." : "Authenticate"}
          </button>
        </form>
      </div>
    </div>
  );
};
