import "@testing-library/cypress/add-commands";
import "cypress-file-upload";

Cypress.Commands.add("signin", (email, password) => {
  cy.visit("/signin");
  cy.findByLabelText(/email/i).type(email);
  cy.findByLabelText(/mot de passe/i).type(password);
  cy.findByRole("button", { name: /Se connecter/i }).click();
});
