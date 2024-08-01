//driver
import { testApiHandler } from "next-test-api-route-handler";
import { Vitest, expect, test, vi, it, beforeEach, beforeAll } from "vitest";
import * as listHandler from "@/app/api/event/route";
import * as deleteHandler from "@/app/api/driver/[id]/leave/route";
import * as joinHandler from "@/app/api/driver/[id]/join/route";
import * as createHandler from "@/app/api/driver/create/route";
import * as editHandler from "@/app/api/event/[id]/update/route";
import {
  drivers as driverMocks,
  users as userMocks,
} from "../__mocks__/mockData";
import { main } from "../__mocks__/resetDb";

it("POST api/driver already driver: 403", async () => {
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
      console.log("AlLLLLLLOOOOOOOOOO");
      console.log(errorData.error);
    },
  });
});
it("POST api/driver create a drive: 200", async () => {
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

it("Delete api/driver not allow to leave: 403", async () => {
  await testApiHandler({
    appHandler: deleteHandler,
    paramsPatcher: (params) => {
      params.id = "1";
    },
    test: async ({ fetch }) => {
      const johnDriver = driverMocks[0];
      const formData = new FormData();
      formData.append("userId", "1");
      const res = await fetch({
        method: "DELETE",
        body: formData,
      });
      const errorData = await res.json();
      console.log(errorData.erreur);
      expect(res.status).toBe(403);
      expect(errorData.error).toBe(
        "le driver ne peut pas quitter son propre trajet"
      );
    },
  });
});

it("Delete api/driver user must be passenger: 403", async () => {
  const johnDriver = driverMocks[0];
  const pierre = { id: "3" };
  const formData = new FormData();
  formData.append("userId", pierre.id);
  await testApiHandler({
    appHandler: deleteHandler,
    paramsPatcher: (params) => {
      params.id = "1";
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "DELETE",
        body: formData,
      });
      const errorData = await res.json();

      expect(res.status).toBe(403);
      expect(errorData.error).toBe(
        "l'utilisateur ne fait pas partie du groupe"
      );
    },
  });
});
