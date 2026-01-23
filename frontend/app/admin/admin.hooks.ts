import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CreateStudentDTO, IStudent } from "@/types/student.types";

export const useCreateStudentMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateStudentDTO) => {
      const response = await axios.post<IStudent>("/api/students", data);
      return response.data;
    },
  });
};
