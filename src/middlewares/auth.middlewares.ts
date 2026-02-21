import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/api.errors.ts";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader !== process.env.API_KEY) {
    throw new UnauthorizedError("Invalid or missing API key");
  }
  next();
};
