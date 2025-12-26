import express from "express";
import {
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote
} from "../controllers/note.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
