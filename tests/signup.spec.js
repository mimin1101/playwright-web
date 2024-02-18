const{test, expect} = require('@playwright/test')

function randomFirstName(){
    const firstName = ['Jan', 'Feb', 'Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    return firstName[Math.floor(Math.random() * firstName.length)]
}

function randomLastName(){
    const lastName = ['Ha', 'Nguyen','Tran', 'Min','Le','Lam','Lai','Smith']
    return lastName[Math.floor(Math.random() * lastName.length)]
}

function randomEmail() {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let string = '';
    for( let ii=0; ii<5; ii++){
        string += chars[Math.floor(Math.random() * chars.length)];
    }
    return 'minh.ha+' + string + '@gmail.com'
}

test.beforeEach(async ({page}) =>{
    await page.goto('https://app-dev.referreach.com/')
});

test('sign up new account', async ({page})=> {
    const first_name = randomFirstName();
    const last_name = randomLastName();
    const email = randomEmail();

    const signupButton = await page.getByText('Sign Up today');
    await signupButton.click();

    await page.getByLabel('First Name*').fill(first_name);
    await page.getByLabel('Last Name*').fill(last_name);
    await page.getByRole('textbox', { name: 'Email*' }).fill(email);
    await page.getByLabel('Create Password').fill('Referreach1!');
    await page.getByLabel('Confirm Password').fill('Referreach1!');
    await page.getByRole('checkbox').first().click();
    await page.getByRole('checkbox').nth(1).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByRole('dialog').getByText('Verify Your Email')).toBeVisible();

    });
