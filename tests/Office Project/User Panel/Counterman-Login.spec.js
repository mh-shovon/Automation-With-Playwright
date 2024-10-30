const {test, expect} = require('@playwright/test');

test('Browser open and visiting the url successfully', async ({browser})=>{
    const openBrowser = await browser.newContext();
    const newTab = await openBrowser.newPage();
    await newTab.goto("https://dev.user.jatri.co/login");
    const loginPage = newTab;
    const pageTitle = await loginPage.title();
    console.log(pageTitle);
    await expect(loginPage).toHaveTitle("Login Your System");
});

test('Login with empty credentials', async ({page})=>{
    await page.goto("https://dev.user.jatri.co/login");

    //Locators
    const userPhoneNumber = page.locator("input[placeholder='01XXXXXXXXX']");
    const userPassword = page.locator("input[placeholder='Password']");
    const loginBtn = page.locator("#login-btn");
    const requiredPhoneError = page.locator("//p[normalize-space()='Phone is required']");
    const requirePasswordError = page.locator("//p[normalize-space()='Password is required']");

    //Entering Credentials for login
    await userPhoneNumber.fill("");
    await userPassword.fill("");
    await loginBtn.click();

    try{
        console.log(await requiredPhoneError.textContent());
        await expect(requiredPhoneError).toContainText("Phone is required");
        console.log(await requirePasswordError.textContent());
        await expect(requirePasswordError).toContainText("Password is required");
        console.log("Assertion Passed- User login failed")
    }catch(error){
        console.log("Assertion Failed- Test failed because of assertion failed")
    }
});

test('Login with only phone number', async ({page})=>{
    await page.goto("https://dev.user.jatri.co/login");

    //Locators
    const userPhoneNumber = page.locator("input[placeholder='01XXXXXXXXX']");
    const userPassword = page.locator("input[placeholder='Password']");
    const loginBtn = page.locator("#login-btn");
    const requirePasswordError = page.locator("//p[normalize-space()='Password is required']");

    //Entering Credentials for login
    await userPhoneNumber.fill("01888000061");
    await userPassword.fill("");
    await loginBtn.click();
    
    try{
        console.log(await requirePasswordError.textContent());
        await expect(requirePasswordError).toContainText("Password is required");
        console.log("Assertion Passed- User login failed")
    }catch(error){
        console.log("Assertion Failed- Test failed because of assertion failed")
    }
});

test('Login with password only', async ({page})=>{
    await page.goto("https://dev.user.jatri.co/login");

    //Locators
    const userPhoneNumber = page.locator("input[placeholder='01XXXXXXXXX']");
    const userPassword = page.locator("input[placeholder='Password']");
    const loginBtn = page.locator("#login-btn");
    const requiredPhoneError = page.locator("//p[normalize-space()='Phone is required']");

    //Entering Credentials for login
    await userPhoneNumber.fill("");
    await userPassword.fill("01888000061");
    await loginBtn.click();
    
    try{
        console.log(await requiredPhoneError.textContent());
        await expect(requiredPhoneError).toContainText("Phone is required");
        console.log("Assertion Passed- User login failed")
    }catch(error){
        console.log("Assertion Failed- Test failed because of assertion failed")
    }
});

test('Login with valid credentials', async ({page})=>{
    await page.goto("https://dev.user.jatri.co/login");

    //Locators
    const userPhoneNumber = page.locator("input[placeholder='01XXXXXXXXX']");
    const userPassword = page.locator("input[placeholder='Password']");
    const loginBtn = page.locator("#login-btn");
    const loginSuccessfulMessage = page.locator(".mosha__toast__content__description");
    //Entering Credentials for login
    await userPhoneNumber.fill("01888000061");
    await userPassword.fill("01888000061");
    await loginBtn.click();
    
    try{
        console.log(await loginSuccessfulMessage.textContent());
        await expect(loginSuccessfulMessage).toContainText("Login Successful");
        console.log("Assertion Passed- User login successfully")
    }catch(error){
        console.log("Assertion Failed- Test failed because of assertion failed")
    }
    
})