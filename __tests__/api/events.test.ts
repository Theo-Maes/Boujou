import { testApiHandler } from "next-test-api-route-handler";
import { Vitest, expect, test, vi, it, beforeEach, beforeAll } from "vitest";
import * as listHandler from "@/app/api/event/route";
import * as detailHandler from "@/app/api/event/[id]/route";
import * as createHandler from "@/app/api/event/create/route";
import * as editHandler from "@/app/api/event/[id]/update/route";
import * as FakeData from "../__mocks__/mockData";

it("Get api/event return a list of events", async () => {
  await testApiHandler({
    appHandler: listHandler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);

      const json = await res.json();
      const dbEvents = json.data.map(
        ({ groups, category, url, ...el }: any) => el
      );
      expect(dbEvents).toEqual(FakeData.events); // ◄ Passes!
    },
  });
});

it("Get api/event/[eventId] return event id 1", async () => {
  await testApiHandler({
    appHandler: detailHandler,
    paramsPatcher: (params) => {
      params.id = "1";
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);
      const json = await res.json();
      const { groups, category, url, ...dbEvent } = json.data;
      expect(dbEvent).toEqual(FakeData.events[0]);
    },
  });
});

it("POST api/event: create event require file to be uplloaded", async () => {
  await testApiHandler({
    appHandler: createHandler,
    test: async ({ fetch }) => {
      const formData = new FormData();
      formData.append("name", "Test Event");
      formData.append("description", "This is a test event.");
      formData.append(
        "startingDate",
        new Date("2024-07-01T00:00:00.000Z").toString()
      );
      formData.append(
        "endingDate",
        new Date("2024-07-02T00:00:00.000Z").toString()
      );
      formData.append("address", "59 rue de gessard");
      formData.append("city", "Rouen");
      formData.append("zipCode", "76000");
      formData.append("categoryId", "1");
      formData.append("price", "100");
      formData.append("url", "http://example.com");
      const res = await fetch({
        method: "POST",
        body: formData,
      });

      expect(res.status).toBe(400);
      const errorData = await res.json();
      const errorMsg = errorData.erreur.toLowerCase();
      expect(errorMsg).toBe("no file");
    },
  });
});

it("PATCH api/event/id/update: event can be updated", async () => {
  await testApiHandler({
    appHandler: editHandler,
    paramsPatcher: (params) => {
      params.id = "1";
    },
    test: async ({ fetch }) => {
      const formData = new FormData();
      const updateMock = FakeData.updateEvent;
      formData.append("name", updateMock.name);
      formData.append("description", updateMock.description);
      formData.append("startingDate", updateMock.startingDate);
      formData.append("endingDate", updateMock.endingDate);
      formData.append("address", updateMock.address);
      formData.append("city", updateMock.city);
      formData.append("zipCode", updateMock.zipCode);
      formData.append("categoryId", updateMock.categoryId.toString());
      formData.append("price", updateMock.price.toString());
      formData.append("url", updateMock.url);
      const res = await fetch({
        method: "PATCH",
        body: formData,
      });

      expect(res.status).toBe(200);
      const {
        data: { image, ...dbEvent },
      } = await res.json();
      expect(dbEvent).toEqual(updateMock);
    },
  });
});
