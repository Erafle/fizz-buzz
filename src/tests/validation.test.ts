import { describe, it, expect } from "vitest";
import { z } from "zod";
import { validateQuery } from "../utils/validation.utils.js";
import { ValidationError } from "../errors/api.errors.js";
import type { Request } from "express";

const mockRequest = (query: Request["query"]) => {
  return { query } as Request;
};

describe("validateQuery", () => {
  const schema = z.object({
    name: z.string(),
  });

  it("should return parsed data when validation succeeds", () => {
    const req = mockRequest({ name: "hello" });
    const result = validateQuery(req, schema);

    expect(result).toEqual({ name: "hello" });
  });

  it("should throw ValidationError when validation fails", () => {
    const req = mockRequest({});

    expect(() => validateQuery(req, schema)).toThrow(ValidationError);
  });
});
