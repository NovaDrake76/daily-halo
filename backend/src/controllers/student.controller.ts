import { Request, Response } from "express";
import { StudentService } from "../services/student.service";

const studentService = new StudentService();

export class StudentController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const student = await studentService.createStudent(req.body);
      res.status(201).json(student);
    } catch (error: any) {
      if (error.message.includes("already exists")) {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const students = await studentService.getAllStudents();
      res.status(200).json(students);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async search(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.q as string;
      if (!query) {
        res.status(400).json({ error: 'Query parameter "q" is required' });
        return;
      }
      const students = await studentService.searchStudents(query);
      res.status(200).json(students);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRandom(req: Request, res: Response): Promise<void> {
    try {
      const student = await studentService.getRandomStudent();
      res.status(200).json(student);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const updatedStudent = await studentService.updateStudent(id, req.body);

      if (!updatedStudent) {
        res.status(404).json({ error: "Student not found" });
        return;
      }

      res.status(200).json(updatedStudent);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
