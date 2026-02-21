import express from "express";
import fizzBuzzRoutes from "./routes/fizz-buzz.routes.ts";
import { authMiddleware } from "./middlewares/auth.middlewares.ts";
import { errorHandlerMiddleware } from "./middlewares/error.middlewares.ts";

const app = express();

app.use("/api/fizz-buzz", authMiddleware, fizzBuzzRoutes);
app.use(errorHandlerMiddleware);

export default app;
