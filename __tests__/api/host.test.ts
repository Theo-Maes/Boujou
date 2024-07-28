import { testApiHandler } from "next-test-api-route-handler";
import { Vitest, expect, test, vi, it, beforeEach, beforeAll } from "vitest";
import * as listHandler from "@/app/api/event/route";
import * as detailHandler from "@/app/api/event/[id]/route";
import * as createHandler from "@/app/api/host/create/route";
import * as editHandler from "@/app/api/event/[id]/update/route";
import { hosts as hostMocks } from "../__mocks__/mockData";

it("POST api/host/create jane is already a host  for that group", async () => {
  await testApiHandler({
    appHandler: createHandler,
    test: async ({ fetch }) => {
      const jane = hostMocks[0];
      const formData = new FormData();
      Object.entries(jane).forEach(([key, value]) => {
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
it("POST api/host/create john can host ", async () => {
  await testApiHandler({
    appHandler: createHandler,
    test: async ({ fetch }) => {
      const john = { ...hostMocks[0], userId: 1 };
      const formData = new FormData();
      Object.entries(john).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      const res = await fetch({
        method: "POST",
        body: formData,
      });

      expect(res.status).toBe(200);
      const errorData = await res.json();
    },
  });
});
