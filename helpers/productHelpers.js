// helpers/productHelpers.js
import { expect } from '@playwright/test';



export async function clickByLaptopName(page, name) {
  await page.click(`h4.card-title:has-text("${name}")`);
  await expect(page.locator('.name')).toHaveText(name);
}

export async function addToCart(page) {
  await page.click('a:has-text("Add to cart")');
  page.once('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept();
  });
  await page.waitForTimeout(2000);
}

export async function navigateToCart(page) {
  await page.click('a:has-text("Cart")');
  expect(page.waitForURL('**/cart.html'));
}

export async function verifyProductInCart(page, productName) {
  await expect(page.locator(`tr:has-text("${productName}")`)).toBeVisible();
  await page.waitForSelector('tr:has-text("Sony vaio i5")', { timeout: 15000 });
  await expect(page.locator('tr:has-text("Sony vaio i5")')).toBeVisible();
}

export async function deleteProductFromCart(page, productName) {
  const row = page.locator(`tr:has-text("${productName}")`);
  await expect(row).toBeVisible();
  await page.click(`tr:has-text("${productName}") a:has-text("Delete")`);
  await expect(row).toHaveCount(0);
}

export async function placeOrder(page, userInfo) {
  await expect(page.locator('button:has-text("Place Order")')).toBeVisible();
  await page.click('button:has-text("Place Order")');
  await expect(page.locator('#orderModal')).toBeVisible();

  await page.fill('#name', userInfo.name);
  await page.fill('#country', userInfo.country);
  await page.fill('#card', userInfo.card);
  await page.fill('#month', userInfo.month);
  await page.fill('#year', userInfo.year);

  await page.click('button:has-text("Purchase")');
  await expect(page.locator('h2:has-text("Thank you for your purchase!")')).toBeVisible();
}
