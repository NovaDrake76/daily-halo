import { z } from "zod";
import {
  Academy,
  AttackType,
  DefenseType,
  Role,
  StudentType,
} from "@/types/student.types";

const studentFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rarity: z.union([z.literal(1), z.literal(2), z.literal(3)]),
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
  ssrDescription: z.string().default(""),

  haloImage: z.string().url("Must be a valid URL"),
  studentImage: z.string().url("Must be a valid URL"),
  gunImage: z.string().url("Must be a valid URL"),
  itemImage: z.string().url("Must be a valid URL"),
  voiceline: z.string().url("Must be a valid URL"),
});

export const studentSchema = studentFormSchema;

export type CreateStudentDTO = z.infer<typeof studentFormSchema>;
