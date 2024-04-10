//cypress - Spec
/// <reference types="Cypress" />
describe("My Fourth Test Suite", () => {
  it("Visits the Kitchen Sink", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get("#alertbtn").click();

    // window:alert
    cy.on("window:alert", (str) => {
      expect(str).eql(
        "Hello , share this practice page and share your knowledge"
      );
    });
    cy.get("#confirmbtn").click();
    cy.on("window:confirm", (str) => {
      expect(str).eql("Hello , Are you sure you want to confirm?");
    });
  });
});
