import { updateEvent } from "../../__tests__/__mocks__/mockData";

describe("Display Home page ", () => {
  it("User create event", async () => {
    cy.task("db:reset").visit("/signin");

    cy.findByRole("heading", { name: /Page de connexion/i }).should("exist");
    cy.findByLabelText(/email/i).type(Cypress.env("TEST_USER_EMAIL"));
    cy.findByLabelText(/mot de passe/i).type(Cypress.env("TEST_USER_PASSWORD"));
    cy.findByRole("button", { name: /Se connecter/i }).click();
    cy.findByRole("button", { name: /Proposer un événement/i }).click();
    const suivant = cy.findByRole("button", { name: /suivant/i });
    suivant.click();
    cy.findByLabelText(/nom de l'événement/i).type(updateEvent.name);
    cy.findByLabelText(/adresse/i).type(updateEvent.address);
    cy.findByLabelText(/code postal/i).type(updateEvent.zipCode);
    cy.findByLabelText(/ville/i).type(updateEvent.city);
    suivant.click();
    cy.wait(1000);
    cy.get('button[aria-label="Calendrier"]').eq(0).click();
    cy.wait(1000);
    // cy.get('button[data-slot="next-button"]').eq(0).click();
    // cy.wait(1000);
    cy.get('span[aria-label="vendredi 2 août 2024"]').click();
    cy.get('button[aria-label="Calendrier"]').eq(0).click();
    cy.wait(1000);
    cy.get('button[aria-label="Calendrier"]').eq(1).click();
    cy.wait(1000);
    // cy.get('button[data-slot="next-button"]').eq(0).click();
    // cy.wait(1000);
    cy.get('span[aria-label="vendredi 2 août 2024"]').click();
    cy.get('button[aria-label="Calendrier"]').eq(1).click();
    cy.wait(1000);
    suivant.click();

    cy.fixture("hero-card.jpeg").as("image");
    //   cy.get("input[type=file]").selectFile("@image", { force: true });
    cy.get("input[type=file]")
      .attachFile("hero-card.jpeg", { force: true })
      .wait(1000);
    suivant.click();
    cy.findByLabelText(/tarif/i).type(updateEvent.price.toString());
    suivant.click();
    cy.findByLabelText(/description/i).type(updateEvent.description);
    cy.findByLabelText(/lien url de l'événement/i).type(updateEvent.url);
    suivant.click();
    cy.findAllByRole("heading", {
      name: /Votre événement être prêt à être envoyé/i,
    }).should("be.visible");
    cy.wait(1000);
  });
});
