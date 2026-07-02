import express from "express";

const router = express.Router();

import { registerController,loginController, getAllUser, deleteUser } from "../controller/AuthController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/all-user",requireSignIn, getAllUser);
router.delete("/delete-user/:userId",requireSignIn, deleteUser);
export default router;