import { Router } from "express";
import { getFizzBuzzController } from "../controllers/fizz-buzz.controllers.ts";

const router = Router();

router.get("/", getFizzBuzzController);

export default router;
