import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";
import { CreateStudentDTO } from "@/types/student.types";

export interface AdminViewProps {
  register: UseFormRegister<CreateStudentDTO>;
  handleSubmit: UseFormHandleSubmit<CreateStudentDTO>;
  errors: FieldErrors<CreateStudentDTO>;
  control: Control<CreateStudentDTO>;
  onSubmit: (data: CreateStudentDTO) => void;
  isLoading: boolean;
  isSuccess: boolean;
}
