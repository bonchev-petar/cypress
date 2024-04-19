import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import HomePage from "../../../pageObjects/homePage";
import ProductsPage from "../../../pageObjects/ProductPage";

const hp = new HomePage();
const pp = new ProductsPage();
const country = "Bulgaria";

// let testData;
let testName;
// before(function () {
//   cy.fixture("example").then(function (data) {
//     testData = data;
//     console.log("Fixture: ", JSON.stringify(testData));
//   });
// });

Given("I open ecommerce page", () => {
  cy.visit(Cypress.env("url") + "/angularpractice/");
});

When("I add items to cart", function () {
  hp.getShopTab().click();
  // .debug();
  cy.url().should(
    "equal",
    "https://rahulshettyacademy.com/angularpractice/shop"
  );
  this.data.productName.forEach((product) => {
    cy.selectProduct(product);
  });
  pp.getCheckoutBtn().click();
});

And("Validate the total prices", () => {
  let finalResult = 0;
  cy.get("tr td:nth-child(4) strong")
    .each((el, index) => {
      let amount = Number(el.text().split(" ")[1]);
      finalResult += amount;
      cy.log(amount);
    })
    .then(function () {
      cy.log(finalResult);
      cy.get("h3 strong").then((el) => {
        const total = Number(el.text().split(" ")[1]);
        expect(total).to.equal(finalResult);
      });
    });
});

Then("Select the country submit and verify thankyou", () => {
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

  cy.get("div.alert-success").then((el) => {
    const alertText = el.text();
    expect(alertText).to.contain(
      "Success! Thank you! Your order will be delivered in next few weeks :-)."
    );
  });
});

When("I fill the form details", (dataTable) => {
  testName = dataTable.rawTable[1][0];
  hp.getNameBox().type(testName);
  hp.getGenderDropdown().select(dataTable.rawTable[1][1]);
});

Then("Validate the form behavior", () => {
  hp.getBindingBox().should("have.value", testName);
  hp.getNameBox().should("have.attr", "minlength", 2);
  hp.getRadioEntrepreneur().should("be.disabled");
});

And("Select the shop page", () => {
  hp.getShopTab().click();
});
