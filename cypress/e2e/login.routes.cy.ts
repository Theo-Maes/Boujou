import { waitFor } from "@testing-library/react";

describe("Navigation on protected routes", () => {
  it("should show login dialog when click on connexion", () => {
    cy.visit("/");
    cy.findByRole("button", { name: /connexion/i }).click();
    cy.findByRole("dialog", { name: /connexion/i }).should("exist");
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

  it("Succes login should show submit event button", async () => {
    cy.task("db:reset").visit("/signin");
    cy.findByRole("heading", { name: /Page de connexion/i }).should("exist");
    cy.findByLabelText(/email/i).type(Cypress.env("TEST_USER_EMAIL"));
    cy.findByLabelText(/mot de passe/i).type(Cypress.env("TEST_USER_PASSWORD"));
    cy.findByRole("button", { name: /Se connecter/i }).click();
    cy.findByRole("button", { name: /Proposer un événement/i }).should("exist");
  });
});
