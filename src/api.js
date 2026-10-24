const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000"
).replace(/\/$/, "");
const TOKEN_KEY = "smarttable_access_token";

async function getToken(webApp, force = false) {
  if (!force) {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (saved) return saved;
  }

  if (!webApp?.initData) throw new Error("Telegram initData недоступен");
  const response = await fetch(`${API_BASE_URL}/auth/tma`, {
    headers: { "X-Telegram-Init-Data": webApp.initData },
  });
  if (!response.ok) throw new Error(`Ошибка авторизации: ${response.status}`);
  const data = await response.json();
  localStorage.setItem(TOKEN_KEY, data.access_token);
  return data.access_token;
}

export async function apiFetch(path, options = {}, webApp) {
  let token = await getToken(webApp);
  let response;

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
