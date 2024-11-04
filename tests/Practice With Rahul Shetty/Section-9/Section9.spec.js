const {test, expect} = require('@playwright/test');

test('Test-1(Popup Validation)', async ({ page })=>{
    console.log("Learn Playwright with Rahul Shetty")
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://google.com");
    await page.goBack();
    await page.goForward();
});