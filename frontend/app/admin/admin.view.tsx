import React from "react";
import { AdminViewProps } from "./admin.types";
import {
  Academy,
  AttackType,
  DefenseType,
  Role,
  StudentType,
  CreateStudentDTO,
} from "@/types/student.types";

const ASSET_FIELDS: (keyof CreateStudentDTO)[] = [
  "studentImage",
  "haloImage",
  "gunImage",
  "itemImage",
  "voiceline",
];

export const AdminView: React.FC<AdminViewProps> = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="min-h-screen bg-[#F3F7F8] p-8 font-sans text-slate-800 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-md shadow-[0_4px_0_0_#DCE5EA] border border-[#DCE5EA] overflow-hidden">
        <div className="bg-[#002E5D] p-5 flex items-center gap-4 border-b-4 border-[#1289F1]">
          <div className="w-2 h-8 bg-[#1289F1]" />
          <div>
            <h1 className="text-2xl font-black text-white tracking-widest uppercase italic">
              Schale Database
            </h1>
            <p className="text-[#8EB0CD] text-xs font-bold tracking-wider uppercase">
              Student Registration System
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="space-y-6">
            <h2 className="text-[#1289F1] font-bold text-sm uppercase tracking-wider border-b border-[#E0E0E0] pb-2">
              01. Basic Information
            </h2>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#4B5E6D] uppercase">
                Student Name
              </label>
              <input
                {...register("name")}
                className="w-full bg-[#F3F7F8] border-2 border-transparent focus:border-[#1289F1] hover:bg-[#EAF6FF] p-3 rounded font-bold text-[#002E5D] transition-all outline-none"
                placeholder="e.g. Shiroko (Cycling)"
              />
              {errors.name && (
                <span className="text-red-500 text-xs font-bold">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4B5E6D] uppercase">
                  Rarity
                </label>
                <select
                  {...register("rarity")}
                  className="w-full bg-[#F3F7F8] p-3 rounded font-bold text-[#002E5D] outline-none border-r-8 border-transparent"
                >
                  <option value="1">★ 1</option>
                  <option value="2">★★ 2</option>
                  <option value="3">★★★ 3</option>
                </select>
                {errors.rarity && (
                  <span className="text-red-500 text-xs font-bold">
                    {errors.rarity.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4B5E6D] uppercase">
                  Academy
                </label>
                <select
                  {...register("academy")}
                  className="w-full bg-[#F3F7F8] p-3 rounded font-bold text-[#002E5D] outline-none border-r-8 border-transparent"
                >
                  {Object.values(Academy).map((ac) => (
                    <option key={ac} value={ac}>
                      {ac}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-[#1289F1] font-bold text-sm uppercase tracking-wider border-b border-[#E0E0E0] pb-2">
              02. Combat Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4B5E6D] uppercase">
                  Attack Type
                </label>
                <select
                  {...register("attackType")}
                  className="w-full bg-[#FFE8E8] text-[#A61818] p-3 rounded font-bold outline-none"
                >
                  {Object.values(AttackType).map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4B5E6D] uppercase">
                  Defense Type
                </label>
                <select
                  {...register("defenseType")}
                  className="w-full bg-[#FFF7D6] text-[#B58D00] p-3 rounded font-bold outline-none"
                >
                  {Object.values(DefenseType).map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4B5E6D] uppercase">
                  Role
                </label>
                <select
                  {...register("role")}
                  className="w-full bg-[#F3F7F8] p-3 rounded font-bold text-[#002E5D] outline-none"
                >
                  {Object.values(Role).map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4B5E6D] uppercase">
                  Class
                </label>
                <select
                  {...register("type")}
                  className="w-full bg-[#F3F7F8] p-3 rounded font-bold text-[#002E5D] outline-none"
                >
                  {Object.values(StudentType).map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-4 p-6 bg-[#EAF6FF] rounded-lg border border-[#1289F1] relative mt-4">
            <div className="absolute -top-3 left-4 bg-[#1289F1] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
              Asset Links
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {ASSET_FIELDS.map((field) => (
                <div key={field} className="space-y-1">
                  <label className="text-[10px] font-bold text-[#1289F1] uppercase tracking-wider">
                    {field.replace(/([A-Z])/g, " $1")} (URL)
                  </label>
                  <input
                    {...register(field)}
                    className="w-full bg-white border border-[#BFDFFF] p-2 text-sm rounded focus:outline-none focus:border-[#1289F1]"
                    placeholder="https://..."
                  />
                  {errors[field] && (
                    <span className="text-red-500 text-[10px] font-bold block">
                      {errors[field]?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#1289F1] hover:bg-[#002E5D] text-white font-black uppercase italic tracking-wider py-4 px-10 rounded-xl shadow-[0_6px_0_0_#002E5D] active:shadow-none active:translate-y-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Register Entry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
