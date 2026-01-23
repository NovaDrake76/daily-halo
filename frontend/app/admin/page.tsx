"use client";

import React from "react";
import { useAdminService } from "./admin.services";
import { AdminView } from "./admin.view";

export default function AdminPage() {
  const serviceProps = useAdminService();
  return <AdminView {...serviceProps} />;
}
