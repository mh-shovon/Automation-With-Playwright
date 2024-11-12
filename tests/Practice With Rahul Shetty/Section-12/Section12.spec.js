const {test, expect} = require('@playwright/test');
const path = require('path');

test.skip('Test-1 :: Screenshot Capturing', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const inputBox = page.locator("#displayed-text");
    await expect(inputBox).toBeVisible();
    await page.screenshot({path:'./tests/Practice With Rahul Shetty/Section-12/Screenshots/Screenshot-1.png'}); //whole page
    await inputBox.screenshot({path:'./tests/Practice With Rahul Shetty/Section-12/Screenshots/Screenshot-2.jpg'}); //Specific element
    const hideBtn = page.locator("#hide-textbox");
    await hideBtn.click();
    await expect(inputBox).toBeHidden();
});

test('Test-2 :: Visual Comparison', async ({page})=>{
    await page.goto("https://flightexpert.com/");
    expect(await page.screenshot()).toMatchSnapshot('./tests/Practice With Rahul Shetty/Section-12/landing.png');
});