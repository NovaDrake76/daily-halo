"use client";

import React from "react";
import { useLoginService } from "./login.services";
import { LoginView } from "./login.view";

export default function LoginPage() {
  const serviceProps = useLoginService();
  return <LoginView {...serviceProps} />;
}
