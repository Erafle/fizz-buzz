import { Router } from "express";
import { getFizzBuzzController } from "../controllers/fizz-buzz.controllers.js";

const router = Router();

router.get("/", getFizzBuzzController);

export default router;
