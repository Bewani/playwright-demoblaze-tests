import { title } from 'process';
import { test } from './testWithUser.js';
import { expect } from '@playwright/test';
import { clickByLaptopName,addToCart,verifyProductInCart } from './productAction.js';

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

test.describe('search product and adding product to cart and delete from the cart', () => {

    test.beforeEach(async ({page})=>{
        await page.goto('https://www.demoblaze.com/');
        await page.click('a:has-text("Laptops")');
        await page.waitForSelector('.card-title');

    });

    test ('Search for all brands sony laptops', async({page})=>{
        //go to home page
        //await page.goto('https://www.demoblaze.com/');
    
        //click on the laptop menu item
         //await page.click ('a:has-text("Laptops")');
    
           // Wait until all laptops are loaded 
        /*await page.waitForFunction(() => {
        const cards = document.querySelectorAll('.card-title');
        return cards.length > 0;
         });*/
    
         //wait for all the laptops to load
         const laptoptitles = page.locator('.card-title');
         const count = await laptoptitles.count();
    
          expect(count).toBeGreaterThan(0);
    
         //Get all the laptop titels
         const laptopTitels = await page.$$eval('.card-title', els => els.map(e => e.textContent.trim()));
    
         //filter laptop that include "sony"
         const sonyLaptops = laptopTitels.filter(title => title.toLowerCase().includes('sony'));
    
         console.log('Sony laptop found : ', sonyLaptops);
    
         expect(sonyLaptops.length).toBeGreaterThan(0);
    
    });
    
    test('Click on sony laptop and add to cart', async({page})=>{
    
    
        // go to the page
        //await page.goto('https://www.demoblaze.com/');
    
        //click on the laptop menu item
        //await page.click('a:has-text("Laptops")');
    
        //wait for laptops to load
        //await page.waitForSelector('.card-title');
    
        //click on a product
        await page.click('h4.card-title:has-text("Sony vaio i5")');

        //const product = 'Sony vaio i5';

        //await clickByLaptopName(page,product);
    
        //wait for product details page to load
    
        await page.waitForSelector('.name');
    
        //verify weather the product page is load or not
       await expect (page.locator('.name')).toHaveText('Sony vaio i5');

       //await addToCart(page);
       //await verifyProductInCart(page, product);


       await page.click('a:has-text("Add to cart")');

       page.once('dialog', async dialog =>{
        console.log(`Dialog message : ${dialog.message()}`);
        await dialog.accept();


        });

        await page.waitForTimeout(2000);

         //navigate to the cart

         await page.click('a:has-text("Cart")');

         //verify navigating to the cart page
        expect(page.waitForURL('**/cart.html'));

          //wait until added product visible in the cart

          await page.waitForSelector('tr:has-text("Sony vaio i5")', { timeout: 15000 });

            //verify the row actualy there

        await expect(page.locator('tr:has-text("Sony vaio i5")')).toBeVisible();

          //click on the delete option

          await page.click('a:has-text("Delete")');

          await expect(page.locator('tr:has-text("Sony vaio i5")')).toHaveCount(0);
  
          await page.waitForTimeout(500);

});

        test('Placing the order', async ({page})=>{
            await page.click('h4.card-title:has-text("Sony vaio i5")');

            //const product = 'Sony vaio i5';
    
            //await clickByLaptopName(page,product);
        
            //wait for product details page to load
        
            await page.waitForSelector('.name');
        
            //verify weather the product page is load or not
           await expect (page.locator('.name')).toHaveText('Sony vaio i5');
    
           //await addToCart(page);
           //await verifyProductInCart(page, product);
    
    
           await page.click('a:has-text("Add to cart")');
    
           page.once('dialog', async dialog =>{
            console.log(`Dialog message : ${dialog.message()}`);
            await dialog.accept();
    
    
            });

            await page.waitForTimeout(2000);

            //navigate to the cart
   
            await page.click('a:has-text("Cart")');
   
            //verify navigating to the cart page
           expect(page.waitForURL('**/cart.html'));
   
             //wait until added product visible in the cart
   
             await page.waitForSelector('tr:has-text("Sony vaio i5")', { timeout: 15000 });
   
               //verify the row actualy there
   
           await expect(page.locator('tr:has-text("Sony vaio i5")')).toBeVisible();

           //wait until place order button is visible

           await expect (page.locator('button:has-text("Place Order")')).toBeVisible();

           //click on the place order button

           await page.click('button:has-text("Place Order")');

           //verify payment info, pop up is available
           await expect(page.locator('#orderModal')).toBeVisible();

           //proceeds with adding info, info the order modal

           await page.fill('#name','Bewani');
           await page.fill('#country','SriLanka');
           await page.fill('#card','4242424242424242');
           await page.fill('#month','12');
           await page.fill('#year','2025');

           //click on purchase button

           await page.click('button:has-text("Purchase")')

           //order success message

           await expect(page.locator('h2:has-text("Thank you for your purchase!")')).toBeVisible();


        });


    
});



