//User Email- mhshovon1@gmail.com Password- Mhshovon1
const {test, expect, request} = require('@playwright/test');
const {ApiUtils} = require('./UtilsFile/ApiUtils')
const loginPayload = {userEmail: "mhshovon1@gmail.com", userPassword: "Mhshovon1"};
const orderPayload = {orders: [{country: "Bangladesh", productOrderedId: "6581ca979fd99c85e8ee7faf"}]};
let response;

test.beforeAll( async ()=> {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('@API Test-1(API Testing- Place Order)', async ({ page })=>{
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");
    
    const ordersBtn = page.locator("button[routerlink*='myorders']");
    await ordersBtn.click();

    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    let i = 0;
    while(i < await rows.count()){
        const orderIdInRow = await rows.nth(i).locator("th").textContent();
        if(response.orderId.includes(orderIdInRow)){
            console.log("Order id is found in the order list.")
            await rows.nth(i).locator("button").first().click();
            break;
        }
        i++;
    }

    const orderIdInDetailsPage = await page.locator(".col-text").textContent();
    if(orderIdInDetailsPage){
        expect(response.orderId.includes(orderIdInDetailsPage)).toBeTruthy();
    } else{
        console.log("Element with selector '.col-text' not found or has no text.");
    }
}); 