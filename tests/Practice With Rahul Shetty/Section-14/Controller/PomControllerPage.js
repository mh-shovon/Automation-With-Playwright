const { CartPage } = require("../Pages/CartPage");
const { CheckoutPage } = require("../Pages/CheckoutPage");
const { DashboardPage } = require("../Pages/DashboardPage");
const { LoginPage } = require("../Pages/LoginPage");
const { MyOrdersPage } = require("../Pages/MyOrdersPage");

class PomControllerPage{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.myOrdersPage = new MyOrdersPage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getCheckoutPage(){
        return this.checkoutPage;
    }

    getMyOrdersPage(){
        return this.myOrdersPage;
    }
}
module.exports = { PomControllerPage };