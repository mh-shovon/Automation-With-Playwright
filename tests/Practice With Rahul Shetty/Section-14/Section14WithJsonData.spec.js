const { test, expect } = require('@playwright/test');
const { PomControllerPage } = require('./Controller/PomControllerPage')
// JSON --> String --> JS
const dataSet = JSON.parse(JSON.stringify(require('./JSON Data/UserInfo.json')))
//User Email- mhshovon1@gmail.com Password- Mhshovon1

test('User login and complete an order(Data retrieve from JSON file)', async({ page })=>{
    //POM Controller Page
    const pomControllerPage = new PomControllerPage(page)

    //Login Page ---------->
    const loginPage = pomControllerPage.getLoginPage();
    await loginPage.openLoginPage();
    await loginPage.loginWithValidCredentials(dataSet.userEmail, dataSet.userPassword);

    //Dashboard Page ---------->
    const dashboardPage = pomControllerPage.getDashboardPage();
    await dashboardPage.searchProductAndAddToCart(dataSet.productName);

    //Cart Page ---------->
    const cartPage = pomControllerPage.getCartPage();
    await cartPage.navigateToCartPage();
    await cartPage.verifyProductIsDisplayed(dataSet.productName);
    
    //Checkout Page ---------->
    const checkoutPage = pomControllerPage.getCheckoutPage();
    await checkoutPage.navigateToCheckoutPage();
    await page.waitForLoadState('networkidle');
    await checkoutPage.enterCardInfo(dataSet.creditCardNumber, dataSet.cvvCode, dataSet.nameOnCard);
    await checkoutPage.enterCouponInfoAndVerify(dataSet.couponCode);
    await checkoutPage.verifyingUserEmail(dataSet.userEmail);
    await checkoutPage.countrySelection(dataSet.desireCountryName);
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

