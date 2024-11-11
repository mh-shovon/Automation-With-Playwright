//User Email- mhshovon1@gmail.com Password- Mhshovon1
const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("./UtilsFile/ApiUtils");
const loginPayload = {
  userEmail: "mhshovon1@gmail.com",
  userPassword: "Mhshovon1",
};
const orderPayload = {
  orders: [
    { country: "Bangladesh", productOrderedId: "6581ca979fd99c85e8ee7faf" },
  ],
};
const fakeMyOrdersPayload = { data: [], message: "No Orders" };
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test("Test-1 :: Network testing --> Intercepting the api response", async ({
  page,
}) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");
  console.log(await page.title());
  await expect(page).toHaveTitle("Let's Shop");

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      //intercepting the response :: Api response --> Fake response{playwright fake response}--> browser
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakeMyOrdersPayload);
      route.fulfill({
        response,
        body,
      });
    }
  );

  const myOrdersBtn = page.locator("button[routerlink*='myorders']");
  await myOrdersBtn.click();

  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
  );

  const infoMessage = await page.locator(".mt-4").textContent();
  console.log(infoMessage);
});
