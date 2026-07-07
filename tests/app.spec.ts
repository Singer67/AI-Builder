import { _electron as electron, type ElectronApplication, type Page } from 'playwright';
import { test, expect } from '@playwright/test';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let app: ElectronApplication;
let window: Page;

test.beforeAll(async () => {
  app = await electron.launch({
    args: ['.'],
    cwd: path.resolve(__dirname, '..'),
    env: {
      ...process.env,
      NODE_ENV: 'production',
    },
  });
  window = await app.firstWindow();
  await window.waitForLoadState('networkidle');
});

test.afterAll(async () => {
  if (app) await app.close();
});

test('应该正确显示页面标题', async () => {
  await expect(window).toHaveTitle(/Studio/);
});

test('导航栏应该正确渲染', async () => {
  const brand = window.locator('.nav-brand');
  await expect(brand).toHaveText('Studio');

  const links = window.locator('.nav-links a');
  await expect(links).toHaveCount(3);
  await expect(links.nth(0)).toHaveText('Work');
  await expect(links.nth(1)).toHaveText('Approach');
  await expect(links.nth(2)).toHaveText('Contact');
});

test('Hero 区域应该包含主标题', async () => {
  const h1 = window.locator('h1');
  await expect(h1).toContainText('设计');
  await expect(h1).toContainText('对话');
});

test('Hero 区域应该包含 CTA 按钮', async () => {
  const cta = window.locator('.hero-cta');
  await expect(cta).toBeVisible();
  await expect(cta).toContainText('探索我们的方式');
});

test('Approach 卡片应该渲染', async () => {
  const cards = window.locator('.card');
  await expect(cards).toHaveCount(3);

  await expect(cards.nth(0)).toContainText('化繁为简');
  await expect(cards.nth(1)).toContainText('细节之中');
  await expect(cards.nth(2)).toContainText('以人为本');
});

test('引用区域应该存在', async () => {
  const blockquote = window.locator('.quote-section');
  await expect(blockquote).toBeVisible();
  await expect(blockquote.locator('blockquote')).toContainText('好的设计');
  await expect(blockquote.locator('cite')).toContainText('Dieter Rams');
});

test('页脚应该包含正确内容', async () => {
  const footer = window.locator('.footer');
  await expect(footer).toBeVisible();
  await expect(footer).toContainText('2024 Studio');

  const footerLinks = footer.locator('.footer-links a');
  await expect(footerLinks).toHaveCount(3);
});

test('主题切换按钮应该存在', async () => {
  const toggle = window.locator('.theme-toggle');
  await expect(toggle).toBeVisible();
  await expect(toggle).toBeEnabled();
});

test('切换主题应该正确改变 data-theme 属性', async () => {
  const toggle = window.locator('.theme-toggle');

  // 获取当前主题
  const initialTheme = await window.evaluate(() =>
    document.documentElement.getAttribute('data-theme'),
  );

  // 点击切换
  await toggle.click();
  await window.waitForTimeout(400); // 等待 React 更新

  const afterFirstClick = await window.evaluate(() =>
    document.documentElement.getAttribute('data-theme'),
  );

  // 主题应该改变（从 dark 到 light 或反之）
  expect(afterFirstClick).not.toBe(initialTheme);

  // 再点一次，应该回到初始状态
  await toggle.click();
  await window.waitForTimeout(400);

  const afterSecondClick = await window.evaluate(() =>
    document.documentElement.getAttribute('data-theme'),
  );
  expect(afterSecondClick).toBe(initialTheme);
});

test('主题偏好应该在 localStorage 中持久化', async () => {
  const toggle = window.locator('.theme-toggle');

  // 获取当前主题和 localStorage 值
  const before = await window.evaluate(() => ({
    theme: document.documentElement.getAttribute('data-theme'),
    stored: localStorage.getItem('theme-preference'),
  }));
  expect(before.stored).toBe(before.theme || 'light');

  // 切换一次
  await toggle.click();
  await window.waitForTimeout(400);

  const after = await window.evaluate(() => ({
    theme: document.documentElement.getAttribute('data-theme'),
    stored: localStorage.getItem('theme-preference'),
  }));
  expect(after.stored).toBe(after.theme || 'light');
  expect(after.stored).not.toBe(before.stored);
});

test('Scroll reveal 动画元素应该存在且有正确的类', async () => {
  const reveals = window.locator('.reveal');
  const count = await reveals.count();

  // 应该有多个 reveal 元素
  expect(count).toBeGreaterThan(5);

  // 延迟类应该在正确的元素上
  const d1Els = window.locator('.reveal-d1');
  const d2Els = window.locator('.reveal-d2');
  const d3Els = window.locator('.reveal-d3');

  await expect(d1Els.first()).toBeAttached();
  await expect(d2Els.first()).toBeAttached();
  await expect(d3Els.first()).toBeAttached();
});
