import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1",
  headers: { Accept: "application/json" }
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("hsevents_access_token")
      ?? window.sessionStorage.getItem("hsevents_access_token");

    if (token) config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

export interface ApiProblem {
  title?: string;
  detail?: string;
  code?: string;
}

export interface AuthenticatedUser {
  user: { id: string; name: string; email: string };
  business: { id: string; name: string };
  role: string;
  permissions: string[];
}

export interface LoginResponse extends AuthenticatedUser {
  accessToken: string;
  tokenType: "Bearer";
  expiresAt: string;
}

export interface ApiEnvelope<T> {
  data: T;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError<ApiProblem>(error)) {
    return error.response?.data?.detail ?? fallback;
  }

  return fallback;
}
