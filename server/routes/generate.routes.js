import express from "express";
import { generateNotes } from "../controllers/generate.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, generateNotes);

export default router;