import type { Request, Response, NextFunction } from "express";
import { ForbiddenError, UnauthorizedError } from "../errors/api.errors.ts";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError();
  }
  if (authHeader !== process.env.API_KEY) {
    throw new ForbiddenError();
  }
  next();
};
