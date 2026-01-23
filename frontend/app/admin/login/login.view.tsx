import React from "react";
import { useLoginService } from "./login.services";

type LoginProps = ReturnType<typeof useLoginService>;

export const LoginView: React.FC<LoginProps> = ({
  password,
  setPassword,
  handleLogin,
  isLoading,
  error,
  isBlocked,
}) => {
  if (isBlocked) {
    return (
      <div className="min-h-screen bg-[#1a0505] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-[500px] bg-[#2a0808] rounded-xl shadow-[0_0_50px_rgba(255,0,0,0.2)] border-4 border-red-600 p-8 text-center animate-in zoom-in duration-300">
          <div className="mb-6 text-6xl">🚫</div>
          <h1 className="text-3xl font-black text-red-500 italic uppercase tracking-widest mb-2">
            System Lockout
          </h1>
          <p className="text-red-300 font-bold uppercase tracking-wider text-xs border-y border-red-900 py-2 mb-6">
            Unauthorized Access Detected
          </p>
        </div>
      </div>
    );
  }

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
