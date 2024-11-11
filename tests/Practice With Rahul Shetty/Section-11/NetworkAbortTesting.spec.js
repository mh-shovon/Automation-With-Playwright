const {test, expect} = require('@playwright/test');
const { request } = require('http');
test('Network aborting', async ({browser})=>
    {
        const context = await browser.newContext();
        const page = await context.newPage();
        // newTab.route('**/*.css',
        //     route=>route.abort()
        // );

        // page.route('**/*{jpeg,png,jpg}',
        //     route=>route.abort()
        // );
        
        page.on('request',
            request=> console.log(request.url())
        );

        page.on('response',
            response=> console.log(response.url(), response.status())
        );

        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());
    
        const userName = page.locator("#username");
        await userName.fill("");
        await userName.fill("rahulshettyacademy");
        const userPassword = page.locator("[type = 'password']");
        await userPassword.fill("");
        await userPassword.fill("learning");
        const signInBtn = page.locator("#signInBtn");
        await signInBtn.click();
        const cardTitles = page.locator(".card-body a");
        console.log(await cardTitles.nth(0).textContent());
        await expect(cardTitles.nth(0)).toContainText("iphone X");
    });