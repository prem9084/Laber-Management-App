import express from "express";

const router = express.Router();


import { requireSignIn } from "../middleware/authMiddleware.js";
import { getMyAllAttendence, getMyAllExpenses } from "../controller/LaberSideController.js";

router.get("/my-attendence/:id", requireSignIn, getMyAllAttendence);
router.get("/my-expenses/:id", requireSignIn, getMyAllExpenses);

export default router;