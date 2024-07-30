describe("Display Home page ", () => {
  it("should show correct headeing when navigate to home", () => {
    cy.visit("/");

    cy.findByTestId("logo").should("exist");

    cy.findByRole("button", { name: /connexion/i }).should("exist");
  });
  it("should show login dialog when click on connexion", () => {
    cy.visit("/");
    cy.findByRole("button", { name: /connexion/i }).click();
    cy.findByRole("dialog", { name: /connexion/i }).should("exist");
  });
  it("showld show the correct event when navigate on detail", () => {
    cy.task("db:reset").visit("/event/1");
    cy.findByText("Music Festival").should("exist");
    cy.findByText("Du 1 juillet 2024 au 1 juillet 2024").should("exist");
  });
  it("showld show the Error page if  event do not exist", () => {
    cy.task("db:reset").visit("/event/155");
    cy.findByText("404 - Page non trouvée !").should("exist");
  });
});
