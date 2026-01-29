import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await api.getCurrentUser();
          if (userData) setUser(userData);
        } catch (e) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      await api.login(username, password);
      const userData = await api.getCurrentUser();
      setUser(userData);
      setShowLoginModal(false);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  const signup = async (firstname, lastname, email, username, password, country) => {
    try {
      await api.register({
        firstname,
        lastname,
        email,
        username,
        password,
        country_of_origin: country || 'Unknown'
      });
      // Auto login after signup
      return await login(username, password);
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  const logout = () => {
    api.logout();
    setUser(null);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      loading,
      login,
      signup,
      logout,
      showLoginModal,
      openLoginModal,
      closeLoginModal
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
