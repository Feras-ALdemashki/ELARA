import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { AUTH } from "../utils/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(user);
  const loadUser = async () => {
    try {
      const { data } = await axios.get(AUTH.GET_USER, {
        withCredentials: true,
      });
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email, password) => {
    await axios.post(
      AUTH.LOGIN,
      { email, password },
      { withCredentials: true }
    );
    await loadUser();
  };

  const logout = async () => {
    await axios.post(AUTH.LOGOUT, {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
