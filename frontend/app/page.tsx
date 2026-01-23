"use client";

import React from "react";
import { useHomeService } from "./home.services";
import { HomeView } from "./home.view";

export default function HomePage() {
  const serviceProps = useHomeService();
  return <HomeView {...serviceProps} />;
}
