import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import axios from "axios";
import StudentModel from "../models/student.model";
import {
  Academy,
  AttackType,
  DefenseType,
  Role,
  StudentType,
} from "../types/student.types";

dotenv.config();

// --- MAPPINGS ---
const SQUAD_TYPE_MAP: Record<string, StudentType> = {
  Main: StudentType.STRIKER,
  Support: StudentType.SPECIAL,
};

const ROLE_MAP: Record<string, Role> = {
  DamageDealer: Role.DEALER,
  Tank: Role.TANK,
  Healer: Role.HEALER,
  Support: Role.SUPPORT,
  Vehicle: Role.TACTICAL,
};

const ATTACK_TYPE_MAP: Record<string, AttackType> = {
  Explosion: AttackType.EXPLOSIVE,
  Pierce: AttackType.PIERCING,
  Mystic: AttackType.MYSTIC,
  Sonic: AttackType.SONIC,
};

const DEFENSE_TYPE_MAP: Record<string, DefenseType> = {
  LightArmor: DefenseType.LIGHT,
  HeavyArmor: DefenseType.HEAVY,
  SpecialArmor: DefenseType.SPECIAL,
  ElasticArmor: DefenseType.ELASTIC,
};

const formatAcademy = (school: string): Academy => {
  const normalized = school.replace(/([A-Z])/g, " $1").trim();
  const map: Record<string, Academy> = {
    Gehenna: Academy.GEHENNA,
    Millennium: Academy.MILLENNIUM,
    Trinity: Academy.TRINITY,
    Abydos: Academy.ABYDOS,
    Shanhaijing: Academy.SHANHAIJING,
    Hyakkiyako: Academy.HYAKKIYAKO,
    "Red Winter": Academy.RED_WINTER,
    RedWinter: Academy.RED_WINTER,
    Valkyrie: Academy.VALKYRIE,
    Arius: Academy.ARIUS,
    SRT: Academy.SRT,
    Kronos: Academy.OTHER,
    Other: Academy.OTHER,
    Tokiwadai: Academy.OTHER,
    Sakugawa: Academy.OTHER,
  };
  return map[school] || map[normalized] || Academy.OTHER;
};

// --- URL CHECKER ---
const checkUrlExists = async (url: string): Promise<boolean> => {
  try {
    await axios.head(url, { timeout: 5000 }); // Increased timeout slightly
    return true;
  } catch (error) {
    return false;
  }
};

const importStudents = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const jsonPath = path.join(__dirname, "../../students.json");
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`File not found: ${jsonPath}`);
    }

    const rawData = fs.readFileSync(jsonPath, "utf-8");
    const studentsData = JSON.parse(rawData);
    const students = Object.values(studentsData) as any[];

    console.log(`Found ${students.length} raw entries. Processing...`);

    let successCount = 0;
    let skippedCount = 0;
    let fallbackUsedCount = 0;

    for (const s of students) {
      // 1. FILTER: Skip Unreleased
      if (!s.IsReleased || !s.IsReleased[0]) {
        skippedCount++;
        continue;
      }

      // 2. FILTER: Skip Variations (Parentheses check)
      if (s.Name.includes("(")) {
        skippedCount++;
        continue;
      }

      try {
        const studentId = s.Id;
        const pathName = s.PathName;
        const devName = s.DevName ? s.DevName.toLowerCase() : ""; // "CH0109" -> "ch0109"

        // Static Images (usually reliable)
        const studentImage = `https://schaledb.com/images/student/portrait/${studentId}.webp`;
        const gunImage = `https://schaledb.com/images/weapon/weapon_icon_${studentId}.webp`;
        const itemImage = `https://schaledb.com/images/gear/full/${studentId}.webp`;
        const haloImage = `https://schaledb.com/images/student/icon/${studentId}.webp`;

        // 3. AUDIO VERIFICATION & FALLBACK
        // Strategy A: Try PathName (e.g. "niya")
        let voiceline = `https://r2.schaledb.com/voice/jp_${pathName}/${pathName}_title.mp3`;
        let isVoiceValid = await checkUrlExists(voiceline);

        // Strategy B: Try DevName (e.g. "ch0109") if Strategy A fails
        if (!isVoiceValid && devName) {
          const fallbackVoice = `https://r2.schaledb.com/voice/jp_${devName}/${devName}_title.mp3`;
          // Check if this fallback actually works
          if (await checkUrlExists(fallbackVoice)) {
            voiceline = fallbackVoice;
            isVoiceValid = true;
            fallbackUsedCount++;
            // console.log(`   ↳ Fixed voice for ${s.Name} using DevName: ${devName}`);
          }
        }

        // Final Check: If still invalid, provide a placeholder to pass Mongoose validation
        // (Use a generic sound or the main menu theme if you want,
        // here I use a dummy URL that looks valid but won't play)
        if (!isVoiceValid) {
          console.warn(
            `⚠️  Voice MISSING for ${s.Name}. Path: ${pathName}, Dev: ${devName}`,
          );
          // Placeholder to satisfy "required" if necessary, or let it fail if you prefer strictness
          // voiceline = 'https://schaledb.com/audio/not_found.mp3';

          // If Mongoose requires it, we MUST provide a string.
          // If we leave it empty string, Mongoose might complain depending on schema options.
          // Let's assume we skip students with absolutely no voice to avoid game errors:
          // throw new Error('No valid voice line found.');
        }

        const studentDoc = {
          name: s.Name,
          rarity: s.StarGrade,
          type: SQUAD_TYPE_MAP[s.SquadType] || StudentType.STRIKER,
          role: ROLE_MAP[s.TacticRole] || Role.SUPPORT,
          attackType: ATTACK_TYPE_MAP[s.BulletType] || AttackType.EXPLOSIVE,
          defenseType: DEFENSE_TYPE_MAP[s.ArmorType] || DefenseType.LIGHT,
          academy: formatAcademy(s.School),
          studentImage,
          gunImage,
          itemImage,
          haloImage,
          voiceline,
        };

        await StudentModel.findOneAndUpdate({ name: s.Name }, studentDoc, {
          upsert: true,
          new: true,
          runValidators: true,
        });

        successCount++;
        process.stdout.write("•");
      } catch (err: any) {
        // If validation fails (e.g. missing voiceline), we catch it here
        console.error(`\n❌ Error processing ${s.Name}:`, err.message);
      }
    }

    console.log(`\n\n🎉 Import Complete!`);
    console.log(`✅ Added/Updated: ${successCount}`);
    console.log(`🔧 Fallback Repaired: ${fallbackUsedCount}`);
    console.log(`⏭️  Skipped: ${skippedCount}`);
  } catch (error) {
    console.error("Fatal Error:", error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

importStudents();
