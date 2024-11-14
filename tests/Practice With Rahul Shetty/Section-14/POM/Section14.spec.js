const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CheckoutPage } = require('./CheckoutPage');

//User Email- mhshovon1@gmail.com Password- Mhshovon1

test('User login and complete an order', async({ page })=>{
    const loginPage = new LoginPage(page);
    const userEmail = "mhshovon1@gmail.com";
    const userPassword = "Mhshovon1";
    await loginPage.openLoginPage();
    await loginPage.loginWithValidCredentials(userEmail, userPassword);

    const dashboardPage = new DashboardPage(page);
    const productName = 'ADIDAS ORIGINAL';
    await dashboardPage.searchProductAndAddToCart(productName);
    await dashboardPage.navigateToCartPageAndValidateOrderItem();
    const desireItem = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(desireItem).toBeTruthy();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.navigateToTheCartPage();
    await page.waitForLoadState('networkidle');
    const creditCardNumber = "9999888877776666"
    const cvvCode = "789";
    const nameOnCard = "ABCDEF GHIJKL";
    const applyCoupon = "rahulshettyacademy";

    const 
    await applyCouponBtn.click();
    const couponAppliedOrNotChecking = page.locator('[style="color: green;"]');
    const textContent = await couponAppliedOrNotChecking.textContent();
    console.log(textContent);
    expect(textContent).toContain(" Coupon Applied");

    // function delay(time) {
    //     return new Promise(function(resolve) { 
    //         setTimeout(resolve, time)
    //     });
    // }
    // await delay(4000);

    const selectCountry =  page.locator("[placeholder*='Country']");
    await selectCountry.type("bang", {delay:100});
    const countryDropdown = page.locator(".ta-results");
    await countryDropdown.waitFor(countryDropdown);
    const countryOptionsCount = await countryDropdown.locator("button").count();
    let j = 0;
    while(j < countryOptionsCount){
        const countryName = await countryDropdown.locator("button").nth(j).textContent();
        if(countryName === " Bangladesh"){// if use trim function then--> countryName.trim() === "Bangladesh" [the space remove by the trim]
            await countryDropdown.locator("button").nth(j).click();
            console.log("Country is selected")
            break;
        }
        j++;
    }

    const gmailAvailable = page.locator(".user__name [type='text']").first();
    await expect(gmailAvailable).toHaveText(userEmail);

    const placeOrderBtn = page.locator(".btnn.action__submit");
    await placeOrderBtn.click();

    const orderSuccessMessage = page.locator(".hero-primary");
    await expect(orderSuccessMessage).toHaveText(" Thankyou for the order. ");

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Your Order Id is : ", orderId);

    const ordersBtn = page.locator("button[routerlink*='myorders']");
    await ordersBtn.click();

    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    let k = 0;
    while(k < await rows.count()){
        const orderIdInRow = await rows.nth(k).locator("th").textContent();
        if(orderId.includes(orderIdInRow)){
            console.log("Order id is found in the order list.")
            await rows.nth(k).locator("button").first().click();
            break;
        }
        k++;
    }
    // const orderIdInDetailsPage = await page.locator(".col-text").textContent();
    // console.log(expect(orderId.includes(orderIdInDetailsPage)).toBeTruthy());
    const orderIdInDetailsPage = await page.locator(".col-text").textContent();
    if(orderIdInDetailsPage){
        expect(orderId.includes(orderIdInDetailsPage)).toBeTruthy();
    } else{
        console.log("Element with selector '.col-text' not found or has no text.");
    }
});