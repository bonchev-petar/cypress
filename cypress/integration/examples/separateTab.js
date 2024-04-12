//cypress - Spec
/// <reference types="Cypress" />
describe("My Fifth Test Suite - Automation practice", () => {
  it("Visits child window", () => {
    cy.visit(Cypress.env("url") + "/AutomationPractice/");

    cy.get("#opentab").invoke("removeAttr", "target").click();
    cy.origin("https://www.qaclickacademy.com", () => {
      cy.get("#navbarSupportedContent a[href='about.html']").click();
      cy.get(".mt-50 h2").should("contain", "Welcome to QAClick Academy");
    });
  });
});
