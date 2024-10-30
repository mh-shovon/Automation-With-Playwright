const {test, expect} = require('@playwright/test');
const exp = require('constants');

//User Email- mhshovon1@gmail.com Password- Mhshovon1

test('User login and complete an order', async({page})=>{

//User Login------------------->
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");

    const userEmail = page.locator("#userEmail");
    await userEmail.fill("mhshovon1@gmail.com");

    const  userPassword = page.locator("#userPassword");
    await userPassword.fill("Mhshovon1");

    const loginBtn = page.locator("#login");
    await loginBtn.click();

    const allItemList = page.locator(".card-body b");
    await page.waitForLoadState('networkidle');
    const allItemTitles = await allItemList.allTextContents();
    console.log(allItemTitles);

//Ordering products------------------->
    const allProducts = page.locator(".card-body");
    const productsCount = await allProducts.count();
    console.log("Total item in this page: ", productsCount);
    const productName = 'ADIDAS ORIGINAL';
    console.log("Name of the desired products: ", productName);
    let i = 0;
    while( i < productsCount ){
        if(await allProducts.nth(i).locator("b").textContent() === productName){
            await allProducts.nth(i).locator("text = Add To Cart").click();
            break;
        }
        i++;
    }
    const cartBtn = page.locator("[routerlink*='cart']");
    await cartBtn.click();
    //await page.locator("div li").first().waitFor();
    //await page.waitForLoadState('networkidle');
    await page.waitForSelector("h3:has-text('ADIDAS ORIGINAL')");
    const desireItem = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(desireItem).toBeTruthy();
    const checkoutBtn = page.locator("text=Checkout");
    await checkoutBtn.click();
    await page.waitForLoadState('networkidle');
    const creditCardNumber = page.locator('input[type="text"]').nth(0);
    await creditCardNumber.fill("");
    await creditCardNumber.fill("1111222233334444");
    const cvvCode = page.locator('input[type="text"]').nth(1);
    await cvvCode.fill("");
    await cvvCode.fill("123");
    const nameOnCard = page.locator('input[type="text"]').nth(2);
    await nameOnCard.fill("ABCDEF GHIJKL")
    const applyCoupon = page.locator('input[type="text"]').nth(3);
    await applyCoupon.fill("rahulshettyacademy");
    const applyCouponBtn = page.locator("button[type$='submit']");
    await applyCouponBtn.click();
    const couponAppliedOrNotChecking = page.locator('[style="color: green;"]');
    const textContent = await couponAppliedOrNotChecking.textContent();
    console.log(textContent);
    expect(textContent).toContain(" Coupon Applied");
});