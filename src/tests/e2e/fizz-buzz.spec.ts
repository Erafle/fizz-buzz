import { test, expect } from "@playwright/test";

const endpoint = "/api/fizz-buzz";

test.describe("Authentication", () => {
  test("returns 401 when no authorization header", async ({ request }) => {
    const response = await request.get(endpoint);

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body).toEqual({
      name: "UnauthorizedError",
      message: "Invalid or missing API key",
    });
  });

  test("returns 401 when API key is invalid", async ({ request }) => {
    const response = await request.get(endpoint, {
      headers: { Authorization: "wrong-key" },
    });

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body).toEqual({
      name: "UnauthorizedError",
      message: "Invalid or missing API key",
    });
  });
});

test.describe("Validation", () => {
  test("returns 400 when 'from' is less than 1", async ({ request }) => {
    const response = await request.get(`${endpoint}?from=0`, {
      headers: { Authorization: process.env.API_KEY! },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.name).toBe("ValidationError");
  });

  test("returns 400 when 'to' exceeds 100", async ({ request }) => {
    const response = await request.get(`${endpoint}?to=101`, {
      headers: { Authorization: process.env.API_KEY! },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.name).toBe("ValidationError");
  });

  test("returns 400 when 'to' is less than 'from'", async ({ request }) => {
    const response = await request.get(`${endpoint}?from=50&to=10`, {
      headers: { Authorization: process.env.API_KEY! },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.name).toBe("ValidationError");
    expect(body.issues[0].message).toBe(
      "'to' must be greater than or equal to 'from'",
    );
  });

  test("returns 400 when values are not numbers", async ({ request }) => {
    const response = await request.get(`${endpoint}?from=a&to=b`, {
      headers: { Authorization: process.env.API_KEY! },
    });

    expect(response.status()).toBe(400);
  });
});

test.describe("FizzBuzz logic", () => {
  test("returns default range 1 to 100 when no query params", async ({
    request,
  }) => {
    const response = await request.get(endpoint, {
      headers: { Authorization: process.env.API_KEY! },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data).toHaveLength(100);
    expect(body.data[0]).toBe(1);
    expect(body.data[2]).toBe("Fizz");
    expect(body.data[4]).toBe("Buzz");
    expect(body.data[14]).toBe("FizzBuzz");
  });

  test("returns correct sequence for from=1&to=15", async ({ request }) => {
    const response = await request.get(`${endpoint}?from=1&to=15`, {
      headers: { Authorization: process.env.API_KEY! },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data).toEqual([
      1,
      2,
      "Fizz",
      4,
      "Buzz",
      "Fizz",
      7,
      8,
      "Fizz",
      "Buzz",
      11,
      "Fizz",
      13,
      14,
      "FizzBuzz",
    ]);
  });

  test("returns single value when from equals to", async ({ request }) => {
    const response = await request.get(`${endpoint}?from=15&to=15`, {
      headers: { Authorization: process.env.API_KEY! },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data).toEqual(["FizzBuzz"]);
  });

  test("returns numbers for non-multiples of 3 or 5", async ({ request }) => {
    const response = await request.get(`${endpoint}?from=1&to=2`, {
      headers: { Authorization: process.env.API_KEY! },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data).toEqual([1, 2]);
  });
});
