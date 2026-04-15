const TOKEN_KEY = "token";

// 💾 сохранить токен
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// 📦 получить токен
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// ❌ удалить токен
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// 🔐 проверка авторизации
export const isAuth = () => {
  return !!getToken();
};