import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export const useLoginService = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const blockedStatus = localStorage.getItem("schale_admin_lockout");
    if (blockedStatus === "true") {
      setIsBlocked(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isBlocked) return;

    setIsLoading(true);
    setError("");

    try {
      await axios.post("/api/admin/login", { password });
      router.push("/admin");
    } catch {
      setError("Access Denied: Invalid Password");
      setIsBlocked(true);
      localStorage.setItem("schale_admin_lockout", "true");
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
    isBlocked,
  };
};
