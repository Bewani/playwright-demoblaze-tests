import {test as baseTest,expect } from '@playwright/test';
//import { expect } from 'chai';

export const test = baseTest.extend({
    user:async ({browser}, use) => {

        const context = await browser.newContext({headless: false,sloMo:500});
        const page = await context.newPage();

        //Generate unique username/password

        const username = `user_${Date.now()}`;
        const password = `Bewani`;

        //signup steps
        await page.goto('https://www.demoblaze.com');
        await page.click('#signin2');
        await expect (page.locator('#signInModal')).toBeVisible();
        await page.fill('#sign-username', username);
        await page.fill('#sign-password',password);

        await page.click('button:has-text("sign up")');

        
    page.once('dialog', async dialog =>{
        console.log(`Dialog message : ${dialog.message()}`);
        await dialog.accept();
    });

    //await expect (page.locator('#signInModal')).toBeHidden();

    await page.waitForTimeout(500);

    await use ({username, password, page});



    }
})