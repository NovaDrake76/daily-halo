import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
  Control,
} from "react-hook-form";
import { CreateStudentDTO } from "./admin.schema";

export interface AdminViewProps {
  register: UseFormRegister<CreateStudentDTO>;
  handleSubmit: UseFormHandleSubmit<CreateStudentDTO>;
  errors: FieldErrors<CreateStudentDTO>;
  control: Control<CreateStudentDTO>;
  onSubmit: (data: CreateStudentDTO) => void;
  isLoading: boolean;
  isSuccess: boolean;
}
