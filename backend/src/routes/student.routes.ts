import { Router } from "express";
import { StudentController } from "../controllers/student.controller";

const router = Router();
const studentController = new StudentController();

router.get("/search", studentController.search.bind(studentController));
router.get("/", studentController.getAll.bind(studentController));
router.get("/random", studentController.getRandom.bind(studentController));

export const studentRouter = router;
