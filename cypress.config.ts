import { defineConfig } from "cypress";
import { main as resetDb } from "./__tests__/__mocks__/resetDb";
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        "db:reset": () =>
          resetDb()
            .catch((e) => {
              console.error(e);
              process.exit(1);
            })
            .then(() => null),
      });
    },
  },
});
