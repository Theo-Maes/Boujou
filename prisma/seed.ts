import { main as resetDb } from "../__tests__/__mocks__/resetDb";

resetDb().catch((e) => {
  console.error(e);
  process.exit(1);
});
