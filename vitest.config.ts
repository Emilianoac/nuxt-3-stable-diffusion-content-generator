import { defineVitestConfig } from "@nuxt/test-utils/config"

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    setupFiles: [
      "./setupTests.ts",
    ],
    coverage: {
      provider: "v8",
    },
  }
})

