import { defineConfig } from "cypress";
import { main } from "./prisma/seed";
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        "db:reset": () =>
          main()
            .catch((e) => {
              console.error(e);
              process.exit(1);
            })
            .then(() => null),
      });
    },
  },
});
