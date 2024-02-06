const { test, expect } = require('@playwright/test');
const {LoginPage} = require('../pages/login.page.js');

test.beforeEach(async ({page}) =>{
  await page.goto('https://app-dev.referreach.com/')
});

test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.enterEmail('minh.ha+i30@referreach.com');
  await loginPage.enterPass('Referreach1!');
  await page.getByRole('button', { name: 'Login' }).click()
  await loginPage.clickLogin();
  await expect (page.getByRole('button', { name: 'Create Asks' })).toBeVisible()
});