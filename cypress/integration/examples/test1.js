//cypress - Spec
/// <reference types="Cypress" />
describe("My First Test", () => {
  it("Visits the Kitchen Sink", () => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get(".search-keyword").type("ca");
    cy.wait(1000);
    cy.get("div.product:visible").should("have.length", 4);
    //Parent child
    cy.get(".products").as("ProductsLocator");
    cy.get("@ProductsLocator").find(".product").should("have.length", 4);
    cy.get("@ProductsLocator")
      .find(".product")
      .eq(1)
      .contains("ADD TO CART")
      .click();

    cy.get("@ProductsLocator")
      .find(".product")
      .each(($el, index, $list) => {
        const textVeg = $el.find("h4.product-name").text();
        if (textVeg.includes("Cashews")) {
          cy.wrap($el).find("button").click();
        }
      });
    //assert if logo text
    cy.get(".brand").should("have.text", "GREENKART");
    // Print in logs
    cy.get(".brand").then(function (logoElement) {
      cy.log(logoElement.text());
    });
  });
});
