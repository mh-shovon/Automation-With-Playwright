const {test, expect, request} = require('@playwright/test');

test.beforeAll(async ({browser})=>{
    const openBrowser = await browser.newContext();
    const newTab = openBrowser.newPage();
    await newTab.goto("https://rahulshettyacademy.com/client");
    console.log(await newTab.title());
    await expect(newTab).toHaveTitle("Let's Shop");

    const enteredEmail = "mhshovon1@gmail.com";
    const userEmail = page.locator("#userEmail");
    await userEmail.fill(enteredEmail);

    const  userPassword = page.locator("#userPassword");
    await userPassword.fill("Mhshovon1");

    const loginBtn = page.locator("#login");
    await loginBtn.click();

    const allItemList = page.locator(".card-body b");
    await page.waitForLoadState('networkidle');
    const allItemTitles = await allItemList.allTextContents();
    console.log(allItemTitles);
})
test('User login and complete an order', async({ page })=>{
    //User Login------------------->
        await page.context().clearCookies();
        await page.context().clearPermissions();
        await page.goto("https://rahulshettyacademy.com/client");
        console.log(await page.title());
        await expect(page).toHaveTitle("Let's Shop");
    
        const enteredEmail = "mhshovon1@gmail.com";
        const userEmail = page.locator("#userEmail");
        await userEmail.fill(enteredEmail);
    
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
        await cvvCode.fill("123");
    
        const nameOnCard = page.locator('input[type="text"]').nth(2);
        await nameOnCard.fill("ABCDEF GHIJKL");
    
        const applyCoupon = page.locator('input[type="text"]').nth(3);
        await applyCoupon.fill("rahulshettyacademy");
    
        const applyCouponBtn = page.locator("button[type$='submit']");
        await applyCouponBtn.click();
        const couponAppliedOrNotChecking = page.locator('[style="color: green;"]');
        const textContent = await couponAppliedOrNotChecking.textContent();
        console.log(textContent);
        expect(textContent).toContain(" Coupon Applied");

        const selectCountry =  page.locator("[placeholder*='Country']");
        await selectCountry.type("bang", {delay:100});
        const countryDropdown = page.locator(".ta-results");
        await countryDropdown.waitFor(countryDropdown);
        const countryOptionsCount = await countryDropdown.locator("button").count();
        let j = 0;
        while(j < countryOptionsCount){
            const countryName = await countryDropdown.locator("button").nth(j).textContent();
            if(countryName === " Bangladesh"){// if use trim function then--> countryName.trim() === "Bangladesh" [the space remove by the trim]
                await countryDropdown.locator("button").nth(j).click();
                console.log("Country is selected")
                break;
            }
            j++;
        }
    
        const gmailAvailable = page.locator(".user__name [type='text']").first();
        await expect(gmailAvailable).toHaveText(enteredEmail);
    
        const placeOrderBtn = page.locator(".btnn.action__submit");
        await placeOrderBtn.click();
    
        const orderSuccessMessage = page.locator(".hero-primary");
        await expect(orderSuccessMessage).toHaveText(" Thankyou for the order. ");
    
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log("Your Order Id is : ", orderId);
    
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
        // const orderIdInDetailsPage = await page.locator(".col-text").textContent();
        // console.log(expect(orderId.includes(orderIdInDetailsPage)).toBeTruthy());
        const orderIdInDetailsPage = await page.locator(".col-text").textContent();
        if(orderIdInDetailsPage){
            expect(orderId.includes(orderIdInDetailsPage)).toBeTruthy();
        } else{
            console.log("Element with selector '.col-text' not found or has no text.");
        }
    });