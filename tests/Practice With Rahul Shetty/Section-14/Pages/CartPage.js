const { test, expect } = require("@playwright/test");
class CartPage {

    constructor(page) {
        this.page = page;
        this.cartBtn = page.locator("[routerlink*='cart']");
        this.cartItems = page.locator("div li").first();
    }
  
     async navigateToCartPage(){
         await this.cartBtn.click();
    }
    getProductLocator(productName){
        return this.page.locator("h3:has-text('"+productName+"')");
    }
    async verifyProductIsDisplayed(productName) {
        await this.cartItems.waitFor();
        await this.page.waitForLoadState('networkidle');
        const desireItem = await this.getProductLocator(productName).isVisible();
        expect(desireItem).toBeTruthy();
    }
}
module.exports = { CartPage };
