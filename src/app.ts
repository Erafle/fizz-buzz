import express from "express";
import fizzBuzzRoutes from "./routes/fizz-buzz.routes.js";

const app = express();

app.use("/api/fizz-buzz", fizzBuzzRoutes);

export default app;
