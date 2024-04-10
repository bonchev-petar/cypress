/// <reference types="Cypress" />

describe("My date verify test", () => {
  it("Visits the Green Kart", () => {
    const month = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [month, date, year];

    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    cy.get("button.react-date-picker__calendar-button").click();
    cy.get(".react-calendar__navigation__label").click().click();
    cy.contains("button", year).click();
    cy.get(".react-calendar__year-view__months button")
      .eq(Number(month) - 1)
      .click();
    cy.contains("abbr", date).click();

    //Assertion
    cy.get(".react-date-picker__inputGroup__input").each(($el, index) => {
      cy.wrap($el).invoke("val").should("eq", expectedList[index]);
    });

    // cy.get(".react-date-picker__wrapper input[name]")
    //   .invoke("show")
    //   .should("have.value", `${year}-${month.padStart(2, "0")}-${date}`);
  });
});
