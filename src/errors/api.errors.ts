import { z } from "zod";

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
  constructor() {
    super("You are not authenticated", 401);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends ApiError {
  constructor() {
    super("You don't have permission to access this resource", 403);
    this.name = "ForbiddenError";
  }
}
