import { test, expect } from "@playwright/test";

test("console has no red errors", async ({page}) => {
  const errors=[];
  page.on("console",m=>{if(m.type()==="error") errors.push(m.text())});
  page.on("pageerror",e=>errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("main")).toBeVisible();
  expect(errors).toEqual([]);
});

test("no horizontal overflow", async ({page}) => {
  await page.goto("/");
  const r=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth}));
  expect(r.scrollWidth).toBeLessThanOrEqual(r.clientWidth+1);
});

test("first viewport contains required sections", async ({page}) => {
  await page.goto("/");
  await expect(page.locator("#home")).toBeVisible();
  await expect(page.locator("#scope")).toBeAttached();
  await expect(page.locator("#intro")).toBeAttached();
  await expect(page.locator("#activity")).toBeAttached();
});

test("internal links have targets", async ({page}) => {
  await page.goto("/");
  const hrefs=await page.locator('a[href^="#"]').evaluateAll(els=>els.map(e=>e.getAttribute("href")).filter(Boolean));
  for(const href of hrefs) await expect(page.locator(href)).toHaveCount(1);
});

test("heading hierarchy starts with one h1", async ({page}) => {
  await page.goto("/");
  expect(await page.locator("h1").count()).toBe(1);
  const levels=await page.locator("h1,h2,h3").evaluateAll(els=>els.map(e=>Number(e.tagName.slice(1))));
  for(let i=1;i<levels.length;i++) expect(levels[i]-levels[i-1]).toBeLessThanOrEqual(1);
});

test("keyboard interaction works with Enter and Space", async ({page}) => {
  await page.goto("/");
  const toggle=page.locator(".toggle").first();
  await toggle.focus();
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded","true");
  const panelId=await toggle.getAttribute("aria-controls");
  await expect(page.locator("#"+panelId)).toBeVisible();
  await page.keyboard.press("Space");
  await expect(toggle).toHaveAttribute("aria-expanded","false");
});

test("reduced motion control works", async ({page}) => {
  await page.goto("/");
  const button=page.locator("#motionButton");
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed","true");
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed","false");
});
