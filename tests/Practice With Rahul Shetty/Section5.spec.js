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
    await expect(loginPage.locator("[style*='block']")).toContainText("Incorrect username/password.");

    //Login with valid credentials
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await userPassword.fill("");
    await userPassword.fill("learning");
    await signInBtn.click();
    console.log(await cardTitles.nth(0).textContent());
    await expect(cardTitles.nth(0)).toContainText("iphone X");

    //Handling/Viewing multiple element of a list
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allElementTitles = await cardTitles.allTextContents(); 
    console.log(allElementTitles);
});

test('Visit the login url', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");
});

test('User registration', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");

    const registrationBtn = page.locator(".text-reset");
    await registrationBtn.click();

    const firstName = page.locator("#firstName");
    await firstName.fill("Hasan");

    const lastName = page.locator("#lastName");
    await lastName.fill("Shovon");

    const userEmail = page.locator("#userEmail");
    const maxForEmail = 9999;
    const randomNumberForEmail = Math.floor(Math.random()*maxForEmail);
    await userEmail.fill("mhshovon" + randomNumberForEmail + "@gmail.com");

    const userMobile = page.locator("#userMobile");
    const maxForPhoneNumber = 9999999;
    const randomNumberForPhoneNumber = Math.floor(Math.random()*maxForPhoneNumber);
    await userMobile.fill("019" + randomNumberForPhoneNumber);

    const occupationDropdown = page.locator("select.custom-select");
    await occupationDropdown.click();
    await occupationDropdown.selectOption({label: "Engineer"});

    const genderSelection = page.locator("input[value]");
    await genderSelection.first().click();

    const userPassword = page.locator("#userPassword");
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    const randomString = generateRandomString(10); // Generate a random string of length 10
    console.log(randomString);
    await userPassword.fill(randomString);

    const confirmPassword = page.locator("#confirmPassword");
    await confirmPassword.fill(randomString);
});

//User Email- mhshovon1@gmail.com Password- Mhshovon1

test('User login', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");

    const userEmail = page.locator("#userEmail");
    await userEmail.fill("mhshovon1@gmail.com");

    const  userPassword = page.locator("#userPassword");
    await userPassword.fill("Mhshovon1");

    const loginBtn = page.locator("#login");
    await loginBtn.click();

    const allItemList = page.locator(".card-body b");
    //await page.waitForLoadState('networkidle');
    await allItemList.first().waitFor();
    const allItemTitles = await allItemList.allTextContents();
    console.log(allItemTitles);

});

test('Handling dropdowns and radio button',async({page})=>{
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

test('@Child window handle', async({browser})=>
{   
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href *= 'documents-request']");
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), //listen for any new page pending, rejected, fulfilled
        documentLink.click(),
    ]) //new page is opened
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domainName  = arrayText[1].split(" ")[0];
    console.log(domainName);

    await page.locator("#username").fill(domainName);
    console.log(await page.locator("#username").textContent());
});