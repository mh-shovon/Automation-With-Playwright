//User Email- mhshovon1@gmail.com Password- Mhshovon1
const {test, expect, request} = require('@playwright/test');
const loginPayload = {userEmail: "mhshovon1@gmail.com", userPassword: "Mhshovon1"}
const orderPayload = {orders: [{country: "Bangladesh", productOrderedId: "6581ca979fd99c85e8ee7faf"}]};
let loginToken;
let orderId;
test.beforeAll( 'API Testing-Generate user token for login',async ()=> { //runs before all test case
    //Login Api
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: loginPayload});
    expect(loginResponse.ok()).toBeTruthy(); //200, 201, 202
    const loginResponseJson = await loginResponse.json();
    loginToken = loginResponseJson.token;
    console.log("User login token is: ", loginToken);

    //Order API
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: orderPayload,
        headers: {
            'Authorization' : loginToken,
            'Content-Type' : 'application/json'
        },
    });
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];
    console.log(orderId);
});

test.beforeEach( async ()=> { //runs before every single test case

});
test('Test-1(API Testing- Place Order)', async ({ page })=>{
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, loginToken);

    await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");
    
    const ordersBtn = page.locator("button[routerlink*='myorders']");
    await ordersBtn.click();

    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    let k = 0;
    while(i < await rows.count()){
        const orderIdInRow = await rows.nth(k).locator("th").textContent();
        if(orderId.includes(orderIdInRow)){
            console.log("Order id is found in the order list.")
            await rows.nth(k).locator("button").first().click();
            break;
        }
        k++;
    }

    const orderIdInDetailsPage = await page.locator(".col-text").textContent();
    await page.pause();
    if(orderIdInDetailsPage){
        expect(orderId.includes(orderIdInDetailsPage)).toBeTruthy();
    } else{
        console.log("Element with selector '.col-text' not found or has no text.");
    }
}); 