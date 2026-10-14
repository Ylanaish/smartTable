import { chromium } from "playwright-core";

const BASE = "http://localhost:5210/smartTable";
const OUT = "C:/Users/Ylanaish/AppData/Local/Temp/opencode/shots4";

const ROUTES = [
  "/", // должен редиректить на /intro
  "/intro",
  "/home",
  "/event",
  "/style",
  "/menu",
  "/format",
  "/payment",
  "/tracking",
  "/orders",
  "/orders/1234",
  "/catalog",
  "/done",
  "/no-such-page",
];

const VIEWPORTS = [
  ["sm", 360, 740],
  ["md", 390, 844],
  ["desktop", 1440, 900],
];

const errors = [];
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});

// ---- контрастная проверка: сервер действительно эмулирует Pages ----
{
  const res = await fetch(`${BASE}/event`); // путь БЕЗ хеша
  console.log(`контраст: GET ${BASE}/event -> ${res.status}`);
  if (res.status !== 404) {
    errors.push(`эмулятор отдал ${res.status} вместо 404 — проверка недействительна`);
  }
}

// ---- 1. каждый маршрут с жёсткой перезагрузкой, на всех ширинах ----
for (const [vp, width, height] of VIEWPORTS) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(`[${vp}] ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`[${vp}] ${m.text()}`);
  });

  const seen = [];
  for (const route of ROUTES) {
    const url = `${BASE}/#${route}`;
    const res = await page.goto(url, { waitUntil: "networkidle" });

    // жёсткая перезагрузка — именно этот сценарий ломался на BrowserRouter
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(250);

    // null бывает при переходе внутри одного документа (меняется только хеш) —
    // это нормальный случай, проверяем статус только когда ответ есть
    if (res && res.status() !== 200) errors.push(`[${vp}] ${route}: статус ${res.status()}`);

    const text = await page.locator("body").innerText();
    if (/Unexpected Application Error|Unexpected application error/i.test(text)) {
      errors.push(`[${vp}] ${route}: error boundary`);
    }
    if (text.trim().length < 40) errors.push(`[${vp}] ${route}: пустая страница`);

    const of = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (of > 1) errors.push(`[${vp}] ${route}: переполнение ${of}px`);

    const hash = await page.evaluate(() => window.location.hash);
    seen.push(`${route} -> ${hash || "(пусто)"}`);
  }

  if (vp === "md") {
    console.log("\nМаршруты после перезагрузки:");
    for (const s of seen) console.log(`  ${s}`);
  }

  await page.goto(`${BASE}/#/home`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${OUT}/${vp}-home.png` });
  await page.goto(`${BASE}/#/orders/1234`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${OUT}/${vp}-order-status.png` });
  await context.close();
}

// ---- 2. сквозной сценарий по кнопкам после перезагрузки ----
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();
page.on("pageerror", (e) => errors.push(`[flow] ${e.message}`));

await page.goto(`${BASE}/#/intro`, { waitUntil: "networkidle" });
const flow = [
  "Накрыть умный стол",
  "Далее: выбрать стиль стола",
  "Далее: меню",
  "Далее: формат сервиса",
  "Далее: оплата",
  "Оплатить",
  "Смотреть детали заказа",
  "На главную",
];
console.log("\nСценарий:");
for (const label of flow) {
  const btn = page.getByRole("button", { name: new RegExp(label) }).first();
  if ((await btn.count()) === 0) {
    errors.push(`[flow] «${label}» не найдена на ${page.url()}`);
    break;
  }
  await btn.click();
  await page.waitForTimeout(300);
  console.log(`  ${label.padEnd(28)} -> ${await page.evaluate(() => location.hash)}`);
}

// возврат на главную иконкой в шапке
await page.goto(`${BASE}/#/menu`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "На главную" }).first().click();
await page.waitForTimeout(300);
const homeHash = await page.evaluate(() => location.hash);
console.log(`  иконка дома из /menu      -> ${homeHash}`);
if (homeHash !== "#/home") errors.push(`иконка дома ведёт в ${homeHash}`);
await ctx.close();
await browser.close();

if (errors.length) {
  console.log("\n--- ПРОБЛЕМЫ ---");
  for (const e of new Set(errors)) console.log(e);
  process.exit(1);
}
console.log("\nВсе маршруты переживают жёсткую перезагрузку, ошибок нет.");