class MyOrdersPage{
    constructor(page){
        this.page = page;
        this.ordersBtn = page.locator("button[routerlink='/dashboard/myorders']");
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderIdInDetailsPage = page.locator(".col-text");
    }

    async navigateToOrdersPage(){
        await this.ordersBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async searchTheOrderIdAndView(orderId){
        await this.ordersTable.waitFor();
        let i = 0;
        const rowCount = await this.rows.count();
        while(i < rowCount){
            const orderIdInRow = await this.rows.nth(i).locator("th").textContent();
            if(orderId.includes(orderIdInRow)){
                console.log("Order id is found in the order list.")
                await this.rows.nth(i).locator("button").first().click();
                return
            }
            i++;
        }
        console.log("Order id not found in the list.")
    }

    async getOrderIdFromOrderDetails(){
        return await this.orderIdInDetailsPage.textContent();
    }
}
module.exports = { MyOrdersPage };