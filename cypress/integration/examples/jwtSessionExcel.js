/// <reference types="Cypress" />

describe("JWT Scenario", function () {
  let productName;
  it("Is logged in through local storage", function () {
    cy.loginAPI().then(function () {
      cy.visit("https://rahulshettyacademy.com/client", {
        onBeforeLoad: function (window) {
          window.localStorage.setItem("token", Cypress.env("token"));
        },
      });
    });
    cy.get(".card-body b")
      .eq(1)
      .then((el) => {
        productName = el.text();
      });

    cy.get(".card-body button:last-of-type").eq(1).click();
    cy.get('[routerlink*="cart"]').click();
    cy.get("button").contains("Checkout").click();
    cy.get('[placeholder="Select Country"]').type("Bul");
    cy.contains("Bulgaria").click();
    cy.get(".action__submit").click();
    cy.wait(3000);
    cy.get("button")
      .contains("Click To Download Order Details in Excel")
      .click();
    const filePath =
      Cypress.config("fileServerFolder") +
      "/cypress/downloads/order-invoice_convertobonchev.xlsx";

    cy.task("excelToJsonConverter", filePath).then(function (result) {
      console.log("hello: ", JSON.stringify(result, null, 4));
      expect(productName).to.equal(result.data[1].B);
    });

    // content present
  });
});
