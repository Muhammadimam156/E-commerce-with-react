import api from "../lib/api";

export async function getMe() {
  const { data } = await api.get("/auth/me");
  return data;
}

export async function loginService(payload) {
  const { data } = await api.post("/auth/login", payload);
  return data;
}

export async function registerService(payload) {
  const { data } = await api.post("/auth/register", payload);
  return data;
}

export async function logoutService() {
  const { data } = await api.post("/auth/logout");
  return data;
}
