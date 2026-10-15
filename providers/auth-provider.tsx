"use client";

import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { api, type ApiEnvelope, type AuthenticatedUser, type LoginResponse } from "@/lib/api";

const ACCESS_TOKEN_KEY = "hsevents_access_token";
const ACCESS_TOKEN_EXPIRY_KEY = "hsevents_access_token_expires_at";

type AuthStatus = "loading" | "authenticated" | "anonymous" | "error";

interface AuthContextValue {
  status: AuthStatus;
  user: AuthenticatedUser | null;
  error: string;
  signIn: (email: string, password: string, remember: boolean) => Promise<void>;
  signOut: () => void;
  retrySession: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function clearStoredToken() {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(ACCESS_TOKEN_EXPIRY_KEY);
  window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  window.sessionStorage.removeItem(ACCESS_TOKEN_EXPIRY_KEY);
}

function readStoredSession() {
  const localToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  if (localToken) {
    return {
      token: localToken,
      expiresAt: window.localStorage.getItem(ACCESS_TOKEN_EXPIRY_KEY)
    };
  }

  const sessionToken = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
  return {
    token: sessionToken,
    expiresAt: window.sessionStorage.getItem(ACCESS_TOKEN_EXPIRY_KEY)
  };
}

function saveToken(token: string, expiresAt: string, remember: boolean) {
  clearStoredToken();
  const storage = remember ? window.localStorage : window.sessionStorage;
  storage.setItem(ACCESS_TOKEN_KEY, token);
  storage.setItem(ACCESS_TOKEN_EXPIRY_KEY, expiresAt);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [sessionAttempt, setSessionAttempt] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      try {
        const { token, expiresAt: storedExpiry } = readStoredSession();
        if (!token) {
          if (!cancelled) {
            setUser(null);
            setExpiresAt(null);
            setStatus("anonymous");
          }
          return;
        }

        const expiryTime = storedExpiry ? Date.parse(storedExpiry) : Number.NaN;
        if (Number.isFinite(expiryTime) && expiryTime <= Date.now()) {
          clearStoredToken();
          if (!cancelled) {
            setUser(null);
            setExpiresAt(null);
            setStatus("anonymous");
          }
          return;
        }

        const response = await api.get<ApiEnvelope<AuthenticatedUser>>("/auth/me");
        if (!cancelled) {
          setUser(response.data.data);
          setExpiresAt(storedExpiry);
          setError("");
          setStatus("authenticated");
        }
      } catch (sessionError) {
        if (!cancelled) {
          if (axios.isAxiosError(sessionError) && sessionError.response?.status === 401) {
            clearStoredToken();
            setUser(null);
            setExpiresAt(null);
            setStatus("anonymous");
          } else {
            setError("Unable to verify your session. Check your connection to the API and try again.");
            setStatus("error");
          }
        }
      }
    }

    restoreSession();
    return () => {
      cancelled = true;
    };
  }, [sessionAttempt]);

  const signOut = useCallback(() => {
    clearStoredToken();
    setUser(null);
    setExpiresAt(null);
    setError("");
    setStatus("anonymous");
  }, []);

  useEffect(() => {
    if (status !== "authenticated" || !expiresAt) return;

    const expiryTime = Date.parse(expiresAt);
    if (!Number.isFinite(expiryTime)) return;

    const timeout = window.setTimeout(signOut, Math.max(0, expiryTime - Date.now()));
    return () => window.clearTimeout(timeout);
  }, [expiresAt, signOut, status]);

  useEffect(() => {
    if (status === "authenticated" && pathname === "/login") {
      router.replace("/overview");
    } else if (status === "anonymous" && pathname !== "/login") {
      router.replace("/login");
    }
  }, [pathname, router, status]);

  const signIn = useCallback(async (email: string, password: string, remember: boolean) => {
    const response = await api.post<ApiEnvelope<LoginResponse>>("/auth/login", {
      email,
      password
    });
    const { accessToken, expiresAt: tokenExpiry, user: authenticatedUser, business, role, permissions } = response.data.data;
    saveToken(accessToken, tokenExpiry, remember);
    setUser({ user: authenticatedUser, business, role, permissions });
    setExpiresAt(tokenExpiry);
    setError("");
    setStatus("authenticated");
  }, []);

  const retrySession = useCallback(() => {
    setError("");
    setStatus("loading");
    setSessionAttempt((attempt) => attempt + 1);
  }, []);

  const value = useMemo(
    () => ({ status, user, error, signIn, signOut, retrySession }),
    [error, retrySession, signIn, signOut, status, user]
  );

  if (pathname !== "/login" && status !== "authenticated") {
    if (status === "error") {
      return <main className="auth-status">
        <p role="alert">{error}</p>
        <button type="button" onClick={retrySession}>Try again</button>
        <button type="button" onClick={signOut}>Sign in</button>
      </main>;
    }
    return <main className="auth-status" aria-label="Checking your session">Checking your session…</main>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
