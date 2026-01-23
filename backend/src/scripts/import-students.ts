import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import axios from "axios";
import crypto from "crypto"; // NEW: Needed for MD5 hashing
import StudentModel from "../models/student.model";
import {
  Academy,
  AttackType,
  DefenseType,
  Role,
  StudentType,
} from "../types/student.types";

dotenv.config();

// --- MAPPINGS (Same as before) ---
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
    await axios.head(url, { timeout: 5000 });
    return true;
  } catch (error) {
    return false;
  }
};

// --- NEW: HALO URL GENERATOR ---
const generateHaloUrl = (name: string): string => {
  // 1. Format filename: "Aru" -> "Aru_Halo.png"
  // Spaces must be underscores: "Red Winter" -> "Red_Winter_Halo.png"
  const filename = `${name.replace(/ /g, "_")}_Halo.png`;

  // 2. Calculate MD5 Hash of the filename
  const hash = crypto.createHash("md5").update(filename).digest("hex");

  // 3. Extract path parts
  const a = hash.substring(0, 1);
  const b = hash.substring(0, 2);

  // 4. Construct MediaWiki URL
  return `https://static.wikia.nocookie.net/blue-archive/images/${a}/${b}/${filename}`;
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
    let haloFoundCount = 0;

    for (const s of students) {
      if (!s.IsReleased || !s.IsReleased[0]) {
        skippedCount++;
        continue;
      }

      if (s.Name.includes("(")) {
        skippedCount++;
        continue;
      }

      try {
        const studentId = s.Id;
        const pathName = s.PathName;
        const devName = s.DevName ? s.DevName.toLowerCase() : "";

        // Standard Images
        const studentImage = `https://schaledb.com/images/student/portrait/${studentId}.webp`;
        const gunImage = `https://schaledb.com/images/weapon/weapon_icon_${studentId}.webp`;
        const itemImage = `https://schaledb.com/images/gear/full/${studentId}.webp`;

        // --- HALO LOGIC ---
        // 1. Default to icon (Safe fallback)
        let haloImage = `https://schaledb.com/images/student/icon/${studentId}.webp`;

        // 2. Try to generate Wiki URL
        const wikiHaloUrl = generateHaloUrl(s.Name);
        const isHaloValid = await checkUrlExists(wikiHaloUrl);

        if (isHaloValid) {
          haloImage = wikiHaloUrl;
          haloFoundCount++;
        } else {
          // console.log(`   ⚠️ Halo not found on Wiki for ${s.Name}, using icon.`);
        }

        // --- AUDIO LOGIC ---
        let voiceline = `https://r2.schaledb.com/voice/jp_${pathName}/${pathName}_title.mp3`;
        let isVoiceValid = await checkUrlExists(voiceline);

        if (!isVoiceValid && devName) {
          const fallbackVoice = `https://r2.schaledb.com/voice/jp_${devName}/${devName}_title.mp3`;
          if (await checkUrlExists(fallbackVoice)) {
            voiceline = fallbackVoice;
            isVoiceValid = true;
            fallbackUsedCount++;
          }
        }

        if (!isVoiceValid) {
          console.warn(`⚠️  Voice MISSING for ${s.Name}`);
          // voiceline = ''; // Optional: clear it if you want strictness
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
        console.error(`\n❌ Error processing ${s.Name}:`, err.message);
      }
    }

    console.log(`\n\n🎉 Import Complete!`);
    console.log(`✅ Total Processed: ${successCount}`);
    console.log(`😇 Halos Found: ${haloFoundCount}`);
    console.log(`🔧 Voices Repaired: ${fallbackUsedCount}`);
    console.log(`⏭️  Skipped: ${skippedCount}`);
  } catch (error) {
    console.error("Fatal Error:", error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

importStudents();
