import type { Request, Response, NextFunction } from "express";
import { getFizzBuzzService } from "../services/fizz-buzz.services.js";
import { validateQuery } from "../utils/validation.utils.js";
import { fizzBuzzQuerySchema } from "../schemas/fizz-buzz.schemas.js";

export const getFizzBuzzController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const query = validateQuery(req, fizzBuzzQuerySchema);
  const fizzBuzz = getFizzBuzzService(query);

  res.json({ data: fizzBuzz });
};
