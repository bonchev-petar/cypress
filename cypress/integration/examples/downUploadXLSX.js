/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />

describe("Upload Download", function () {
  it("Verify excel upload and download ", function () {
    const APPLE_NEW_PRICE = 370;
    const file_path =
      Cypress.config("fileServerFolder") + "/cypress/downloads/download.xlsx";

    cy.visit("https://rahulshettyacademy.com/upload-download-test/");

    cy.get("#downloadButton").click();

    cy.task("writeExcel", {
      searchText: "Apple",
      replaceText: APPLE_NEW_PRICE,
      change: { rowChange: 0, colChange: 2 },
      filePath: file_path,
    });
    cy.get("#fileinput").selectFile(file_path);
    let table = [];
    cy.get("div[id*='row']")
      .each(($row, indexRow) => {
        let rowList = [];
        cy.wrap($row)
          .find('div[role="cell"]')
          .each(($cell, colIndex) => {
            let text = $cell.text();
            rowList.push(text);
          });
        table.push(rowList);
      })
      .then(() => {
        console.log("Table: ", JSON.stringify(table));
        expect(table[1][3]).to.equal(String(APPLE_NEW_PRICE));
      });
  });
});
