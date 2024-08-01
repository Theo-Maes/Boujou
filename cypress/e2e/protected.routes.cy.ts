// //admin
import { waitFor } from "@testing-library/react";

describe("Navigation on protected routes", () => {
  it("Back office is restrict to admin user", () => {
    cy.task("db:reset");
    cy.fixture("protected-pages").then((urls) => {
      urls.forEach(($url: string) => {
        cy.visit($url);
        cy.findByLabelText(/email/i).should("exist");
        cy.findByLabelText(/mot de passe/i).should("exist");
      });
    });
  });
});
