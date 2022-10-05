import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const noError = { show: false, message: "" };
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState();
  //   const [isAdmin, setIsAdmin] = useState(false);
  const [authUpdate, setAuthUpdate] = useState();
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [error, setError] = useState({ ...noError });

  const navigate = useNavigate();

  const verify = async () => {
    setIsAuthLoading(true);
    const url = `${urlEndpoint}/users/validate-token`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        [process.env.REACT_APP_TOKEN_HEADER_KEY]: token,
      },
    });
    const responseJSON = await response.json();
    if (responseJSON.success) {
      setUserId(responseJSON.message);
      //   setIsAdmin(responseJSON.isAdmin);
    } else removeUserToken();
    setAuthUpdate(response);
    setIsAuthLoading(false);
    return responseJSON;
  };

  useEffect(() => {
    const loggedUser = getUserToken();
    setToken(loggedUser);
  }, [authUpdate]);

  useEffect(() => {
    if (token) {
      verify();
    } else {
      setUserId();
      //   setIsAdmin(false);
    }
  }, [token]);

  const checkDetails = (username, email, password) => {
    if (username.length < 5) {
      setError({
        show: true,
        message: "Username must be at least 5 characters long.",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !email) {
      setError({ show: true, message: "Enter a valid email." });
      return;
    }
    if (
      !/\d/.test(password) ||
      !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password) ||
      !/[a-zA-Z]/.test(password) ||
      password.length < 8 ||
      password.includes(" ")
    ) {
      setError({
        show: true,
        message:
          "Password must be at least 8 characters long, must not include spaces and must include at least 1 letter, number and special character.",
      });
      return;
    }
    setError({ ...noError });
    register(username, email, password);
  };

  const register = async (username, email, password) => {
    setIsAuthLoading(true);
    const userDetails = { username, email, password };
    const url = `${urlEndpoint}/users/register`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    const responseJSON = await response.json();
    if (responseJSON.success) {
      setUserToken(responseJSON.token);
      //   navigate("/dash");
    }
    setAuthUpdate(response);
    setIsAuthLoading(false);
    return;
  };

  const login = async (email, password) => {
    setIsAuthLoading(true);
    setError({ ...noError });
    const userDetails = { email, password };
    const url = `${urlEndpoint}/users/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    const responseJSON = await response.json();
    if (responseJSON.success) {
      setUserToken(responseJSON.token);
      //   navigate("/dash");
    } else {
      setError({ show: true, message: responseJSON.message });
    }
    setAuthUpdate(response);
    setIsAuthLoading(false);
    return;
  };

  //   const changePassword = async (password) => {
  //     setIsAuthLoading(true);
  //     const userDetails = { userId, password };
  //     const url = `${urlEndpoint}/users/change-password`;
  //     const response = await fetch(url, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userDetails),
  //     });
  //     const responseJSON = await response.json();
  //     setAuthUpdate(response);
  //     setIsAuthLoading(false);
  //     return responseJSON;
  //   };

  //   const forgetPassword = async (email) => {
  //     setIsAuthLoading(true);
  //     const url = `${urlEndpoint}/users/forget-password`;
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email }),
  //     });
  //     const responseJSON = await response.json();
  //     setAuthUpdate(response);
  //     setIsAuthLoading(false);
  //     return responseJSON;
  //   };

  const logout = () => {
    removeUserToken();
    setAuthUpdate("token removed");
    return true;
  };

  //   const deleteAccount = async () => {
  //     setIsAuthLoading(true);
  //     const url = `${urlEndpoint}/users/delete-user/${userId}`;
  //     const response = await fetch(url, {
  //       method: "DELETE",
  //     });
  //     const responseJSON = await response.json();
  //     if (responseJSON.success) removeUserToken();
  //     setAuthUpdate(response);
  //     setIsAuthLoading(false);
  //     return responseJSON;
  //   };

  const hideError = () => setError({ ...noError });

  const value = {
    userId,
    // isAdmin,
    checkDetails,
    login,
    logout,
    // changePassword,
    // forgetPassword,
    // deleteAccount,
    isAuthLoading,
    error,
    hideError,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);

const setUserToken = (token) => {
  localStorage.setItem(
    process.env.REACT_APP_TOKEN_HEADER_KEY,
    JSON.stringify(token)
  );
};

const removeUserToken = () => {
  localStorage.removeItem(process.env.REACT_APP_TOKEN_HEADER_KEY);
  return true;
};

const getUserToken = () => {
  return JSON.parse(
    localStorage.getItem(process.env.REACT_APP_TOKEN_HEADER_KEY)
  );
};
