import { beforeAll, afterEach, afterAll, beforeEach } from "vitest";
import { main as resetDb } from "./__tests__/__mocks__/resetDb";
beforeAll(async () => {
  await resetDb();
});
