import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import sweetsRoutes from "./routes/sweets.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);

export default app;
