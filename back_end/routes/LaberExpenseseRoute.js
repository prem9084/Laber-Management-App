import express from "express";

const router = express.Router();


import { requireSignIn } from "../middleware/authMiddleware.js";
import { getExpense, laberExpenses } from "../controller/LaberExpenseController.js";

router.post("/insert_expense",requireSignIn, laberExpenses);
// router.get("/all_site",requireSignIn,getAllSites);
// router.delete("/delete-site/:id",requireSignIn,deleteSite);
// router.post("/insert_intendence",requireSignIn,laberAttendence);
router.get("/get-expenses",requireSignIn,getExpense);

export default router;