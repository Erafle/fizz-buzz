import { describe, it, expect } from "vitest";
import { getFizzBuzzService } from "../../services/fizz-buzz.services.ts";

describe("getFizzBuzzService", () => {
  it("returns 'Fizz' for multiples of 3 only", () => {
    const result = getFizzBuzzService({ from: 3, to: 3 });

    expect(result).toEqual(["Fizz"]);
  });

  it("returns 'Buzz' for multiples of 5 only", () => {
    const result = getFizzBuzzService({ from: 5, to: 5 });

    expect(result).toEqual(["Buzz"]);
  });

  it("returns 'FizzBuzz' for multiples of both 3 and 5", () => {
    const result = getFizzBuzzService({ from: 15, to: 15 });

    expect(result).toEqual(["FizzBuzz"]);
  });

  it("returns the number for non-multiples of 3 or 5", () => {
    const result = getFizzBuzzService({ from: 1, to: 1 });

    expect(result).toEqual([1]);
  });

  it("returns correct sequence for 1 to 15", () => {
    const result = getFizzBuzzService({ from: 1, to: 15 });
    expect(result).toEqual([
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
});
