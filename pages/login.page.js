exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailField = page.getByLabel('Email*');
        this.passWordField = page.getByLabel('Password*');
        this.loginButton = page.getByRole('button', { name: 'Login' })
    }
    async enterEmail(email){
        await this.emailField.fill(email)
    }
    async enterPass(password){
        await this.passWordField.fill(password)
    }
    async clickLogin(){
        await this.loginButton.click()
    }
}