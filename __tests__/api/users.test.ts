import { testApiHandler } from "next-test-api-route-handler";
import { Vitest, expect, test, vi, it, beforeEach, beforeAll } from "vitest";
import * as detailHandler from "@/app/api/event/route";

import * as createHandler from "@/app/api/user/create/route";
import * as deleteHandler from "@/app/api/user/[id]/delete/route";
import { users as userMocks } from "../__mocks__/mockData";
let userId = 3;

it("Get api/users/[id] return list of users from db", async () => {
  await testApiHandler({
    appHandler: detailHandler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);

      const json = await res.json();
    },
  });
});

it("POST api/users", async () => {
  await testApiHandler({
    appHandler: createHandler,
    test: async ({ fetch }) => {
      const formData = new FormData();
      formData.append("email", "r@ggg.com");
      formData.append("password", userMocks[0].password);
      formData.append("firstName", userMocks[0].firstName);
      formData.append("lastName", userMocks[0].lastName);
      formData.append("adress", userMocks[0].adress);
      formData.append("roleId", "2");

      const res = await fetch({
        method: "POST",
        body: formData,
      });

      const errorData = await res.json();
      console.log("check l id");
      userId = errorData.newUser.id;
      console.log(errorData.newUser.id);
      //   const errorMsg = errorData.erreur.toLowerCase();

      expect(res.status).toBe(201);
    },
  });
});

it("DELETE api/user[id] return status code 200", async () => {
  await testApiHandler({
    appHandler: deleteHandler,
    paramsPatcher: (params) => {
      params.id = userId.toString();
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "DELETE",
      });

      expect(res.status).toBe(200);
      //   const {
      //     data: { image, ...dbEvent },
      //   } = await res.json();
      //   //   expect(dbEvent).toEqual(updateMock);
    },
  });
});
