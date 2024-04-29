const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
const fs = require("fs");
const excelToJson = require("convert-excel-to-json");
const ExJs = require("exceljs");

async function readExcel(sheet, searchText) {
  let output = { row: -1, col: -1 };
  sheet.eachRow((row, rowNum) => {
    row.eachCell((cell, colNum) => {
      if (cell.value === searchText) {
        console.log("Row: " + rowNum + ", Col: " + colNum);
        output.row = rowNum;
        output.col = colNum;
      }
    });
  });
  return output;
}

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  projectId: "m4ahu7",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("file:preprocessor", cucumber());
      on("task", {
        excelToJsonConverter(filepath) {
          const result = excelToJson({
            source: fs.readFileSync(filepath), // fs.readFileSync return a Buffer
          });
          console.log("hello: ", JSON.stringify(result, null, 4));
          return result;
        },
      });
      on("task", {
        async writeExcel({ searchText, replaceText, change, filePath }) {
          const wb = new ExJs.Workbook();
          await wb.xlsx.readFile(filePath);
          const sheet = wb.getWorksheet("Sheet1");

          const output = await readExcel(sheet, searchText);

          const cell = sheet.getCell(output.row, output.col + change.colChange);
          cell.value = replaceText;
          await wb.xlsx.writeFile(filePath);
          return true;
        },
      });
    },
    specPattern: "cypress/integration/examples",
  },
  env: {
    url: "https://rahulshettyacademy.com",
  },
});

//json file ->html
