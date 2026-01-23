import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema } from "./admin.schema";
import { useCreateStudentMutation } from "./admin.hooks";
import { CreateStudentDTO } from "@/types/student.types";
import { AdminViewProps } from "./admin.types";

export const useAdminService = (): AdminViewProps => {
  const { mutate, isPending, isSuccess } = useCreateStudentMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateStudentDTO>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      rarity: 1,
    },
  });

  const onSubmit = (data: CreateStudentDTO) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        alert("Student registered successfully! Sensei!");
      },
      onError: (error) => {
        console.error(error);
        alert("Failed to register student.");
      },
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    control,
    onSubmit,
    isLoading: isPending,
    isSuccess,
  };
};
