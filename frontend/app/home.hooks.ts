import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IStudent } from "@/types/student.types";

export const useStudentsList = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data } = await axios.get<IStudent[]>("/api/students");
      return data;
    },
  });
};

export const useRandomStudent = () => {
  return useQuery({
    queryKey: ["randomStudent"],
    queryFn: async () => {
      const { data } = await axios.get<IStudent>("/api/students/random");
      return data;
    },
    refetchOnWindowFocus: false,
  });
};

export const useStudentSearch = (query: string) => {
  return useQuery({
    queryKey: ["studentSearch", query],
    queryFn: async () => {
      if (!query) return [];
      const { data } = await axios.get<IStudent[]>(
        `/api/students/search?q=${query}`,
      );
      return data;
    },
    enabled: query.length > 0,
    staleTime: 1000 * 60,
  });
};

export const useDailyWinCount = (studentName?: string) => {
  return useQuery({
    queryKey: ["winCount", studentName],
    queryFn: async () => {
      if (!studentName) return 0;
      const { data } = await axios.get<{ count: number }>(
        `/api/stats?studentName=${encodeURIComponent(studentName)}`,
      );
      return data.count;
    },
    enabled: !!studentName,
  });
};

export const useRegisterWin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (studentName: string) => {
      await axios.post("/api/stats", { studentName });
    },
    onSuccess: (_, studentName) => {
      queryClient.invalidateQueries({ queryKey: ["winCount", studentName] });
    },
  });
};
