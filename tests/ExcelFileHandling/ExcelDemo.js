const ExcelJs = require("exceljs");

const workBook = new ExcelJs.Workbook();
workBook.xlsx.readFile("/Users/USER/Desktop/Restricted Area/Own Files/Automation Work/Playwright/RahulShettyPlaywrightCourse.xlsx").then(function(){
    const workSheet = workBook.getWorksheet('Sheet1');
    workSheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, columnNumber) => { //every cell is eventually a column number 
        console.log(cell.value);
      });
    });
});

