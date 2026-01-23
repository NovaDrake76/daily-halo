export enum Academy {
  ABYDOS = "Abydos",
  ARIUS = "Arius",
  GEHENNA = "Gehenna",
  HYAKKIYAKO = "Hyakkiyako",
  MILLENNIUM = "Millennium",
  RED_WINTER = "Red Winter",
  SHANHAIJING = "Shanhaijing",
  TRINITY = "Trinity",
  VALKYRIE = "Valkyrie",
  SRT = "SRT",
  HIGHLANDER = "Highlander",
  WILD_HUNT = "Wild Hunt",
  OTHER = "Other",
}

export enum AttackType {
  EXPLOSIVE = "Explosive",
  PIERCING = "Piercing",
  MYSTIC = "Mystic",
  SONIC = "Sonic",
}

export enum DefenseType {
  LIGHT = "Light",
  HEAVY = "Heavy",
  SPECIAL = "Special",
  ELASTIC = "Elastic",
}

export enum Role {
  TANK = "Tank",
  DEALER = "Dealer",
  HEALER = "Healer",
  SUPPORT = "Support",
  TACTICAL = "Tactical",
}

export enum StudentType {
  STRIKER = "Striker",
  SPECIAL = "Special",
}

export interface IStudent {
  name: string;
  rarity: 1 | 2 | 3;
  type: StudentType;
  role: Role;
  attackType: AttackType;
  defenseType: DefenseType;
  academy: Academy;
  schoolYear: string; // e.g. "2nd Year"
  age: string; // e.g. "16 years old"
  height: number; // e.g. 156 (cm)
  birthday: string; // e.g. "01/02"
  hobby: string;
  club: string;
  ssrDescription: string;

  haloImage: string;
  studentImage: string;
  gunImage: string;
  itemImage: string;
  voiceline: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateStudentDTO = IStudent;
