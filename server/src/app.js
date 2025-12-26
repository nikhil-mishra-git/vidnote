import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import generateRoute from "../routes/generate.routes.js";
import authRoute from "../routes/auth.route.js";
import notes from "../routes/note.routes.js"

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/generatenotes", generateRoute);
app.use("/api/v1/notes", notes);

export default app;
