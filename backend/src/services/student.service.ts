import crypto from "crypto";
import StudentModel, { StudentDocument } from "../models/student.model";
import { CreateStudentDTO } from "../types/student.types";

export class StudentService {
  async createStudent(data: CreateStudentDTO): Promise<StudentDocument> {
    const existing = await StudentModel.findOne({ name: data.name });
    if (existing) {
      throw new Error(`Student with name ${data.name} already exists`);
    }
    return await StudentModel.create(data);
  }

  async getAllStudents(): Promise<StudentDocument[]> {
    return await StudentModel.find().sort({ name: 1 });
  }

  async searchStudents(query: string): Promise<StudentDocument[]> {
    return await StudentModel.find({
      name: { $regex: query, $options: "i" },
    }).limit(10);
  }

  async getStudentByName(name: string): Promise<StudentDocument | null> {
    return await StudentModel.findOne({ name });
  }

  async getRandomStudent(): Promise<StudentDocument> {
    const count = await StudentModel.countDocuments();

    if (count === 0) {
      throw new Error("No students found in database");
    }

    const secret = process.env.DAILY_SECRET_KEY;
    const salt = secret || "INSECURE_DEFAULT_KEY";
    const today = new Date().toISOString().slice(0, 10);

    const hash = crypto.createHmac("sha256", salt).update(today).digest("hex");

    const decimalHash = parseInt(hash.substring(0, 8), 16);
    const dailyIndex = decimalHash % count;

    const student = await StudentModel.findOne().skip(dailyIndex);

    if (!student) {
      throw new Error("Failed to retrieve daily student");
    }

    return student;
  }
}
