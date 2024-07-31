import { updateEvent } from "../../__tests__/__mocks__/mockData";

describe("Display Home page ", () => {
  it("Home Should show correct heading with logo and login button", () => {
    cy.visit("/");

    cy.findByTestId("logo").should("exist");

    cy.findByRole("button", { name: /connexion/i }).should("exist");
  });

  it("Home Should present 4 events", () => {
    cy.task("db:reset").visit("/");
    cy.findAllByTestId("event-card").should("have.length", 4);
    // cy.findByText("Du 1 juillet 2024 au 1 juillet 2024").should("exist");
  });

  it("Event card should show the correct information", () => {
    cy.task("db:reset").visit("/");
    const cards = cy.findAllByTestId("event-card");
    cy.findAllByTestId("event-card").eq(0).should("contain", "Music Festival");
    cy.findAllByTestId("event-card")
      .eq(0)
      .should("contain", "le 1 juillet 2024");
  });

  it("Event card click should naviagate to detail", () => {
    cy.task("db:reset").visit("/event/1");
    cy.findByText("Music Festival").should("exist");
    cy.findByText("Du 1 juillet 2024 au 1 juillet 2024").should("exist");
  });

  it("UnExisting event should show 404 page", () => {
    cy.task("db:reset").visit("/event/155");
    cy.findByText("404 - Page non trouvée !").should("exist");
  });

  it("Event form step must be prived before create an event navigate throw all steps step should succes", async () => {
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
    cy.get('span[aria-label="mardi 30 juillet 2024"]').click();
    cy.get('button[aria-label="Calendrier"]').eq(0).click();
    cy.wait(1000);
    cy.get('button[aria-label="Calendrier"]').eq(1).click();
    cy.get('span[aria-label="mardi 30 juillet 2024"]').click();
    cy.get('button[aria-label="Calendrier"]').eq(1).click();
    cy.wait(1000);
    suivant.click();

    cy.fixture("hero-card.jpeg").as("image");
    //   cy.get("input[type=file]").selectFile("@image", { force: true });
    cy.get("input[type=file]").attachFile("hero-card.jpeg", { force: true });
    suivant.click();
    cy.findByLabelText(/tarif/i).type(updateEvent.price.toString());
    suivant.click();
    cy.findByLabelText(/description/i).type(updateEvent.description);
    cy.findByLabelText(/lien url de l'événement/i).type(updateEvent.url);
    suivant.click();
    suivant.click();
  });
});
