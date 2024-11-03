const {test, expect} = require('@playwright/test');
test('Test case for section-9 on playwright special locators', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //User Email- mhshovon1@gmail.com Password- Mhshovon1 

    const userName = page.locator(".form-group [name='name']");
    await userName.fill("Hasan Shovon");

    const userEmail = page.locator(".form-group [name='email']");
    await userEmail.fill("mhshovon1@gmail.com");

    const userPassword = page.getByPlaceholder("Password");
    await userPassword.fill("Mhshovon1")

    const checkboxForIceCreamLover = page.getByLabel("Check me out if you Love IceCreams!");
    await checkboxForIceCreamLover.check();

    const selectGender = page.getByLabel("Gender");
    await selectGender.selectOption("Female")

    const employmentStatus = page.getByLabel("Employed");
    await employmentStatus.check();

    const submitBtn = page.getByRole("button", {name: 'Submit'});
    await submitBtn.click();

    const twoWayDataBindingExample = await page.locator("h4 [name='name']").textContent();
    console.log(twoWayDataBindingExample);
});