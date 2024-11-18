class DashboardPage{
    constructor(page){
        this.page = page;
        this.allProductsList = page.locator(".card-body");
        this.allProductsTitles = page.locator(".card-body b");
    }

    async searchProductAndAddToCart(productName){
        const allItemTitles = await this.allProductsTitles.allTextContents();
        console.log(allItemTitles);
        const productsCount = await this.allProductsList.count();
        console.log("Total item in this page: ", productsCount);
        let i = 0;
        while( i < productsCount ){
            if(await this.allProductsList.nth(i).locator("b").textContent() === productName){
                await this.allProductsList.nth(i).locator("text = Add To Cart").click();
                break;
            }
            i++;
        }
    }
}

module.exports = { DashboardPage };