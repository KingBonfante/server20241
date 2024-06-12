import { Router } from "express";
import { listCourse, saveCourse } from "./controllers/course";
import { deleteStudent, listStudent, saveStudent } from "./controllers/student";
const router = Router();

router.get("/courses", listCourse);
router.post("/courses", saveCourse);
router.get("/students", listStudent);
router.post("/students", saveStudent)

router.delete("/students/:id", deleteStudent)

export { router };
