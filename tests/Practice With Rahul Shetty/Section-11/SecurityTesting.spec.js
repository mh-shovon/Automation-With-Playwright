const { test, expect } = require("@playwright/test");

test("Security test request intercept", async ({ page }) => {
  //User Login----------------------->
  await page.context().clearCookies();
  await page.context().clearPermissions();
  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title());
  await expect(page).toHaveTitle("Let's Shop");

  const enteredEmail = "mhshovon1@gmail.com";
  const userEmail = page.locator("#userEmail");
  await userEmail.fill(enteredEmail);

  const userPassword = page.locator("#userPassword");
  await userPassword.fill("Mhshovon1");

  const loginBtn = page.locator("#login");
  await loginBtn.click();

  const allItemList = page.locator(".card-body b");
  await page.waitForLoadState("networkidle");
  const allItemTitles = await allItemList.allTextContents();
  console.log(allItemTitles);

  const myOrdersBtn = page.locator("button[routerlink*='myorders']");
  await myOrdersBtn.click();

  //Intercepting the request ---------------------->
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6",
      })
  );
  const viewButton = page.locator("button:has-text('View')");
  await viewButton.first().click();

  const unauthorizedMessage = page.locator("p").last();
  await expect(unauthorizedMessage).toHaveText("You are not authorize to view this order");
});
