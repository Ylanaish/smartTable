import { chromium } from "playwright-core";

const BASE = "http://localhost:5199";
const OUT = "C:/Users/Ylanaish/AppData/Local/Temp/opencode/shots3";

const VIEWPORTS = [
  ["sm", 360, 740],
  ["md", 390, 844],
  ["lg", 430, 932],
  ["xl", 768, 1024],
  ["desktop", 1440, 900],
];

const errors = [];
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});

// ---- 1. все маршруты на всех разрешениях ----
for (const [name, width, height] of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(`[${name}] ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`[${name}] ${m.text()}`);
  });

  for (const path of ["/home", "/orders", "/catalog", "/orders/9999", "/intro"]) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(250);
    const text = await page.locator("body").innerText();
    if (/Unexpected Application Error|Unexpected application error/i.test(text)) {
      errors.push(`[${name}] ${path}: error boundary`);
    }
    if (text.trim().length < 40) errors.push(`[${name}] ${path}: пусто`);
    const of = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (of > 1) errors.push(`[${name}] ${path}: переполнение ${of}px`);
  }
  await context.close();
}

// ---- 2. сквозной сценарий: оплата -> история -> статус ----
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.on("pageerror", (e) => errors.push(`[flow] ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`[flow] ${m.text()}`);
});

const step = async (label, path) => {
  await page.getByRole("button", { name: new RegExp(label) }).first().click();
  await page.waitForTimeout(350);
  console.log(`  ${label.padEnd(28)} -> ${new URL(page.url()).pathname}`);
};

console.log("Сценарий:");
await page.goto(`${BASE}/intro`, { waitUntil: "networkidle" });
await step("Мои заказы и каталог", "/home");
await page.screenshot({ path: `${OUT}/md-home.png` });

// из хаба в мастер
await step("Создать новый заказ", "/event");
await step("Далее: выбрать стиль стола", "/style");
await step("Далее: меню", "/menu");
await step("Далее: формат сервиса", "/format");
await step("Далее: оплата", "/payment");
await step("Оплатить", "/tracking");
await page.screenshot({ path: `${OUT}/md-tracking.png` });
await step("Смотреть детали заказа", "/done");
await step("На главную", "/home");

// проверяем, что заказ попал в историю
await step("Статус заказов", "/orders");
await page.screenshot({ path: `${OUT}/md-orders.png` });

const rows = page.locator("ul > li > button");
const count = await rows.count();
console.log(`  заказов в списке: ${count}`);
if (count !== 1) errors.push(`ожидался 1 заказ в истории, получено ${count}`);

await rows.first().click();
await page.waitForTimeout(350);
const statusPath = new URL(page.url()).pathname;
console.log(`  открыт заказ: ${statusPath}`);
if (!/^\/orders\/\d+$/.test(statusPath)) errors.push(`плохой путь статуса: ${statusPath}`);
await page.screenshot({ path: `${OUT}/md-order-status.png` });

// номер в истории должен совпадать с номером на экране оплаты
const historyNo = await page.evaluate(() => {
  const orders = JSON.parse(localStorage.getItem("smarttable:orders"));
  return orders?.[0]?.orderNo ?? null;
});
const shownNo = (await page.locator("h1").first().innerText()).match(/\d+/)?.[0];
console.log(`  в localStorage № ${historyNo}, на экране № ${shownNo}`);
if (String(historyNo) !== String(shownNo)) errors.push(`номер не совпал: ${historyNo} vs ${shownNo}`);

// каталог
await page.goto(`${BASE}/catalog`, { waitUntil: "networkidle" });
await page.waitForTimeout(300);
const allDishes = await page.locator("ul > li").count();
console.log(`  блюд в каталоге (все): ${allDishes}`);
if (allDishes < 10) errors.push(`мало блюд в каталоге: ${allDishes}`);
const badges = await page.getByText("в заказе").count();
console.log(`  блюд с бейджем «в заказе»: ${badges}`);
if (badges < 1) errors.push("каталог не показывает текущий выбор блюд");
await page.screenshot({ path: `${OUT}/md-catalog.png`, fullPage: true });

// фильтр по категории
await page.getByRole("button", { name: "Десерты", exact: true }).click();
await page.waitForTimeout(250);
const desserts = await page.locator("ul > li").count();
console.log(`  блюд в категории «Десерты»: ${desserts}`);
if (desserts !== 3) errors.push(`в десертах ожидалось 3, получено ${desserts}`);

// пустое состояние истории
const ctx2 = await browser.newContext({ viewport: { width: 390, height: 844 } });
const fresh = await ctx2.newPage();
await fresh.goto(`${BASE}/orders`, { waitUntil: "networkidle" });
await fresh.waitForTimeout(300);
const emptyText = await fresh.locator("body").innerText();
if (!emptyText.includes("Заказов пока нет")) errors.push("нет пустого состояния истории");
await fresh.screenshot({ path: `${OUT}/md-orders-empty.png` });
await ctx2.close();

await ctx.close();
await browser.close();

if (errors.length) {
  console.log("\n--- ПРОБЛЕМЫ ---");
  for (const e of new Set(errors)) console.log(e);
  process.exit(1);
}
console.log("\nВсе сценарии проходят, ошибок нет.");
