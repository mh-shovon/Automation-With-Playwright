const {test, expect} = require('@playwright/test');

test('Page playwright test', async ({page})=>
{
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");   
});
