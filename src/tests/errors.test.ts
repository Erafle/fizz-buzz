import { describe, it, expect } from "vitest";
import {
  ApiError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
} from "../errors/api.errors.ts";
import * as z from "zod";

describe("ApiError", () => {
  it("should set message, status and name", () => {
    const error = new ApiError("Something went wrong", 500);

    expect(error.message).toBe("Something went wrong");
    expect(error.status).toBe(500);
    expect(error.name).toBe("ApiError");
  });

  it("should default status to 500", () => {
    const error = new ApiError("Internal error");

    expect(error.status).toBe(500);
  });

  it("should be an instance of Error", () => {
    const error = new ApiError("fail");

    expect(error).toBeInstanceOf(Error);
  });
});

describe("ValidationError", () => {
  const mockIssues = [
    { message: "Required", path: ["name"], code: "invalid_type" },
  ];

  it("should set message, status, name and issues", () => {
    const error = new ValidationError(mockIssues as z.core.$ZodIssue[]);

    expect(error.message).toBe("Validation failed");
    expect(error.status).toBe(400);
    expect(error.name).toBe("ValidationError");
    expect(error.issues).toBe(mockIssues);
  });

  it("should be an instance of ApiError", () => {
    const error = new ValidationError(mockIssues as z.core.$ZodIssue[]);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe("UnauthorizedError", () => {
  it("should set message, status and name", () => {
    const error = new UnauthorizedError();

    expect(error.message).toBe("You are not authenticated");
    expect(error.status).toBe(401);
    expect(error.name).toBe("UnauthorizedError");
  });

  it("should be an instance of ApiError", () => {
    const error = new UnauthorizedError();

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe("ForbiddenError", () => {
  it("should set message, status and name", () => {
    const error = new ForbiddenError();

    expect(error.message).toBe(
      "You don't have permission to access this resource",
    );
    expect(error.status).toBe(403);
    expect(error.name).toBe("ForbiddenError");
  });

  it("should be an instance of ApiError", () => {
    const error = new ForbiddenError();

    expect(error).toBeInstanceOf(ApiError);
  });
});
