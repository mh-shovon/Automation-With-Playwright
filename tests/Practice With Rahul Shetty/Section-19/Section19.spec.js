const { test, expect } = require('@playwright/test');
const { PomControllerPage } = require('../Section-14/Controller/PomControllerPage')
// JSON --> String --> JS
const dataSet = JSON.parse(JSON.stringify(require('../Section-14/JSON Data/UserInfoForMultipleUser.json')));
//User Email- mhshovon1@gmail.com Password- Mhshovon1

test.describe.configure({ mode: 'serial' }); //mode = [serial/parallel]

for(const data of dataSet){
    test(`@CiCd Test-1 for :: ${data.productName}`, async({ page })=>{
        //POM Controller Page
        const pomControllerPage = new PomControllerPage(page)
    
        //Login Page ---------->
        const loginPage = pomControllerPage.getLoginPage();
        await loginPage.openLoginPage();
        await loginPage.loginWithValidCredentials(data.userEmail, data.userPassword);
    
        //Dashboard Page ---------->
        const dashboardPage = pomControllerPage.getDashboardPage();
        await dashboardPage.searchProductAndAddToCart(data.productName);
    
        //Cart Page ---------->
        const cartPage = pomControllerPage.getCartPage();
        await cartPage.navigateToCartPage();
        await cartPage.verifyProductIsDisplayed(data.productName);
        
        //Checkout Page ---------->
        const checkoutPage = pomControllerPage.getCheckoutPage();
        await checkoutPage.navigateToCheckoutPage();
        await page.waitForLoadState('networkidle');
        await checkoutPage.enterCardInfo(data.creditCardNumber, data.cvvCode, data.nameOnCard);
        await checkoutPage.enterCouponInfoAndVerify(data.couponCode);
        await checkoutPage.verifyingUserEmail(data.userEmail);
        await checkoutPage.countrySelection(data.desireCountryName);
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
} 