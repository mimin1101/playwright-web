const {test, expect} = require('@playwright/test')
const {LoginPage} = require("../pages/login.page");

function randomgreetings(){
    const greetings = ["Hello", "Hi", "Ciao", "Good day", "Hey guys", "Namaste", "Bonjour", "Ohayo", "你好", "你好!"]
    return greetings[Math.floor(Math.random() * greetings.length)]
}
function randomroles(){
    const roles = ["QA", "Dev", "PM", "BA"]
    return roles [Math.floor(Math.random() * roles.length)]
}

function randombusinessRequirements(){
    const role = randomroles()
    return `a senior ${role}`
}

function randombusinessDetails(){
    const businessDetails = "utilize their solid knowledge and experience in"
    const role = randomroles()
    return `${businessDetails} ${role} position and contributing for development team.`

}

test.beforeEach(async ({page}) =>{
    await page.goto('https://app-dev.referreach.com/')
});

test('create ask',
    async ({page}) => {
        const Greetings = randomgreetings();
        const Roles = randomroles();
        const Requirements = randombusinessRequirements();
        const Details = randombusinessDetails();

        //Login
        const loginPage = new LoginPage(page);
        await loginPage.enterEmail('minh.ha+i30@referreach.com');
        await loginPage.enterPass('Referreach1!');
        await page.getByRole('button', {name: 'Login'}).click()
        await loginPage.clickLogin();

        //Create ask
        await page.locator('.text-\\[\\#0A5287\\] > line:nth-child(2)').click()
        await page.waitForTimeout(1000);
        await page.getByRole('button', {name: 'Create Asks'}).click();
        await page.locator('div').filter({hasText: /^Hi$/}).nth(1).click();
        await page.getByRole('textbox').first().press('Meta+a');
        await page.getByRole('textbox').first().fill(Greetings);
        await page.getByLabel('as the QA').click();
        await page.getByLabel('as the QA').press('Meta+a');
        await page.getByLabel('as the QA').fill(Roles);

        await page.getByRole('textbox').nth(1).fill(Requirements)

        await page.getByPlaceholder('Why? For which purpose do you').fill(Details);
        await page.waitForTimeout(1000);
        await page.locator('.text-\\[\\#0A5287\\] > line:nth-child(2)').click()
        await page.locator('form').filter({ hasText: 'I\'m looking' }).locator('img').click();

        //Select location
        await page.getByPlaceholder('Select your location').click();
        await page.getByText('Aachen, Germany').click();

        //Select deadline
        await page.locator('div').filter({hasText: /^By When\*$/}).getByRole('textbox').click();
        await page.getByLabel('Choose Thursday, February 29th,').click();
        await page.getByRole('button', {name: 'Set Date'}).click();

        //Input Criteria
        await page.getByPlaceholder('e.g. 1-3 years of experience').fill('fgjghjkgu');

        //Input additional
        await page.getByPlaceholder('Additional detail').fill(' bv vbn bv');
        await page.waitForTimeout(1000);
        await page.locator('form').filter({hasText: 'Location*Aachen, GermanyBy'}).locator('img').click();
        await page.getByRole('button', {name: 'Done'}).click();

        await expect(page.getByRole('heading', {name: 'Woohoo!'})).toBeVisible()
    });

