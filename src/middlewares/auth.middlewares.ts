import type { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "You are not authenticated" });
  }
  if (authHeader !== process.env.API_KEY) {
    return res
      .status(403)
      .json({ message: "You don't have permission to access this resource" });
  }

  next();
};
