import type { Request } from "express";
import * as z from "zod";
import { ValidationError } from "../errors/api.errors.ts";

export const validateQuery = <T>(req: Request, schema: z.ZodType<T>) => {
  const parsedSchema = schema.safeParse(req.query);

  if (!parsedSchema.success) {
    throw new ValidationError(parsedSchema.error.issues);
  }
  return parsedSchema.data;
};
