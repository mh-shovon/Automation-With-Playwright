const { expect } = require('@playwright/test');
class CheckoutPage{
    constructor(page){
        this.page = page;
        this.checkoutBtn = page.locator("text=Checkout");
        this.creditCardNumber = page.locator('input[type="text"]').nth(0);
        this.cvvCode = page.locator('input[type="text"]').nth(1);
        this.nameOnCard = page.locator('input[type="text"]').nth(2);
        this.applyCoupon = page.locator('input[type="text"]').nth(3);
        this.applyCouponBtn = page.locator("button[type$='submit']");
        this.couponAppliedOrNotChecking = page.locator('[style="color: green;"]');
        this.gmailAvailable = page.locator(".user__name [type='text']").first();
        this.selectCountryField =  page.locator("[placeholder*='Country']");
        this.countryDropdown = page.locator(".ta-results");
        this.placeOrderBtn = page.locator("a.btnn.action__submit.ng-star-inserted");
        this.orderSuccessMessage = page.locator(".hero-primary"); 
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }
    
    async navigateToCheckoutPage(){
        await this.checkoutBtn.click();
    }

    async enterCardInfo(creditCardNumber, cvvCode, nameOnCard){
        await this.creditCardNumber.fill("");
        await this.creditCardNumber.fill(creditCardNumber);
        await this.cvvCode.fill(cvvCode);
        await this.nameOnCard.fill(nameOnCard);
    }

    async enterCouponInfoAndVerify(couponCode){
        await this.applyCoupon.fill(couponCode);
        await this.applyCouponBtn.click();
        const textContent = await this.couponAppliedOrNotChecking.textContent();
        console.log(textContent);
        expect(textContent).toContain(" Coupon Applied");
    }

    async verifyingUserEmail(userEmail){
        await expect(this.gmailAvailable).toHaveText(userEmail);
    }

    async countrySelection(desireCountryName){
        await this.selectCountryField.type("bang", {delay : 100});
        await this.countryDropdown.waitFor();
        const countryOptionsCount = await this.countryDropdown.locator("button").count();
        let i = 0;
        while(i < countryOptionsCount){
            const countryName = await this.countryDropdown.locator("button").nth(i).textContent();
            if(countryName === desireCountryName){// if use trim function then--> countryName.trim() === "Bangladesh" [the space remove by the trim]
                await this.countryDropdown.locator("button").nth(i).click();
                console.log("Country is selected")
                break;
            }
            i++;
        }
    }

    async submitOrderAndGetOrderId(){
        //await this.placeOrderBtn.waitFor();
        await this.placeOrderBtn.click();
        await expect(this.orderSuccessMessage).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();
    }
}
module.exports = { CheckoutPage };