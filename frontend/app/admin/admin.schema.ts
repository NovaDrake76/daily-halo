import { z } from "zod";
import {
  Academy,
  AttackType,
  DefenseType,
  Role,
  StudentType,
} from "@/types/student.types";

export const studentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rarity: z.coerce.number().min(1).max(3),
  type: z.nativeEnum(StudentType),
  role: z.nativeEnum(Role),
  attackType: z.nativeEnum(AttackType),
  defenseType: z.nativeEnum(DefenseType),
  academy: z.nativeEnum(Academy),

  schoolYear: z.string().min(1, "School Year is required"),
  age: z.string().min(1, "Age is required"),
  height: z.coerce.number().min(1, "Height must be positive"),
  birthday: z.string().min(1, "Birthday is required"),
  hobby: z.string().min(1, "Hobby is required"),
  club: z.string().min(1, "Club is required"),
  ssrDescription: z.string().optional().default(""),

  haloImage: z.string().url("Must be a valid URL"),
  studentImage: z.string().url("Must be a valid URL"),
  gunImage: z.string().url("Must be a valid URL"),
  itemImage: z.string().url("Must be a valid URL"),
  voiceline: z.string().url("Must be a valid URL"),
});

export type CreateStudentDTO = z.infer<typeof studentSchema>;
