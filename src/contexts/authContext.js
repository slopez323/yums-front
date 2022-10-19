import { createContext, useContext, useState, useEffect } from "react";

const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
const authContext = createContext();

export const AuthProvider = ({ children, setIsLoading }) => {
  const [userId, setUserId] = useState();
  const [authResponse, setAuthResponse] = useState();

  const checkLogin = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
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
    setIsLoading(true);
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
      setIsLoading(false);
      return;
    } catch (e) {
      setIsLoading(false);
      return "Unable to create account.  Try again.";
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
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
      setIsLoading(false);
      return;
    } catch (e) {
      setIsLoading(false);
      return "Unable to log in.  Try again.";
    }
  };

  const logOut = async () => {
    setIsLoading(true);
    try {
      const url = `${urlEndpoint}/users/logout`;
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      setAuthResponse(response);
      setIsLoading(false);
      return;
    } catch (e) {
      setIsLoading(false);
      return "Unable to sign out.  Try again.";
    }
  };

  const deleteAccount = async () => {
    setIsLoading(true);
    try {
      const url = `${urlEndpoint}/users/delete-account`;
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      setAuthResponse(response);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
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
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);
