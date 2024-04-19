/// <reference types="Cypress" />

describe("API Suite", function () {
  it("Case one", function () {
    cy.request("POST", "https://216.10.245.166/Library/Addbook.php", {
      name: "Learn Appium Automation",
      isbn: "nnsar",
      aisle: "22s8",
      author: "Pesho Keksa",
    }).then(function (res) {
      expect(res.body).to.have.property("Msg", "successfully added");
    });
  });
});
