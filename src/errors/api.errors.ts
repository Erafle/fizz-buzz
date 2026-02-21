import * as z from "zod";

export class ApiError extends Error {
  public readonly status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export class ValidationError extends ApiError {
  public readonly issues: z.core.$ZodIssue[];

  constructor(issues: z.core.$ZodIssue[]) {
    super("Validation failed", 400);
    this.name = "ValidationError";
    this.issues = issues;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}
