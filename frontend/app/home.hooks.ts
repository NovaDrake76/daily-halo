import { useQuery } from "@tanstack/react-query";
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
