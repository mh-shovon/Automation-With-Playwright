const {test, expect} = require('@playwright/test');
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
    const textSearch = "Mango";
    const updatedPrice = '350';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
    const waitForDownload = page.waitForEvent('download') //create a wait for download event 
    const downloadButton = page.getByRole('button', {name: 'Download'});
    await downloadButton.click(); 
    await waitForDownload;//wait for download
    await dataWriteOnExcel('/Users/USER/Downloads/download.xlsx', textSearch, updatedPrice, {rowChange: 0, columnChange: 2});
    const chooseFileButton = page.locator("#fileinput");
    await chooseFileButton.click();
    await chooseFileButton.setInputFiles('/Users/USER/Downloads/download.xlsx')
    const textSearchLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has: textSearchLocator});
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updatedPrice);
});