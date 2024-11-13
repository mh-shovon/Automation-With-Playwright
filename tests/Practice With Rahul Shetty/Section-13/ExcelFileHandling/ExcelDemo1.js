const ExcelJs = require("exceljs");

//Using then 
const workBook = new ExcelJs.Workbook();
workBook.xlsx.readFile("/Users/USER/Desktop/Restricted Area/Own Files/Automation Work/Playwright/RahulShettyPlaywrightCourse.xlsx").then(function(){
    const workSheet = workBook.getWorksheet('Sheet1');
    workSheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, columnNumber) => { //every cell is eventually a column number 
        console.log(cell.value);
      });
    });
});

//Using async and await 
async function excelHandling() {
  let output = {row:-1, column:-1};
  const workBook = new ExcelJs.Workbook();
  await workBook.xlsx.readFile("/Users/USER/Desktop/Restricted Area/Own Files/Automation Work/Playwright/RahulShettyPlaywrightCourse.xlsx");
  const workSheet = workBook.getWorksheet('Sheet1');
  workSheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, columnNumber) => { //every cell is eventually a column number 
        //console.log(cell.value);
        if(cell.value === "Banana"){
          output.row = rowNumber;
          output.column = columnNumber;
        }
      });
  });
  
  const cell = workSheet.getCell(output.row, output.column);
  cell.value = "Hello"; //Write a new value in the existing cell
  await workBook.xlsx.writeFile("/Users/USER/Desktop/Restricted Area/Own Files/Automation Work/Playwright/RahulShettyPlaywrightCourse.xlsx");//Write a new value in the existing cell and save it in the file
}
excelHandling();