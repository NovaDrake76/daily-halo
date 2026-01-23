import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CreateStudentDTO, IStudent } from "@/types/student.types";

export const useCreateStudentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateStudentDTO) => {
      const response = await axios.post<IStudent>("/api/students", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminStudents"] });
    },
  });
};

export const useAdminStudentsList = () => {
  return useQuery({
    queryKey: ["adminStudents"],
    queryFn: async () => {
      const { data } = await axios.get<IStudent[]>("/api/students");
      return data;
    },
  });
};

export const useUpdateStudentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<IStudent>;
    }) => {
      const response = await axios.put<IStudent>(`/api/students/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminStudents"] });
      alert("Student updated successfully!");
    },
    onError: () => {
      alert("Failed to update student.");
    },
  });
};
