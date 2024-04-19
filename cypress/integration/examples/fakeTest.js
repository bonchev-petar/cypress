/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />

const URL =
  "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty";

describe("First intercept suite", function () {
  it("Case one", function () {
    cy.intercept(
      {
        method: "GET",
        url: "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      },
      {
        statusCode: 200,
        body: [
          {
            book_name: "RestAssured with Java",
            isbn: "BSG",
            aisle: "2302",
          },
          {
            book_name: "RestAssured with Java",
            isbn: "BSG",
            aisle: "2303",
          },
        ],
      }
    ).as("bookRetrievals");
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
    cy.get(".btn-primary").click();
    cy.wait("@bookRetrievals").then(({ request, response }) => {
      cy.get("tbody tr").should("have.length", response.body.length);
    });
    // cy.get("p").should("have.text", "Oops only 1 Book available");

    //length of the response array = rows of the table
  });
});
