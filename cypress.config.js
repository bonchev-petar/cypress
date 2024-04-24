const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
const fs = require("fs");
const excelToJson = require("convert-excel-to-json");

// async function setupNodeEvents(on, config) {
//   on("task", {
//     excelToJsonConverter(filepath) {
//       const result = excelToJson({
//         source: fs.readFileSync(filepath), // fs.readFileSync return a Buffer
//       });
//       console.log("hello: ", JSON.stringify(parsed, null, 4));
//       return result;
//     },
//   });
//   return config;
// }

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
    },
    specPattern: "cypress/integration/examples",
  },
  env: {
    url: "https://rahulshettyacademy.com",
  },
});

//json file ->html
