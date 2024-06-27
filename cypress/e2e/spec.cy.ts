describe("Categories ", () => {
  describe("Test succes status and response", () => {
    it("test Catgories", () => {
      cy.visit("http://localhost:3000");
    });
    it("GET a list catgory", () => {
      cy.request("GET", "http://localhost:3000/api/category")
        .its("status")
        .should("equal", 200);
    });

    it("Post a category with FormData", () => {
      const formData = new FormData();
      formData.append("name", "Test");

      cy.request("POST", "http://localhost:3000/api/category/create", formData)
        .its("status")
        .should("equal", 200);
    });

    it("Update a category ", () => {
      const formData = new FormData();
      formData.append("name", "new one");

      cy.request(
        "PATCH",
        "http://localhost:3000/api/category/1/update",
        formData
      )
        .its("status")
        .should("equal", 200);
    });

    // it("DELETE a category", () => {
    //   cy.request({
    //     method: "DELETE",
    //     url: `http://localhost:3000/api/category/1/delete`,
    //   })
    //     .its("status")
    //     .should("equal", 200);
    // });
  });
});

describe("POST", () => {
  describe("Test succes status and response", () => {
    it("GET a list catgory", () => {
      cy.request("GET", "http://localhost:3000/api/event")
        .its("status")
        .should("equal", 200);
    });

    it("Post a category with FormData", () => {
      const formData = new FormData();
      formData.append("name", "Test");
      formData.append("startingDate", "Test");
      formData.append("endingDate", "Test");
      formData.append("latitude", "Test");
      formData.append("longitude", "Test");
      formData.append("image", "Test");
      formData.append("city", "");
      formData.append("address", "Test");
      formData.append("description", "A great music festival in Paris.");
      formData.append("zipcode", "A great music festival in Paris.");
      formData.append("price", "A great music festival in Paris.");
      formData.append("categoryId", "A great music festival in Paris.");
      formData.append("url", "A great music festival in Paris.");

      cy.request("POST", "http://localhost:3000/api/event/create", formData)
        .its("status")
        .should("equal", 200);
    });

    // it("Update a category ", () => {
    //   const formData = new FormData();
    //   formData.append("name", "new one");

    //   cy.request(
    //     "PATCH",
    //     "http://localhost:3000/api/category/1/update",
    //     formData
    //   )
    //     .its("status")
    //     .should("equal", 200);
    // });

    // it("DELETE a category", () => {
    //   cy.request({
    //     method: "DELETE",
    //     url: `http://localhost:3000/api/category/1/delete`,
    //   })
    //     .its("status")
    //     .should("equal", 200);
    // });
  });
});
