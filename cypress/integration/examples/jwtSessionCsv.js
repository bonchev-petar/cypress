/// <reference types="Cypress" />
import "neat-csv";
import neatCsv from "neat-csv";

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

    cy.get("button").contains("Click To Download Order Details in CSV").click();
    Cypress.config("fileServerFolder");
    cy.readFile(
      Cypress.config("fileServerFolder") +
        "/cypress/downloads/order-invoice_convertobonchev.csv"
    ).then(async function (text) {
      const csv = await neatCsv(text);
      console.log("hello: ", JSON.stringify(csv));
      const actualProduct = csv[0]["Product Name"];
      const invoiceCSV = csv[0]["Invoice Number"];
      expect(productName).to.equal(actualProduct);
      cy.get("tr.ng-star-inserted label").should("contain.text", invoiceCSV);
    });
  });
});
