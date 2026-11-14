// export const API_BASE_URL = (
//   import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000"
// ).replace(/\/$/, "");

export const API_BASE_URL = (
  "http://127.0.0.1:8000"
).replace(/\/$/, "");
const TOKEN_KEY = "smarttable_access_token";

// async function getToken(webApp, force = false) {
//   if (!force) {
//     const saved = localStorage.getItem(TOKEN_KEY);
//     if (saved) return saved;
//   }
//
//   if (!webApp?.initData) throw new Error("Telegram initData недоступен");
//   const response = await fetch(`${API_BASE_URL}/auth/tma`, {
//     headers: { "X-Telegram-Init-Data": webApp.initData },
//   });
//   if (!response.ok) throw new Error(`Ошибка авторизации: ${response.status}`);
//   const data = await response.json();
//   localStorage.setItem(TOKEN_KEY, data.access_token);
//   return data.access_token;
// }
//
import vkBridge from '@vkontakte/vk-bridge';

// Вспомогательная функция для определения платформы
function detectPlatform() {
  if (window.Telegram?.WebApp?.initData) {
    return 'tg';
  }
  // В ВК в URL всегда передается параметр vk_app_id или vk_user_id
  if (window.location.search.includes('vk_app_id=')) {
    return 'vk';
  }
  return null;
}

async function getToken(force = false) {
  const platform = detectPlatform();
  if (!platform) {
    throw new Error("Не удалось определить платформу (ни Telegram, ни VK)");
  }

  // Разделяем ключи в localStorage, чтобы токены двух платформ не перезаписывали друг друга
  const storageKey = `${TOKEN_KEY}_${platform}`;

  if (!force) {
    const saved = localStorage.getItem(storageKey);
    if (saved) return saved;
  }

  let endpoint = '';
  let headers = {};

  if (platform === 'tg') {
    const initData = window.Telegram.WebApp.initData;
    endpoint = `${API_BASE_URL}/auth/tma`;
    headers = { "X-Telegram-Init-Data": initData };
  }
  else if (platform === 'vk') {
    // Запрашиваем параметры через Bridge (надежнее, чем window.location.search)
    const launchParamsObj = await vkBridge.send('VKWebAppGetLaunchParams');
    const searchParams = new URLSearchParams(launchParamsObj).toString();

    if (!searchParams || !launchParamsObj.sign) {
      throw new Error("VK launch params недоступны");
    }

    endpoint = `${API_BASE_URL}/auth/vk`;
    headers = { "X-VK-Launch-Params": searchParams };
  }

  const response = await fetch(endpoint, { headers });
  if (!response.ok) throw new Error(`Ошибка авторизации (${platform}): ${response.status}`);

  const data = await response.json();
  localStorage.setItem(storageKey, data.access_token);
  return data.access_token;
}


export async function apiFetch(path, options = {}, webApp) {
  // let token = await getToken(webApp);
  let token = "";

  let response;
  console.log(API_BASE_URL);

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const headers = new Headers(options.headers);
    headers.set("Authorization", `Bearer ${token}`);
    response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
    if (response.status !== 401 || attempt === 1) return response;

    localStorage.removeItem(TOKEN_KEY);
    token = await getToken(webApp, true);
  }

  return response;
}
