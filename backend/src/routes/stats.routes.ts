import { Router } from "express";
import { getDailyWinCount, registerWin } from "../controllers/stats.controller";

const router = Router();

router.get("/", getDailyWinCount);
router.post("/", registerWin);

export default router;
