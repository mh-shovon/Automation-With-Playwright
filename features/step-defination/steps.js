const { Given, When, Then} = require('@cucumber/cucumber');
const { PomControllerPage } = require('../../tests/Practice With Rahul Shetty/Section-14/Controller/PomControllerPage');
const playwright = require('@playwright/test');
const { expect } = require('@playwright/test');

Given('a login to ecommerce application with valid user credentials- {string} and {string}', { timeout: 100*1000 }, async function (userEmail, userPassword) {
    const browser = playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    this.pomControllerPage = new PomControllerPage(page);

    const loginPage = this.pomControllerPage.getLoginPage();
    await loginPage.openLoginPage();
    await loginPage.loginWithValidCredentials(userEmail, userPassword);
  });

  When('Add {string} to the cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const dashboardPage = this.pomControllerPage.getDashboardPage();
    await dashboardPage.searchProductAndAddToCart(productName);
  });

  Then('verify {string} is displayed in the cart', async function (productName) {
    const cartPage = this.pomControllerPage.getCartPage();
    await cartPage.navigateToCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
  });

  When('Enter valid details and place the order', async function (creditCardNumber, cvvCode, nameOnCard, couponCode, userEmail, desireCountryName) {
    const checkoutPage = this.pomControllerPage.getCheckoutPage();
    await checkoutPage.navigateToCheckoutPage();
    await page.waitForLoadState('networkidle');
    await checkoutPage.enterCardInfo(creditCardNumber, cvvCode, nameOnCard);
    await checkoutPage.enterCouponInfoAndVerify(couponCode);
    await checkoutPage.verifyingUserEmail(userEmail);
    await checkoutPage.countrySelection(desireCountryName);
    const orderId = await checkoutPage.submitOrderAndGetOrderId();
    console.log(orderId);
  });

  Then('Verify the order is presented in the order history page', async function () {
    const myOrdersPage = this.pomControllerPage.getMyOrdersPage();
    await myOrdersPage.navigateToOrdersPage();
    await myOrdersPage.searchTheOrderIdAndView(orderId);
    const orderIdInDetailsPage = await myOrdersPage.getOrderIdFromOrderDetails();
      if (orderIdInDetailsPage) {
          expect(orderId.includes(orderIdInDetailsPage)).toBeTruthy();
      } else {
          console.log("Element with selector '.col-text' not found or has no text.");
      }
  });
