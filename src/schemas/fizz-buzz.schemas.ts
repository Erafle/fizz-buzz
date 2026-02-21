import * as z from "zod";

export const fizzBuzzQuerySchema = z
  .object({
    from: z.coerce.number().int().min(1).max(100).default(1),
    to: z.coerce.number().int().min(1).max(100).default(100),
  })
  .refine((data) => data.to >= data.from, {
    message: "'to' must be greater than or equal to 'from'",
    path: ["to"],
  });
