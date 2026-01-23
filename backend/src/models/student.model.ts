import mongoose, { Schema, Document } from "mongoose";
import {
  IStudent,
  Academy,
  AttackType,
  DefenseType,
  Role,
  StudentType,
} from "../types/student.types";

export interface StudentDocument extends IStudent, Document {}

const StudentSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    rarity: { type: Number, required: true, min: 1, max: 3 },
    type: { type: String, enum: Object.values(StudentType), required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    attackType: {
      type: String,
      enum: Object.values(AttackType),
      required: true,
    },
    defenseType: {
      type: String,
      enum: Object.values(DefenseType),
      required: true,
    },
    academy: { type: String, enum: Object.values(Academy), required: true },
    schoolYear: { type: String, required: false, default: "Unknown" },
    age: { type: String, required: false, default: "Unknown" },
    height: { type: Number, required: false, default: 0 },
    birthday: { type: String, required: false, default: "Unknown" },
    hobby: { type: String, required: false, default: "Unknown" },
    club: { type: String, required: false, default: "Unknown" },
    ssrDescription: { type: String, required: false, default: "" },
    haloImage: { type: String, required: true },
    studentImage: { type: String, required: true },
    gunImage: { type: String, required: true },
    itemImage: { type: String, required: true },
    voiceline: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<StudentDocument>("Student", StudentSchema);
