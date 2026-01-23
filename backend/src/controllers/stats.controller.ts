import { Request, Response } from "express";
import DailyStatsModel from "../models/daily-stats.model";

const getTodayDate = () => new Date().toISOString().split("T")[0];

export const getDailyWinCount = async (req: Request, res: Response) => {
  try {
    const { studentName } = req.query;
    if (!studentName) {
      return res.status(400).json({ message: "Student name required" });
    }

    const today = getTodayDate();
    const stats = await DailyStatsModel.findOne({
      date: today,
      studentName: String(studentName),
    });

    return res.status(200).json({ count: stats ? stats.winCount : 0 });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching stats" });
  }
};

export const registerWin = async (req: Request, res: Response) => {
  try {
    const { studentName } = req.body;
    const today = getTodayDate();

    const stats = await DailyStatsModel.findOneAndUpdate(
      { date: today, studentName },
      { $inc: { winCount: 1 } },
      { upsert: true, new: true },
    );

    return res.status(200).json({ count: stats.winCount });
  } catch (error) {
    return res.status(500).json({ message: "Error updating stats" });
  }
};
