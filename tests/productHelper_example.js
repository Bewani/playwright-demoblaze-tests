
import { expect } from '@playwright/test';

//click on a product by product title and Verify navigation

export async function clickByLaptopName (page,productName){
    await page.click(`h4.card-title:has-text("${productName}")`);
    await page.waitForSelector('.name');
    await expect(page.locator('.name')).toHaveText(productName);
}

//Add current product to the cart and accept alert

export async function addToCart(page){
    await page.click ('a:has-text("Add to cart")');
    page.once('dialog',async dialog => {
    console.log(`Alert : ${dialog.message()}`);
    await dialog.accept();
});

//await page.waitForTimeOut(1000);
}

//verify product in cart

export async function verifyProductInCart(page,productName){
    await page.click('#cartur');
    await page.waitForSelector('.success');
    await expect(page.locator(`td:has-text("${productName}")`)).toBeVisible();
}

