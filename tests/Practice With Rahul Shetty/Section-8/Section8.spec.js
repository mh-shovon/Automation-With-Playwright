const {test, expect} = require('@playwright/test');
const exp = require('constants');
test.skip('Test case for section-8 on playwright special locators', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //User Email- mhshovon1@gmail.com Password- Mhshovon1 

    const userName = page.locator(".form-group [name='name']");
    await userName.fill("Hasan Shovon");

    const userEmail = page.locator(".form-group [name='email']");
    await userEmail.fill("mhshovon1@gmail.com");

    const userPassword = page.getByPlaceholder("Password");
    await userPassword.fill("Mhshovon1")

    const checkboxForIceCreamLover = page.getByLabel("Check me out if you Love IceCreams!");
    await checkboxForIceCreamLover.check();

    const selectGender = page.getByLabel("Gender");
    await selectGender.selectOption("Female")

    const employmentStatus = page.getByLabel("Employed");
    await employmentStatus.check();

    const submitBtn = page.getByRole("button", {name: 'Submit'});
    await submitBtn.click();

    const successMessage = page.getByText("Success! The Form has been submitted successfully!.");
    console.log(await successMessage.isVisible());
    if(successMessage.isVisible()){
        const closeMessage = page.locator(".close");
        await closeMessage.click()
    } else{
        console.log("Message not found")
    }

    const shopBtn = page.getByRole("link", {name: "Shop"});
    await shopBtn.click();
    
    const productList = page.locator("app-card");
    await productList.filter({hasText: 'Nokia Edge'}).getByRole("button").click(); 
});

test.skip('Rewrite end to end testing with getBy items', async ({page})=>{
    //User Email- mhshovon1@gmail.com Password- Mhshovon1 
    await page.context().clearCookies();
    await page.context().clearPermissions();
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");

    const enteredEmail = "mhshovon1@gmail.com";
    const productName = "ADIDAS ORIGINAL";

    const userEmail = page.getByPlaceholder("email@example.com");
    await userEmail.fill(enteredEmail);

    const userPassword = page.getByPlaceholder("enter your passsword");
    await userPassword.fill("Mhshovon1");

    const loginBtn = page.getByRole('button', {name: 'Login'});
    await loginBtn.click();

    await page.waitForLoadState('networkidle');
    const allItemList = page.locator(".card-body b");
    await allItemList.first().waitFor();

    const itemOnDashboard = page.locator(".card-body").filter({hasText: productName}).getByRole('button', {name: 'Add to Cart'});
    await itemOnDashboard.click();

    const cartBtn = page.getByRole("listitem").getByRole("button", {name: 'Cart'})
    await cartBtn.click();

    await page.locator("div li").first().waitFor();
    await expect(page.getByText(productName)).toBeVisible();

    const checkoutBtn = page.getByRole('button', {name: 'Checkout'});
    await checkoutBtn.click();
    await page.waitForLoadState('networkidle');

    const creditCardNumber = page.locator('input[type="text"]').nth(0);
    await creditCardNumber.fill("");
    await creditCardNumber.fill("1111222233334444");

    const cvvCode = page.locator('input[type="text"]').nth(1);
    await cvvCode.fill("123");

    const nameOnCard = page.locator('input[type="text"]').nth(2);
    await nameOnCard.fill("ABCDEF GHIJKL");

    const applyCouponInput = page.locator('input[type="text"]').nth(3);
    await applyCouponInput.fill("rahulshettyacademy");

    const applyCouponBtn = page.getByRole("button", {name:"Apply Coupon"});;
    await applyCouponBtn.click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText("Coupon Applied")).toBeVisible();

    const selectCountry =  page.getByPlaceholder("Select Country");
    await selectCountry.pressSequentially("ban")
    const countryOptionSelection = page.getByRole("button", {name: "Bangladesh"});
    await countryOptionSelection.click()

    const gmailAvailable = page.locator(".user__name [type='text']").first();
    await expect(gmailAvailable).toHaveText(enteredEmail);

    const placeOrderBtn = page.getByText("PLACE ORDER");
    await placeOrderBtn.click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible(); 
});

test('Date picker automation', async ({page})=>{
    await page.context().clearCookies();
    await page.context().clearPermissions();
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    const month = 6;
    const date = 15;
    const year = 2027;
    const expectedValue = [month, date, year];
    const datePicker = page.locator(".react-date-picker__inputGroup");
    await datePicker.click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month-1)).click();
    await page.locator("//abbr[text()='"+date+"']").click(); 
    const inputs = await page.locator(".react-daa=te-picker__inputGroup input");
    for(let index = 0; index <inputs.length; index++){
        const value = inputs[index].getAttribute("value");
        expect(value).toEqual(expectedValue[index])
    }
});