//cypress - Spec
/// <reference types="Cypress" />
describe("My Second Test", () => {
  it("Visits the Kitchen Sink", () => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get(".search-keyword").type("ca");

    //Parent child
    cy.get(".products").as("ProductsLocator");
    cy.get("@ProductsLocator").find(".product").should("have.length", 4);

    cy.get("@ProductsLocator")
      .find(".product")
      .each(($el, index, $list) => {
        const textVeg = $el.find("h4.product-name").text();
        if (textVeg.includes("Cashews")) {
          cy.wrap($el).find("button").click();
        }
      });
    cy.get(".cart-icon > img").click();
    cy.contains("PROCEED TO CHECKOUT").click();
    cy.contains("Place Order").click();
  });
});
