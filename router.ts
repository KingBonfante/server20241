import { Router } from "express";
import { deleteCourse, listCourse, saveCourse } from "./controllers/course";
import { deleteStudent, listStudent, saveStudent } from "./controllers/student";
import { deleteBook, listBook, saveBook } from "./controllers/book";
import { deleteSchool, listSchool, saveSchool } from "./controllers/school";
import { deleteRestaurant, listRestaurant, saveRestaurant } from "./controllers/restaurant";
import { deleteCustomer, listCustomer, saveCustomer } from "./controllers/customer";
const router = Router();

router.get("/courses", listCourse);
router.post("/courses", saveCourse);
router.delete("/courses/:id", deleteCourse)
router.get("/students", listStudent);
router.post("/students", saveStudent)
router.delete("/students/:id", deleteStudent)

router.get("/books", listBook);
router.post("/books", saveBook)
router.delete("/books/:id", deleteBook)
router.get("/schools", listSchool);
router.post("/schools", saveSchool)
router.delete("/schools/:id", deleteSchool)

router.get("/restaurants", listRestaurant);
router.post("/restaurants", saveRestaurant)
router.delete("/restaurants/:id", deleteRestaurant)

router.get("/customers", listCustomer);
router.post("/customers", saveCustomer)
router.delete("/customers/:id", deleteCustomer)

export { router };
