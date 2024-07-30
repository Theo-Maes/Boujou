import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
    poolOptions: {
      vmThreads: {
        // VM threads related options here
        maxThreads: 1,
        minThreads: 1,
        useAtomics: true,
      },
    },
    maxWorkers: 1,
    minWorkers: 1,
  },
});
