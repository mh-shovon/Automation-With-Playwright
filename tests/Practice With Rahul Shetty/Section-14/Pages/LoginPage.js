class LoginPage {
  constructor(page) {
    this.page = page;
    this.userEmail = page.locator("#userEmail");
    this.userPassword = page.locator("#userPassword");
    this.loginInButton = page.locator("[value='Login']");
  }

  async openLoginPage() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }
  
  async loginWithValidCredentials(userEmail, userPassword) {
    await this.userEmail.fill(userEmail);
    await this.userPassword.fill(userPassword);
    await this.loginInButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { LoginPage };
