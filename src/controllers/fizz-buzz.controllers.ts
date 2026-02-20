import type { Request, Response, NextFunction } from "express";
import { fizzBuzzQuerySchema } from "../schemas/fizz-buzz.schemas.js";
import { getFizzBuzzService } from "../services/fizz-buzz.services.js";

export const getFizzBuzzController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { from, to } = fizzBuzzQuerySchema.parse(req.query);
    const fizzBuzz = getFizzBuzzService(from, to);

    res.json(fizzBuzz);
  } catch (error) {
    next(error);
  }
};
