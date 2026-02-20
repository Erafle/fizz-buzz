import express from "express";
import fizzBuzzRoutes from "./routes/fizz-buzz.routes.js";
import { authMiddleware } from "./middlewares/auth.middlewares.js";

const app = express();

app.use("/api/fizz-buzz", authMiddleware, fizzBuzzRoutes);

export default app;
