import * as z from "zod";

export const fizzBuzzQuerySchema = z.object({
  from: z.coerce.number().min(1).max(1000),
  to: z.coerce.number().min(1).max(1000),
});
