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

async function writeExcel(searchText, replaceText, change, filePath) {
  const wb = new ExJs.Workbook();
  await wb.xlsx.readFile(filePath);
  const sheet = wb.getWorksheet("Sheet1");

  const output = await readExcel(sheet, searchText);

  const cell = sheet.getCell(output.row, output.col + change.colChange);
  cell.value = replaceText;
  await wb.xlsx.writeFile(filePath);
}

//Update
writeExcel(
  "Mango",
  350,
  { rowChange: 0, colChange: 2 },
  "/Users/pbonchev/development/cypress/Excel/download.xlsx"
);
