const {test, expect} = require('@playwright/test');
test('Browser context playwright test', async ({browser})=>
    {
        //Open browser and a new tab
        const openBrowser = await browser.newContext();
        const newTab = await openBrowser.newPage();
        await newTab.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const loginPage = newTab;
        console.log(await loginPage.title());
    
        //Locators
        const userName = loginPage.locator("#username");
        const userPassword = loginPage.locator("[type = 'password']");
        const signInBtn = loginPage.locator("#signInBtn");
        const cardTitles = loginPage.locator(".card-body a");
    
        //Login with invalid credentials
        await userName.fill("learning");
        await userPassword.fill("123456");
        await signInBtn.click();
        console.log(await loginPage.locator("[style*='block']").textContent());
        await expect(loginPage.locator("[style*='block']")).toContainText("Incorrect username/password."); //Incorrect username/password.
    
        //Login with valid credentials
        await userName.fill("");
        await userName.fill("rahulshettyacademy");
        await userPassword.fill("");
        await userPassword.fill("learning");
        await signInBtn.click();
        console.log(await cardTitles.nth(0).textContent());
        await expect(cardTitles.nth(0)).toContainText("iphone XX");
    
        //Handling/Viewing multiple element of a list
        console.log(await cardTitles.first().textContent());
        console.log(await cardTitles.nth(1).textContent());
        const allElementTitles = await cardTitles.allTextContents(); 
        console.log(allElementTitles);
});