const {test} = require('@playwright/test');
const ExcelJs = require("exceljs");

async function dataReadFromExcel(workSheet, searchText){
    let output = {row:-1, column:-1};
    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, columnNumber) => { //every cell is eventually a column number 
          //console.log(cell.value);
          if(cell.value === searchText){
            output.row = rowNumber;
            output.column = columnNumber;
          }
        });
    });
    return output;
}

async function dataWriteOnExcel(filePath, searchText, replaceText, change){
  const workBook = new ExcelJs.Workbook();
  await workBook.xlsx.readFile(filePath);
  const workSheet = workBook.getWorksheet('Sheet1');
  const output = await dataReadFromExcel(workSheet, searchText);
  const cell = workSheet.getCell(output.row, output.column+change.columnChange);
  cell.value = replaceText; //Write a new value in the existing cell
  await workBook.xlsx.writeFile(filePath);//Write a new value in the existing cell and save it in the file
}

test('Upload and download excel file', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
    const waitForDownload = page.waitForEvent('download')
    const downloadButton = page.getByRole('button', {name: 'Download'});
    await downloadButton.click();
    await waitForDownload;
    await dataWriteOnExcel("/Users/USER/Downloads/download.xlsx", "Mango", 350, {rowChange: 0, columnChange: 2} );
    const chooseFileButton = page.getByRole('button', {name: 'Choose File'});
    await chooseFileButton.click();
    await chooseFileButton.setInputFiles('/Users/USER/Downloads/download.xlsx')
});