import mongoose, { Schema, Document } from "mongoose";

export interface DailyStatsDocument extends Document {
  date: string;
  studentName: string;
  winCount: number;
}

const DailyStatsSchema: Schema = new Schema({
  date: { type: String, required: true, index: true },
  studentName: { type: String, required: true, index: true },
  winCount: { type: Number, default: 0 },
});

DailyStatsSchema.index({ date: 1, studentName: 1 }, { unique: true });

export default mongoose.model<DailyStatsDocument>(
  "DailyStats",
  DailyStatsSchema,
);
