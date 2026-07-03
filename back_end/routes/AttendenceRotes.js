import express from "express";

const router = express.Router();

import { addSite, deleteLaberAttendence, deleteSite, getAllSites, getAttendance, laberAttendence, } from "../controller/LaberAttendenceController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";
import { finalSheet } from "../controller/LaberExpenseController.js";

router.post("/add_site",requireSignIn, addSite);
router.get("/all_site",requireSignIn,getAllSites);
router.delete("/delete-site/:id",requireSignIn,deleteSite);
router.post("/insert_intendence",requireSignIn,laberAttendence);
router.get("/attendance",requireSignIn,getAttendance);
router.get("/attendance",requireSignIn,getAttendance);
router.get("/final-sheet",requireSignIn,finalSheet);
router.delete("/delete-attendance/:id",requireSignIn,deleteLaberAttendence);

export default router;