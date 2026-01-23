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
  _id?: string;
  name: string;
  rarity: 1 | 2 | 3;
  type: StudentType;
  role: Role;
  attackType: AttackType;
  defenseType: DefenseType;
  academy: Academy;

  schoolYear: string;
  age: string;
  height: number;
  birthday: string;
  hobby: string;
  club: string;
  ssrDescription: string;

  haloImage: string;
  studentImage: string;
  gunImage: string;
  itemImage: string;
  voiceline: string;
}

export type CreateStudentDTO = IStudent;
