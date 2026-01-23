import { CreateStudentDTO, IStudent } from "@/types/student.types";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

export const createStudentBFFService = async (
  data: CreateStudentDTO,
): Promise<IStudent> => {
  const response = await fetch(`${BACKEND_URL}/api/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to connect to backend service");
  }

  return response.json();
};

export const getAllStudentsBFFService = async (): Promise<IStudent[]> => {
  const response = await fetch(`${BACKEND_URL}/api/students`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return response.json();
};

export const getRandomStudentBFFService = async (): Promise<IStudent> => {
  const response = await fetch(`${BACKEND_URL}/api/students/random`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch random student");
  }

  return response.json();
};
