//cypress - Spec
/// <reference types="Cypress" />
import HomePage from "../pageObjects/homePage";
import ProductsPage from "../pageObjects/ProductPage";
describe("My Fourth Test Suite", () => {
  before(() => {
    cy.fixture("example").then(function (data) {
      this.regData = data;
      console.log("Fixture: ", JSON.stringify(this.regData));
    });
  });

  it("Visits the Shopping Sink", function () {
    const hp = new HomePage();
    const pp = new ProductsPage();
    const country = "Bulgaria";

    cy.visit("https://rahulshettyacademy.com/angularpractice/");

    hp.getNameBox().type(this.regData.name);
    hp.getGenderDropdown().select(this.regData.gender);

    hp.getBindingBox().should("have.value", this.regData.name);
    hp.getNameBox().should("have.attr", "minlength", 2);
    hp.getRadioEntrepreneur().should("be.disabled");
    // cy.pause();

    hp.getShopTab().click();
    // .debug();
    cy.url().should(
      "equal",
      "https://rahulshettyacademy.com/angularpractice/shop"
    );
    this.regData.productName.forEach((product) => {
      cy.selectProduct(product);
    });
    pp.getCheckoutBtn().click();
    cy.get("button.btn-success").click();
    cy.get("#country").type(country);
    cy.get("div.suggestions a").eq(0).click();
    cy.get("div.suggestions a").eq(0).click();
    cy.get("div.suggestions a").should("not.exist");
    cy.get("#country").should("have.value", country);
    cy.get("#checkbox2").check({ force: true }).should("be.checked");
    cy.get("input.btn-success").click();
    cy.get("div.alert-success").should(
      "contain.text",
      "Success! Thank you! Your order will be delivered in next few weeks :-)."
    );
    // cy.get("div.alert-success").then((el) => {
    //   const alertText = el.text();
    //   expect(alertText).to.contain(
    //     "Success! Thank you! Your order will be delivered in next few weeks :-)."
    //   );
    // });
  });
});
