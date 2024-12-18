const { test, expect } = require('@playwright/test');
const { PomControllerPage } = require('./Controller/PomControllerPage')
//User Email- mhshovon1@gmail.com Password- Mhshovon1

test('User login and complete an order', async({ page })=>{
    //POM Controller Page
    const pomControllerPage = new PomControllerPage(page)
    //Login Page ---------->
    const loginPage = pomControllerPage.getLoginPage();
    const userEmail = "mhshovon1@gmail.com";
    const userPassword = "Mhshovon1";
    await loginPage.openLoginPage();
    await loginPage.loginWithValidCredentials(userEmail, userPassword);

    //Dashboard Page ---------->
    const dashboardPage = pomControllerPage.getDashboardPage();
    const productName = 'ADIDAS ORIGINAL';
    await dashboardPage.searchProductAndAddToCart(productName);

    //Cart Page ---------->
    const cartPage = pomControllerPage.getCartPage();
    await cartPage.navigateToCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    
    //Checkout Page ---------->
    const checkoutPage = pomControllerPage.getCheckoutPage();
    await checkoutPage.navigateToCheckoutPage();
    await page.waitForLoadState('networkidle');
    const creditCardNumber = "9999888877776666";
    const cvvCode = "789";
    const nameOnCard = "ABCDEF GHIJKL";
    await checkoutPage.enterCardInfo(creditCardNumber, cvvCode, nameOnCard);
    const couponCode = "rahulshettyacademy";
    await checkoutPage.enterCouponInfoAndVerify(couponCode);
    await checkoutPage.verifyingUserEmail(userEmail);
    const desireCountryName = " Bangladesh";
    await checkoutPage.countrySelection(desireCountryName);
    const orderId = await checkoutPage.submitOrderAndGetOrderId();
    console.log(orderId);

    //Order details Page ---------->
    const myOrdersPage = pomControllerPage.getMyOrdersPage();
    await myOrdersPage.navigateToOrdersPage();
    await myOrdersPage.searchTheOrderIdAndView(orderId);
    const orderIdInDetailsPage = await myOrdersPage.getOrderIdFromOrderDetails();
    if (orderIdInDetailsPage) {
        expect(orderId.includes(orderIdInDetailsPage)).toBeTruthy();
    } else {
        console.log("Element with selector '.col-text' not found or has no text.");
    }
});

