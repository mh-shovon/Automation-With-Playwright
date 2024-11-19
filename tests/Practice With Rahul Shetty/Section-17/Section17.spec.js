const {test, expect} = require('@playwright/test');

test.describe.configure({mode: 'serial'})
test('@Web Test-1(Hidden field validation)', async ({ page })=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();
    const inputBox = page.locator("#displayed-text");
    await expect(inputBox).toBeVisible()
    const hideBtn = page.locator("#hide-textbox");
    await hideBtn.click();
    await expect(inputBox).toBeHidden();
});

test('@Web Test-2(Popup handling)', async ({ page })=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const confirmBtn = page.locator("#confirmbtn");
    page.on('dialog', dialog => dialog.accept()); //for accept the popup
    //page.on('dialog', dialog => dialog.dismiss()); //for decline/dismiss the popup
    await confirmBtn.click();
});

test('Test-3(Mouse Hover)', async ({ page })=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const mouseHoverBtn = page.locator("#mousehover");
    await mouseHoverBtn.hover();
    // const hoverItemTop = page.locator(".mouse-hover-content a");
    // await hoverItemTop.first().click();
    const hoverItemReload = page.getByText("Reload");
    await hoverItemReload.last().click();
});

test('Test-4(Handling Frame)', async ({ page })=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const framesPage = page.frameLocator("#courses-iframe");
    await page.waitForLoadState('networkidle');
    const allAccessPlanBtn = framesPage.locator("li a[href*='lifetime-access']:visible");
    await allAccessPlanBtn.click();
    const getText = await framesPage.locator(".text h2").textContent();
    const checkText = getText.split(" ")[1];
    console.log(checkText);
});