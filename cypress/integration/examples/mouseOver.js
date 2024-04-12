//cypress - Spec
/// <reference types="Cypress" />
describe("My hover Test", () => {
  it("Visits the Automation Practice", () => {
    cy.visit(Cypress.env("url") + "/AutomationPractice/");
    // cy.get(".mouse-hover-content").invoke("show");
    cy.contains("Top").click({ force: true });
    cy.url().should("include", "top");
  });
});
