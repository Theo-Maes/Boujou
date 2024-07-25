// cypress/support/commands.d.ts

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to sign in a user
     * @example cy.signin('email@example.com', 'password123')
     */
    signin(email: string, password: string);
  }
}
