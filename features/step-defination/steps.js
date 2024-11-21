const { Given, When, Then } = require('@cucumber/cucumber');
const { PomControllerPage } = require('../../tests/Practice With Rahul Shetty/Section-14/Controller/PomControllerPage');
const playwright = require('@playwright/test');
const { expect } = require('@playwright/test');

Given('a login to ecommerce application with {string} and {string}', { timeout: 120 * 1000 }, async function (userEmail, userPassword) {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  this.pomControllerPage = new PomControllerPage(page);

  const loginPage = this.pomControllerPage.getLoginPage();
  await loginPage.openLoginPage();
  await loginPage.loginWithValidCredentials(userEmail, userPassword);

  this.browser = browser; // Store the browser instance for cleanup
});

When('Add {string} to the cart', async function (productName) {
  const dashboardPage = this.pomControllerPage.getDashboardPage();
  await dashboardPage.searchProductAndAddToCart(productName);
});

Then('verify {string} is displayed in the cart', async function (productName) {
  const cartPage = this.pomControllerPage.getCartPage();
  await cartPage.navigateToCartPage();
  await cartPage.verifyProductIsDisplayed(productName);
});

When('Enter valid details and place the order with {string}, {string}, {string}, {string}, {string}, and {string}', { timeout: 500*1000 }, async function (creditCardNumber, cvvCode, nameOnCard, couponCode, userEmail, desireCountryName) {
  const checkoutPage = this.pomControllerPage.getCheckoutPage();
  await checkoutPage.navigateToCheckoutPage();
  await checkoutPage.enterCardInfo(creditCardNumber, cvvCode, nameOnCard);
  await checkoutPage.enterCouponInfoAndVerify(couponCode);
  await checkoutPage.verifyingUserEmail(userEmail);
  await checkoutPage.countrySelection(desireCountryName.trim()); // Trim extra spaces
  this.orderId = await checkoutPage.submitOrderAndGetOrderId();
  console.log(this.orderId);
});

Then('Verify the order is presented in the order history page', async function () {
  const myOrdersPage = this.pomControllerPage.getMyOrdersPage();
  await myOrdersPage.navigateToOrdersPage();
  await myOrdersPage.searchTheOrderIdAndView(this.orderId);
  const orderIdInDetailsPage = await myOrdersPage.getOrderIdFromOrderDetails();
  expect(orderIdInDetailsPage).toBeDefined();
  expect(this.orderId.includes(orderIdInDetailsPage)).toBeTruthy();
});

Then('Cleanup resources', async function () {
  await this.browser.close(); // Ensure the browser is closed
});
