class ApiUtils{
    constructor(apiContext, loginPayload){
        this.apiContext = apiContext;
        this.loginPayload =loginPayload;
    }
    async getLoginToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayload});
        const loginResponseJson = await loginResponse.json();
        const loginToken = loginResponseJson.token;
        console.log("User login token is: ", loginToken);
        return loginToken;
    }

    async createOrder(orderPayload){
        let response = {};
        response.token = await this.getLoginToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayload,
            headers: {
                'Authorization' : response.token,
                'Content-Type' : 'application/json'
            },
        });
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        console.log('The new order id is: ', orderId);
        return response;
    }
}
module.exports = {ApiUtils};