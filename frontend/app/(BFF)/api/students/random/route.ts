import { NextResponse } from "next/server";
import {
  getRandomStudentBFFService,
  getAllStudentsBFFService,
} from "../students.services";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode") || "daily";

    if (mode === "daily") {
      const student = await getRandomStudentBFFService();
      return NextResponse.json(student, { status: 200 });
    } else {
      const students = await getAllStudentsBFFService();

      if (!students || students.length === 0) {
        return NextResponse.json(
          { error: "No students found" },
          { status: 404 },
        );
      }

      const randomIndex = Math.floor(Math.random() * students.length);
      const randomStudent = students[randomIndex];

      return NextResponse.json(randomStudent, { status: 200 });
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
