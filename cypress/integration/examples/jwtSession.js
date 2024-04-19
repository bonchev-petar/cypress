/// <reference types="Cypress" />

describe("JWT Scenario", function () {
  it("Is logged in through local storage", function () {
    cy.loginAPI().then(function () {
      cy.visit("https://rahulshettyacademy.com/client", {
        onBeforeLoad: function (window) {
          window.localStorage.setItem("token", Cypress.env("token"));
        },
      });
    });
  });
});
