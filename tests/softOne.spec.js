import { title } from 'process';
import { test } from './testWithUser.js';
import { expect } from '@playwright/test';
import {
    clickByLaptopName,
    addToCart,
    verifyProductInCart,
    deleteProductFromCart,
    placeOrder
  } from '../helpers/productHelpers.js';

// importing required test structure and assertion from the test folder
//import { hello, helloWorld } from './demo/hello.js';


/*test('Check hello and helloWorld function', async () => {
    expect(hello()).toBe('hello');
    expect(helloWorld()).toBe('hello world');
});*/

/*test('Sign up with Unique user to demoblaze.com', async({page}) => {
    // go to home page
    await page.goto('https://www.demoblaze.com/');

    //click on sign up link on the nav bar
    await page.click('#signin2');

    //wait for the signup modal to appear
    await expect (page.locator('#signInModal')).toBeVisible();

    //creating variables for username & password
    const username = `user_${Date.now()}`;
    

    //fill the Username and the password- new user
    await page.fill('#sign-username', username );
    await page.fill('#sign-password', 'Bewani')

    //click on the sign up button inside the modal
    
    await page.click('button:has-text("sign up")')

    // wait for the success alert and accept it

    page.once('dialog', async dialog =>{
        console.log(`Dialog message : ${dialog.message()}`);
        await dialog.accept();
    });


    // explicitly wait, utill the event is success
    await page.waitForTimeout(2000);


});*/

test ('Sign up process runs', async ({user})=> {
    console.log('Sign up User', user.username);
    expect(user.username).toBeDefined();
});

test('Login with Created user', async ({user})=>{

    const {page,username, password} = user;

    //await expect (page.locator('#signInModal')).toBeHidden();

    await page.click('#login2');

    await expect (page.locator('#logInModal')).toBeVisible();

    await page.fill('#loginusername',username);
    await page.fill('#loginpassword',password);

    await page.click('button:has-text("Log in")')

    await expect(page.locator('#nameofuser')).toHaveText(
        new RegExp(username,'i'),
        { timeout: 10000 }
    )

});

test.describe('Search, add to cart and place order flows', () => {
    const productName = 'Sony vaio i5';
  
    test.beforeEach(async ({ page }) => {
      await page.goto('https://www.demoblaze.com/');
      await page.click('a:has-text("Laptops")');
      await page.waitForSelector('.card-title');
    });
  
    test('Search for Sony laptops', async ({ page }) => {
      const laptopTitles = await page.$$eval('.card-title', els => els.map(e => e.textContent.trim()));
      const sonyLaptops = laptopTitles.filter(title => title.toLowerCase().includes('sony'));
      console.log('Sony laptops found:', sonyLaptops);
      expect(sonyLaptops.length).toBeGreaterThan(0);
    });
  
    test('Add Sony laptop to cart and delete it', async ({ page }) => {
      await clickByLaptopName(page, productName);
      await addToCart(page);
      await verifyProductInCart(page, productName);
      await deleteProductFromCart(page, productName);
    });
  
    test('Place an order with Sony laptop', async ({ page }) => {
      await clickByLaptopName(page, productName);
      await addToCart(page);
      await verifyProductInCart(page, productName);
      await placeOrder(page, {
        name: 'Bewani',
        country: 'SriLanka',
        card: '4242424242424242',
        month: '12',
        year: '2025'
      });
    });
  });



