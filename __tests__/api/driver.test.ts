import { testApiHandler } from "next-test-api-route-handler";
import { Vitest, expect, test, vi, it, beforeEach, beforeAll } from "vitest";
import * as listHandler from "@/app/api/event/route";
import * as detailHandler from "@/app/api/event/[id]/route";
import * as createHandler from "@/app/api/driver/create/route";
import * as editHandler from "@/app/api/event/[id]/update/route";
import { drivers as driverMocks } from "../__mocks__/mockData";

it("POST api/driver john already driver for that group", async () => {
  await testApiHandler({
    appHandler: createHandler,
    test: async ({ fetch }) => {
      const john = driverMocks[0];
      const formData = new FormData();
      Object.entries(john).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      const res = await fetch({
        method: "POST",
        body: formData,
      });

      expect(res.status).toBe(403);
      const errorData = await res.json();
    },
  });
});
it("POST api/driver jane can become a driver in this group", async () => {
  await testApiHandler({
    appHandler: createHandler,
    test: async ({ fetch }) => {
      const { id, ...mock } = driverMocks[0];
      const formData = new FormData();
      Object.entries({ ...mock, userId: 2 }).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      const res = await fetch({
        method: "POST",
        body: formData,
      });

      expect(res.status).toBe(200);
      const errorData = await res.json();
      //   const errorMsg = errorData.erreur.toLowerCase();
      //   expect(errorMsg).toBe("no file");
    },
  });
});
