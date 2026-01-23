import { createStudentHandler, getStudentsHandler } from "./students.handlers";

export async function POST(req: Request) {
  return createStudentHandler(req);
}

export async function GET() {
  return getStudentsHandler();
}
