import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { authMiddleware } from "../../middlewares/auth.middlewares.ts";
import { UnauthorizedError } from "../../errors/api.errors.ts";
import type { Request, Response, NextFunction } from "express";

const mockRequest = (authorization?: Request["headers"]["authorization"]) => {
  return { headers: { authorization } } as Request;
};

const mockResponse = () => {
  return {} as Response;
};

const mockNext: NextFunction = vi.fn();

describe("authMiddleware", () => {
  const apiKey = "Test";

  beforeEach(() => {
    process.env.API_KEY = apiKey;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.API_KEY;
  });

  it("should call next() when API key is valid", () => {
    const req = mockRequest(apiKey);
    const res = mockResponse();

    authMiddleware(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledOnce();
  });

  it("should throw UnauthorizedError when authorization header is missing", () => {
    const req = mockRequest();
    const res = mockResponse();

    expect(() => authMiddleware(req, res, mockNext)).toThrow(UnauthorizedError);
    expect(() => authMiddleware(req, res, mockNext)).toThrow(
      "Invalid or missing API key",
    );
  });

  it("should throw UnauthorizedError when API key is invalid", () => {
    const req = mockRequest("wrong-key");
    const res = mockResponse();

    expect(() => authMiddleware(req, res, mockNext)).toThrow(UnauthorizedError);
    expect(() => authMiddleware(req, res, mockNext)).toThrow(
      "Invalid or missing API key",
    );
  });
});
