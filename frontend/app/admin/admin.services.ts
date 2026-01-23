import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema } from "./admin.schema";
import {
  useCreateStudentMutation,
  useAdminStudentsList,
  useUpdateStudentMutation,
} from "./admin.hooks";
import { CreateStudentDTO, IStudent } from "@/types/student.types";
import { AdminViewProps } from "./admin.types";

interface ExtendedAdminViewProps extends AdminViewProps {
  studentsList: IStudent[];
  onUpdateHalo: (id: string, url: string) => void;
}

export const useAdminService = (): ExtendedAdminViewProps => {
  const { mutate, isPending, isSuccess } = useCreateStudentMutation();
  const { data: studentsList = [] } = useAdminStudentsList();
  const { mutate: updateStudent } = useUpdateStudentMutation();

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

  const onUpdateHalo = (id: string, url: string) => {
    updateStudent({ id, data: { haloImage: url } });
  };

  return {
    register,
    handleSubmit,
    errors,
    control,
    onSubmit,
    isLoading: isPending,
    isSuccess,
    studentsList,
    onUpdateHalo,
  };
};
