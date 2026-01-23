import { Academy } from "@/types/student.types";

export const getAcademyLogo = (academy: string | Academy): string => {
  if (!academy) return "/logos/Schale_Icon.webp"; // Fallback if needed

  const name = academy.toString().trim();

  switch (name) {
    case "Arius":
    case "ARIUS":
      return "/logos/ARIUS_Icon.webp";

    case "Red Winter":
    case "RedWinter":
      return "/logos/Red_Winter_Icon.webp";

    case "Wild Hunt":
    case "WildHunt":
      return "/logos/Wildhunt_Icon.webp";

    case "SRT":
      return "/logos/SRT_Icon.webp";

    case "Highlander":
      return "/logos/Highlander_Icon.webp";

    case "Valkyrie":
      return "/logos/Valkyrie_Icon.webp";

    case "Trinity":
      return "/logos/Trinity_Icon.webp";

    case "Gehenna":
      return "/logos/Gehenna_Icon.webp";

    case "Millennium":
      return "/logos/Millennium_Icon.webp";

    case "Abydos":
      return "/logos/Abydos_Icon.webp";

    case "Hyakkiyako":
      return "/logos/Hyakkiyako_Icon.webp";

    case "Shanhaijing":
      return "/logos/Shanhaijing_Icon.webp";

    default:
      const formatted =
        name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      return `/logos/${formatted}_Icon.webp`;
  }
};
