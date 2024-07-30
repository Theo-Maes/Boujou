import { waitFor } from "@testing-library/react";

describe("Navigation on protected routes", () => {
  it("UnAuthenticated user should be redirect to signin", () => {
    cy.task("db:reset");
    cy.fixture("protected-pages").then((urls) => {
      urls.forEach(($url: string) => {
        cy.visit($url);
        cy.findByLabelText(/email/i).should("exist");
        cy.findByLabelText(/mot de passe/i).should("exist");
      });
    });
  });
  it("does not show sign-in page when already sign", () => {
    cy.task("db:reset").signin(
      Cypress.env("ADMIN_USER_EMAIL"),
      Cypress.env("ADMIN_USER_PASSWORD")
    );
    cy.visit("/signin");
    cy.findByRole("heading", { name: /Page de connexion/i }).should(
      "not.exist"
    );
  });
  it("should allow admin user", async () => {
    cy.task("db:reset").visit("/admin");
    cy.intercept("POST", "/api/auth/callback/credentials").as("loginRequest");

    cy.findByRole("heading", { name: /Page de connexion/i }).should("exist");
    cy.findByLabelText(/email/i).type(Cypress.env("TEST_USER_EMAIL"));
    cy.findByLabelText(/mot de passe/i).type(Cypress.env("TEST_USER_PASSWORD"));

    cy.findByRole("button", { name: /Se connecter/i }).click();
    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
    cy.findByTestId("menu-connexion").should("be.visible").click();
    cy.findByRole("menuitem", { name: "Accès admin" }).click();
  });
});
