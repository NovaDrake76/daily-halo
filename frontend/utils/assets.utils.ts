import { Academy } from "@/types/student.types";

export const getAcademyLogo = (academy: string | Academy): string => {
  if (!academy) return "/logos/other.png";

  // Normalize: "Red Winter" -> "red_winter"
  const filename = academy.toLowerCase().replace(/\s+/g, "_");

  return `/logos/${filename}_Icon.webp`;
};
