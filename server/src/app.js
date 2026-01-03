import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import generateRoute from "../routes/generate.routes.js";
import authRoute from "../routes/auth.route.js";
import notes from "../routes/note.routes.js"

const app = express();

const allowedOrigin = ["http://localhost:5173", "https://vidnoteai.vercel.app"];
app.use(cors({
    origin: allowedOrigin,
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/generatenotes", generateRoute);
app.use("/api/v1/notes", notes);

export default app;
