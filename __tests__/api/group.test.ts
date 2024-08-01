import { testApiHandler } from "next-test-api-route-handler";
import { Vitest, expect, test, vi, it, beforeEach, beforeAll } from "vitest";
import * as listHandler from "@/app/api/event/route";
import * as deleteHandler from "@/app/api/group/[id]/delete/route";
import * as joinHandler from "@/app/api/group/[id]/join/route";
import * as createHandler from "@/app/api/group/create/route";
import * as editHandler from "@/app/api/event/[id]/update/route";
import {
  groups as groupMocks,
  events as eventMocks,
  users as userMocks,
} from "../__mocks__/mockData";

// it("Post api/group user john already in group return list of events from db", async () => {
//   await testApiHandler({
//     appHandler: listHandler,
//     test: async ({ fetch }) => {
//       const res = await fetch({ method: "GET" });
//       expect(res.status).toBe(200);

//       const json = await res.json();
//       const dbEvents = json.data.map(
//         ({ groups, category, url, ...el }: any) => el
//       );
//       expect(dbEvents).toEqual(FakeData.events); // ◄ Passes!
//     },
//   });
// });

// it("Get api/event/[eventId] return event from db", async () => {
//   await testApiHandler({
//     appHandler: detailHandler,
//     paramsPatcher: (params) => {
//       params.id = "1";
//     },
//     test: async ({ fetch }) => {
//       const res = await fetch({ method: "GET" });
//       expect(res.status).toBe(200);
//       const json = await res.json();
//       const { groups, category, url, ...dbEvent } = json.data;
//       expect(dbEvent).toEqual(FakeData.events[0]);
//     },
//   });
// });

it("POST api/group create group: 200", async () => {
  await testApiHandler({
    appHandler: createHandler,
    test: async ({ fetch }) => {
      const [john, jane] = userMocks.map((el, index) => ({
        ...el,
        id: index + 1,
      }));

      const [johnGroup, janeGroup] = groupMocks;
      const [musicFestival, filmFestival] = eventMocks;

      const formData = new FormData();
      formData.append("userId", john.id.toString());
      formData.append("eventId", musicFestival.id.toString());
      formData.append("description", "This is a test event.");

      const res = await fetch({
        method: "POST",
        body: formData,
      });

      expect(res.status).toBe(200);
      const errorData = await res.json();
    },
  });
});

it("DELETE api/group delete group: 200", async () => {
  await testApiHandler({
    appHandler: deleteHandler,
    paramsPatcher: (params) => {
      params.id = "3";
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "DELETE",
      });

      expect(res.status).toBe(200);
    },
  });
});

it("POST api/group user already in group: 403", async () => {
  const [john, jane] = userMocks.map((el, index) => ({
    ...el,
    id: index + 1,
  }));

  const formData = new FormData();
  formData.append("userId", jane.id.toString());

  await testApiHandler({
    appHandler: joinHandler,
    paramsPatcher: (params) => {
      params.id = "1";
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        body: formData,
      });
      const errorData = await res.json();

      expect(res.status).toBe(403);

      expect(errorData.erreur).toBe("Vous êtes déjà membre de ce groupe");
    },
  });
});

// it("PATCH api/event return updated event from db", async () => {
//   await testApiHandler({
//     appHandler: editHandler,
//     paramsPatcher: (params) => {
//       params.id = "1";
//     },
//     test: async ({ fetch }) => {
//       const formData = new FormData();
//       const updateMock = FakeData.updateEvent;
//       formData.append("name", updateMock.name);
//       formData.append("description", updateMock.description);
//       formData.append("startingDate", updateMock.startingDate);
//       formData.append("endingDate", updateMock.endingDate);
//       formData.append("address", updateMock.address);
//       formData.append("city", updateMock.city);
//       formData.append("zipCode", updateMock.zipCode);
//       formData.append("categoryId", updateMock.categoryId.toString());
//       formData.append("price", updateMock.price.toString());
//       formData.append("url", updateMock.url);
//       const res = await fetch({
//         method: "PATCH",
//         body: formData,
//       });

//       expect(res.status).toBe(200);
//       const {
//         data: { image, ...dbEvent },
//       } = await res.json();
//       expect(dbEvent).toEqual(updateMock);
//     },
//   });
// });
