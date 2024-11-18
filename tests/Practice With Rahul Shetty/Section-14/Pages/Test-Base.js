const base = require('@playwright/test');

exports.CustomTest = base.test.extend({
     testDataForOrder: {
        userEmail : "mhshovon1@gmail.com",
        userPassword : "Mhshovon1",
    
        productName : "ADIDAS ORIGINAL",
    
        creditCardNumber : "9999888877776666",
        cvvCode : "789",
        nameOnCard : "FIRST CUSTOMER",
    
        couponCode : "rahulshettyacademy",
        
        desireCountryName : " Bangladesh"
    }
})