/// <reference types="Cypress" />

describe("First intercept suite", function () {
  it("Case one", function () {
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
    cy.intercept(
      "GET",
      "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      (req) => {
        req.url =
          "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=petar";
        req.continue((res) => {
          expect(res.statusCode).to.equal(404);
        });
      }
    ).as("dummyUrl");

    cy.get(".btn-primary").click();
    cy.wait("@dummyUrl");
  });
});
