import { waitFor } from "@testing-library/react";
import { beforeAll } from "vitest";

describe("Navigation on protected routes", () => {
  it("Login should redirect to home", async () => {
    cy.task("db:reset").visit("/signin");
    cy.findByRole("heading", { name: /Page de connexion/i }).should("exist");
    cy.wait(1000);
    cy.findByLabelText(/email/i).type(Cypress.env("TEST_USER_EMAIL"));
    cy.findByLabelText(/mot de passe/i).type(Cypress.env("TEST_USER_PASSWORD"));
    cy.findByRole("button", { name: /Se connecter/i })
      .wait(1000)
      .click();
    cy.findByRole("button", { name: /Proposer un événement/i }).should("exist");
  });

  it("Click on avatar logout user", async () => {
    cy.visit("/");
    cy.findByRole("button", { name: /connexion/i }).click();
    cy.findByLabelText(/email/i)
      .type(Cypress.env("TEST_USER_EMAIL"))
      .wait(1000);
    cy.findByLabelText(/mot de passe/i)
      .type(Cypress.env("TEST_USER_PASSWORD"))
      .wait(1000);
    cy.findByRole("button", { name: /Se connecter/i }).click();
    cy.wait(1000);
    cy.findByTestId("avatar-button").should("be.visible").click();
    cy.findByRole("menuitem", { name: "Déconnexion" }).wait(1000).click();
    cy.findByRole("button", { name: /connexion/i }).should("be.visible");
  });
});
