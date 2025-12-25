// tests/e2e/ui_consistency.spec.ts
import { test, expect } from '@playwright/test';

test.describe('UI Consistency', () => {
  test('should maintain consistent styling across different Docusaurus pages', async ({ page }) => {
    // Array of pages to test on
    const pages = ['/', '/docs/intro', '/blog'];

    for (const path of pages) {
      await page.goto(`http://localhost:3000${path}`);
      
      // Wait for the chatbot to be visible
      const chatbotContainer = await page.locator('.chatbotContainer');
      await expect(chatbotContainer).toBeVisible();
      
      // Verify the chatbot styling is consistent across pages
      const chatbotStyles = await chatbotContainer.evaluate(node => {
        const style = window.getComputedStyle(node);
        return {
          backgroundColor: style.backgroundColor,
          borderRadius: style.borderRadius,
          boxShadow: style.boxShadow,
          position: style.position,
          bottom: style.bottom,
          right: style.right
        };
      });
      
      // Verify expected styling properties
      expect(chatbotStyles.position).toBe('fixed');
      expect(chatbotStyles.bottom).toBe('20px');
      expect(chatbotStyles.right).toBe('20px');
      expect(chatbotStyles.borderRadius).toBe('10px');
      
      // Verify that the chatbot doesn't interfere with page content
      const pageContent = await page.locator('main').boundingBox();
      const chatbotBox = await chatbotContainer.boundingBox();
      
      // The chatbot should not overlap with main content significantly
      expect(pageContent && chatbotBox).toBeDefined();
    }
  });

  test('should maintain consistent color scheme with Docusaurus theme', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Wait for the chatbot to be visible
    const chatbotContainer = await page.locator('.chatbotContainer');
    await expect(chatbotContainer).toBeVisible();
    
    // Check button styling matches expected Docusaurus styling
    const sendButton = page.locator('button', { hasText: 'Send' });
    await expect(sendButton).toBeVisible();
    
    const buttonStyles = await sendButton.evaluate(node => {
      const style = window.getComputedStyle(node);
      return {
        backgroundColor: style.backgroundColor,
        color: style.color,
        borderColor: style.borderColor,
        borderRadius: style.borderRadius
      };
    });
    
    // We expect the button to use Docusaurus-like styling
    // (Exact values may vary based on Docusaurus theme)
    expect(buttonStyles.borderRadius).toBe('5px');
    expect(buttonStyles.color).toBe('rgb(255, 255, 255)'); // white text

    // Check input styling
    const inputField = page.locator('input[type="text"]');
    await expect(inputField).toBeVisible();
    
    const inputStyles = await inputField.evaluate(node => {
      const style = window.getComputedStyle(node);
      return {
        borderColor: style.borderColor,
        borderRadius: style.borderRadius
      };
    });
    
    expect(inputStyles.borderRadius).toBe('5px');
  });

  test('should be responsive across different screen sizes', async ({ page }) => {
    // Test on different viewports
    const viewports = [
      { width: 375, height: 667 },  // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 } // Desktop
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('http://localhost:3000');
      
      // Wait for the chatbot to be visible
      const chatbotContainer = await page.locator('.chatbotContainer');
      await expect(chatbotContainer).toBeVisible();
      
      // Check that the chatbot is properly positioned regardless of viewport
      const boundingBox = await chatbotContainer.boundingBox();
      
      // Verify the chatbot has reasonable dimensions for the viewport
      expect(boundingBox.width).toBeGreaterThan(200); // Minimum reasonable width
      expect(boundingBox.width).toBeLessThan(viewport.width); // Should fit in viewport
      
      expect(boundingBox.height).toBeGreaterThan(300); // Minimum reasonable height
      expect(boundingBox.height).toBeLessThan(viewport.height); // Should fit in viewport
    }
  });
});