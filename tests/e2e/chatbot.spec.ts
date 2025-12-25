// tests/e2e/chatbot.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Chatbot Widget', () => {
  test.beforeEach(async ({ page }) => {
    // Visit a Docusaurus page that contains the chatbot
    await page.goto('http://localhost:3000'); // Assuming Docusaurus runs on port 3000
  });

  test('should load chatbot widget on the page', async ({ page }) => {
    // Find the chatbot container
    const chatbotContainer = await page.locator('.chatbotContainer');
    
    // Wait for the chatbot to be visible
    await expect(chatbotContainer).toBeVisible();
  });

  test('should allow user to send a message', async ({ page }) => {
    // Wait for the chatbot to be visible
    const chatbotContainer = await page.locator('.chatbotContainer');
    await expect(chatbotContainer).toBeVisible();

    // Type a message in the input field
    const inputField = page.locator('input[type="text"]');
    await expect(inputField).toBeVisible();
    await inputField.fill('Hello, are you a chatbot?');
    
    // Click the send button
    const sendButton = page.locator('button', { hasText: 'Send' });
    await sendButton.click();
    
    // Check that the user message appears in the message history
    await expect(page.locator('.message', { hasText: 'Hello, are you a chatbot?' })).toBeVisible();
  });

  test('should display bot response after sending a message', async ({ page }) => {
    // Wait for the chatbot to be visible
    const chatbotContainer = await page.locator('.chatbotContainer');
    await expect(chatbotContainer).toBeVisible();

    // Type a message in the input field
    const inputField = page.locator('input[type="text"]');
    await expect(inputField).toBeVisible();
    await inputField.fill('What is artificial intelligence?');
    
    // Click the send button
    const sendButton = page.locator('button', { hasText: 'Send' });
    await sendButton.click();
    
    // Check that the user message appears
    await expect(page.locator('.message', { hasText: 'What is artificial intelligence?' })).toBeVisible();
    
    // Wait for the bot response to appear (with timeout)
    await page.waitForSelector('.message', { state: 'visible', timeout: 10000 });
    
    // Check that a bot response appears (with bot as sender)
    const botMessages = await page.locator('.message:has-text("bot:")').all();
    expect(botMessages.length).toBeGreaterThan(0);
  });

  test('should handle empty input gracefully', async ({ page }) => {
    // Wait for the chatbot to be visible
    const chatbotContainer = await page.locator('.chatbotContainer');
    await expect(chatbotContainer).toBeVisible();

    // Ensure the input field is empty
    const inputField = page.locator('input[type="text"]');
    await expect(inputField).toBeVisible();
    await inputField.fill('');
    
    // Click the send button (should not submit empty message)
    const sendButton = page.locator('button', { hasText: 'Send' });
    await sendButton.click();
    
    // Verify no new message was added
    const messages = await page.locator('.message').count();
    expect(messages).toBe(0);
  });
});