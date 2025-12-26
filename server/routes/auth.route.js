import express from "express";
import {
    register,
    login,
    profile,
    logout,
    deleteAccount
} from "../controllers/auth.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", protect, profile);
router.post("/logout", protect, logout);
router.delete("/delete", protect, deleteAccount);

export default router;
