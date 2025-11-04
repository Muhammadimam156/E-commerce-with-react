import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getMe, loginService, registerService, logoutService } from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // On mount, ask backend who is logged in (cookie/session based)
  useEffect(() => {
    let mounted = true;
    (async () => {
      setAuthLoading(true);
      try {
        const me = await getMe();
        if (mounted) setUser(me?.user || null);
      } catch (err) {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setAuthLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const login = async ({ email, password }) => {
    setAuthError(null);
    const res = await loginService({ email, password });
    setUser(res?.user || null);
    return true;
  };

  const register = async ({ name, email, password }) => {
    setAuthError(null);
    const res = await registerService({ name, email, password });
    setUser(res?.user || null);
    return true;
  };

  const logout = async () => {
    try { await logoutService(); } catch {}
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, authLoading, authError, login, register, logout }),
    [user, authLoading, authError]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
