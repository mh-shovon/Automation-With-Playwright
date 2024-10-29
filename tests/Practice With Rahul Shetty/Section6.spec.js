const {test, expect} = require('@playwright/test');


//debug line to line by --debug command 
test('User Login', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");
    await userName.fill("rahulshettyacademy");

    const userPassword = page.locator("[type = 'password']");
    await userPassword.fill("learning");

    const radioBtn = page.locator(".radiotextsty");
    await radioBtn.last().click();
    console.log(await (radioBtn.last().isChecked()));
    await expect((radioBtn).last()).toBeChecked();

    const popupConfirmation = page.locator("#okayBtn");
    await popupConfirmation.click();

    const dropdowns = page.locator("select.form-control");
    await dropdowns.selectOption("Teacher");

    const termsAndCondition = page.locator("#terms");
    await termsAndCondition.click();
    await expect(termsAndCondition).toBeChecked();
    await termsAndCondition.uncheck();
    expect (await termsAndCondition.isChecked()).toBeFalsy();

    const documentLink = page.locator("[href *= 'documents-request']");
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    const signInBtn = page.locator("#signInBtn");
    await signInBtn.click();
});

//generate code by using codegen [command: npx playwright codegen https://google.com]


//Test race, screenshot, html report logs
   
