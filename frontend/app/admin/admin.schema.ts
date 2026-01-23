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
  rarity: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  type: z.nativeEnum(StudentType),
  role: z.nativeEnum(Role),
  attackType: z.nativeEnum(AttackType),
  defenseType: z.nativeEnum(DefenseType),
  academy: z.nativeEnum(Academy),
  haloImage: z.string().url("Must be a valid URL"),
  studentImage: z.string().url("Must be a valid URL"),
  gunImage: z.string().url("Must be a valid URL"),
  itemImage: z.string().url("Must be a valid URL"),
  voiceline: z.string().url("Must be a valid URL"),
});

export type CreateStudentDTO = z.infer<typeof studentSchema>;
