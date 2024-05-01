export const saveKey = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getKey = (key: string) => {
  return localStorage.getItem(key);
};

const AUTH_TOKEN_KEY = "token";

export const getAuthToken = () => {
  return "Bearer " + getKey(AUTH_TOKEN_KEY) ?? "";
};

export const saveAuthToken = (token: string) => {
  saveKey(AUTH_TOKEN_KEY, token);
};

export const removeAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
