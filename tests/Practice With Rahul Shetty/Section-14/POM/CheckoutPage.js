class CheckoutPage{
    constructor(page){
        this.page = page;
        this.checkoutBtn = page.locator("text=Checkout");
        this.creditCardNumber = page.locator('input[type="text"]').nth(0);
        this.cvvCode = page.locator('input[type="text"]').nth(1);
        this.nameOnCard = page.locator('input[type="text"]').nth(2);
        this.applyCoupon = page.locator('input[type="text"]').nth(3);
        this.applyCouponBtn = page.locator("button[type$='submit']");
    }
    
    async navigateToTheCartPage(){
        await this.checkoutBtn.click();
    }

    async paymentProcedure(creditCardNumber, cvvCode, nameOnCard, applyCoupon){
        await this.creditCardNumber.fill("");
        await this.creditCardNumber.fill("creditCardNumber");
        await this.cvvCode.fill(cvvCode);
        await this.nameOnCard.fill(nameOnCard);
        await this.applyCoupon.fill()
    }
}
module.exports = {CheckoutPage};