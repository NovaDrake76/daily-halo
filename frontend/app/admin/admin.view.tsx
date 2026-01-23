import React, { useState } from "react";
import { AdminViewProps } from "./admin.types";
import {
  Academy,
  AttackType,
  DefenseType,
  Role,
  StudentType,
  CreateStudentDTO,
  IStudent,
} from "@/types/student.types";
import { getAcademyLogo } from "@/utils/assets.utils";

const ASSET_FIELDS: (keyof CreateStudentDTO)[] = [
  "studentImage",
  "haloImage",
  "gunImage",
  "itemImage",
  "voiceline",
];

interface ExtendedAdminViewProps extends AdminViewProps {
  studentsList: IStudent[];
  onUpdateHalo: (id: string, url: string) => void;
}

const StudentRow = ({
  student,
  onUpdate,
}: {
  student: IStudent;
  onUpdate: (id: string, url: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [haloUrl, setHaloUrl] = useState(student.haloImage);

  const handleSave = () => {
    onUpdate(student._id || "", haloUrl);
    setIsEditing(false);
  };

  return (
    <tr className="border-b border-[#DCE5EA] hover:bg-[#F3F7F8]">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-[#DCE5EA]">
            <img
              src={student.studentImage}
              alt={student.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold text-[#002E5D]">{student.name}</span>
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2 bg-white border border-[#DCE5EA] px-2 py-1 rounded w-fit">
          <img
            src={getAcademyLogo(student.academy)}
            alt={student.academy}
            className="w-5 h-5 object-contain"
          />
          <span className="text-xs font-bold text-[#8EB0CD] uppercase">
            {student.academy}
          </span>
        </div>
      </td>
      <td className="p-4">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              value={haloUrl}
              onChange={(e) => setHaloUrl(e.target.value)}
              className="border border-[#1289F1] rounded px-2 py-1 text-xs w-full"
            />
            <button
              onClick={handleSave}
              className="bg-[#00C58E] text-white p-1 rounded hover:bg-[#00A376]"
            >
              ✓
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-[#FF4D4F] text-white p-1 rounded hover:bg-[#D9363E]"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded bg-[#002E5D] p-1 flex items-center justify-center">
              <img
                src={student.haloImage}
                alt="Halo"
                className="w-full h-full object-contain filter brightness-200"
              />
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="text-[#1289F1] text-xs font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
            >
              EDIT
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export const AdminView: React.FC<ExtendedAdminViewProps> = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  isLoading,
  studentsList,
  onUpdateHalo,
}) => {
  return (
    <div className="min-h-screen bg-[#F3F7F8] p-8 font-sans text-slate-800 flex flex-col items-center gap-8">
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
              01. Basic Identity
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4B5E6D] uppercase">
                  School Year
                </label>
                <input
                  {...register("schoolYear")}
                  className="w-full bg-[#F3F7F8] p-3 rounded font-bold text-[#002E5D] outline-none"
                  placeholder="e.g. 2nd Year"
                />
                {errors.schoolYear && (
                  <span className="text-red-500 text-xs font-bold">
                    {errors.schoolYear.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4B5E6D] uppercase">
                  Age
                </label>
                <input
                  {...register("age")}
                  className="w-full bg-[#F3F7F8] p-3 rounded font-bold text-[#002E5D] outline-none"
                  placeholder="e.g. 16 years old"
                />
                {errors.age && (
                  <span className="text-red-500 text-xs font-bold">
                    {errors.age.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4B5E6D] uppercase">
                  Height (cm)
                </label>
                <input
                  type="number"
                  {...register("height")}
                  className="w-full bg-[#F3F7F8] p-3 rounded font-bold text-[#002E5D] outline-none"
                  placeholder="e.g. 156"
                />
                {errors.height && (
                  <span className="text-red-500 text-xs font-bold">
                    {errors.height.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4B5E6D] uppercase">
                  Birthday
                </label>
                <input
                  {...register("birthday")}
                  className="w-full bg-[#F3F7F8] p-3 rounded font-bold text-[#002E5D] outline-none"
                  placeholder="e.g. January 16"
                />
                {errors.birthday && (
                  <span className="text-red-500 text-xs font-bold">
                    {errors.birthday.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4B5E6D] uppercase">
                  Club
                </label>
                <input
                  {...register("club")}
                  className="w-full bg-[#F3F7F8] p-3 rounded font-bold text-[#002E5D] outline-none"
                  placeholder="e.g. Countermeasure Council"
                />
                {errors.club && (
                  <span className="text-red-500 text-xs font-bold">
                    {errors.club.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4B5E6D] uppercase">
                  Hobby
                </label>
                <input
                  {...register("hobby")}
                  className="w-full bg-[#F3F7F8] p-3 rounded font-bold text-[#002E5D] outline-none"
                  placeholder="e.g. Cycling"
                />
                {errors.hobby && (
                  <span className="text-red-500 text-xs font-bold">
                    {errors.hobby.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#4B5E6D] uppercase">
                SSR Description (Flavor Text)
              </label>
              <textarea
                {...register("ssrDescription")}
                className="w-full bg-[#F3F7F8] p-3 rounded font-bold text-[#002E5D] outline-none min-h-[80px]"
                placeholder="Character introduction text..."
              />
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

      <div className="w-full max-w-4xl bg-white rounded-md shadow-[0_4px_0_0_#DCE5EA] border border-[#DCE5EA] overflow-hidden">
        <div className="bg-[#F3F7F8] p-4 border-b border-[#DCE5EA] flex justify-between items-center">
          <h2 className="text-[#002E5D] font-black uppercase italic tracking-wider">
            Database Records ({studentsList?.length || 0})
          </h2>
        </div>

        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#EAF6FF] sticky top-0">
              <tr>
                <th className="p-4 text-xs font-bold text-[#1289F1] uppercase">
                  Student
                </th>
                <th className="p-4 text-xs font-bold text-[#1289F1] uppercase">
                  Academy
                </th>
                <th className="p-4 text-xs font-bold text-[#1289F1] uppercase">
                  Halo Asset (URL)
                </th>
              </tr>
            </thead>
            <tbody>
              {studentsList?.map((student) => (
                <StudentRow
                  key={student._id}
                  student={student}
                  onUpdate={onUpdateHalo}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
