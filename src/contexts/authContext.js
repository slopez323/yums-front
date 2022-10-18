import { createContext, useContext, useState, useEffect } from "react";

const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState();
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authResponse, setAuthResponse] = useState();

  const checkLogin = async () => {
    setIsAuthLoading(true);
    try {
      const url = `${urlEndpoint}/users/check-login`;
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const responseJSON = await response.json();
      if (responseJSON.success) {
        setUserId(responseJSON.user);
      } else setUserId();
    } catch (e) {
      setUserId();
    }
    setIsAuthLoading(false);
  };

  const checkDetails = async (username, email, password) => {
    if (username.length < 5) {
      return "Username must be at least 5 characters long.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !email) {
      return "Enter a valid email.";
    }
    if (
      !/\d/.test(password) ||
      !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password) ||
      !/[a-zA-Z]/.test(password) ||
      password.length < 8 ||
      password.includes(" ")
    ) {
      return "Password must be at least 8 characters long, must not include spaces and must include at least 1 letter, number and special character.";
    }
    return await register(username, email, password);
  };

  const register = async (username, email, password) => {
    setIsAuthLoading(true);
    try {
      const userDetails = { username, email, password };
      const url = `${urlEndpoint}/users/register`;
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      setAuthResponse(response);
      const responseJSON = await response.json();
      if (!responseJSON.success) {
        return responseJSON.message;
      }
      setIsAuthLoading(false);
      return;
    } catch (e) {
      setIsAuthLoading(false);
      return "Unable to create account.  Try again.";
    }
  };

  const login = async (email, password) => {
    setIsAuthLoading(true);
    try {
      const userDetails = { email, password };
      const url = `${urlEndpoint}/users/login`;
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      setAuthResponse(response);
      const responseJSON = await response.json();
      if (!responseJSON.success) {
        return responseJSON.message;
      }
      setIsAuthLoading(false);
      return;
    } catch (e) {
      setIsAuthLoading(false);
      return "Unable to log in.  Try again.";
    }
  };

  const logOut = async () => {
    setIsAuthLoading(true);
    try {
      const url = `${urlEndpoint}/users/logout`;
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      setAuthResponse(response);
      setIsAuthLoading(false);
      return;
    } catch (e) {
      setIsAuthLoading(false);
      return "Unable to sign out.  Try again.";
    }
  };

  const deleteAccount = async () => {
    setIsAuthLoading(true);
    try {
      const url = `${urlEndpoint}/users/delete-account`;
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      setAuthResponse(response);
      setIsAuthLoading(false);
    } catch (e) {
      setIsAuthLoading(false);
      return "Unable to delete account.  Try again.";
    }
  };

  useEffect(() => {
    checkLogin();
  }, [authResponse]);

  const value = {
    userId,
    checkDetails,
    login,
    logOut,
    deleteAccount,
    isAuthLoading,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);
