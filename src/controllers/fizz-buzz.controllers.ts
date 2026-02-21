import type { Request, Response } from "express";
import { getFizzBuzzService } from "../services/fizz-buzz.services.ts";
import { validateQuery } from "../utils/validation.utils.ts";
import { fizzBuzzQuerySchema } from "../schemas/fizz-buzz.schemas.ts";

export const getFizzBuzzController = (req: Request, res: Response) => {
  const query = validateQuery(req, fizzBuzzQuerySchema);
  const fizzBuzz = getFizzBuzzService(query);

  res.json({ data: fizzBuzz });
};
