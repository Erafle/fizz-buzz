// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "src/tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],
  },
});
