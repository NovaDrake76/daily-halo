import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export const useLoginService = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await axios.post("/api/admin/login", { password });
      router.push("/admin");
    } catch {
      setError("Access Denied: Invalid Password");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    password,
    setPassword,
    handleLogin,
    isLoading,
    error,
  };
};
