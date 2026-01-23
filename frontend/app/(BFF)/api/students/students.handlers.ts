import { NextResponse } from "next/server";
import {
  createStudentBFFService,
  getAllStudentsBFFService,
} from "./students.services";
import { CreateStudentDTO } from "@/types/student.types";

export const createStudentHandler = async (req: Request) => {
  try {
    const body: CreateStudentDTO = await req.json();
    const result = await createStudentBFFService(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error: unknown) {
    let errorMessage = "Internal Server Error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("BFF Error:", errorMessage);

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

export const getStudentsHandler = async () => {
  try {
    const result = await getAllStudentsBFFService();
    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    let errorMessage = "Internal Server Error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
