import { NextResponse } from "next/server";
import { getRandomStudentBFFService } from "../students.services";

export async function GET() {
  try {
    const student = await getRandomStudentBFFService();
    return NextResponse.json(student, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
