import type { Request, Response, NextFunction } from "express";
import { ApiError, ValidationError } from "../errors/api.errors.js";

export const errorHandlerMiddleware = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ValidationError) {
    return res.status(err.status).json({
      name: err.name,
      message: err.message,
      issues: err.issues,
    });
  }
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      name: err.name,
      message: err.message,
    });
  }
  return res.status(500).json({
    name: "InternalServerError",
    message: "Internal server error",
  });
};
