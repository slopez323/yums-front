import { HashRouter, Route, Routes } from "react-router-dom";
import Overview from "./components/Overview";
import LoginPage from "./components/pages/LoginPage";
import MainPage from "./components/pages/MainPage";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { AuthProvider } from "./contexts/authContext";
import { useEffect, useState } from "react";

const App = () => {
  const noError = { show: false, message: "" };
  const [error, setError] = useState(noError);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hideError = setTimeout(() => {
      setError(noError);
    }, 3000);
    return () => clearTimeout(hideError);
  }, [error.show]);

  return (
    <HashRouter>
      <AuthProvider setIsLoading={setIsLoading}>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                error={error}
                setError={setError}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          >
            <Route index element={<Overview />} />
            <Route path="dash" element={<Dashboard />} />
          </Route>
          <Route
            path="/login"
            element={<LoginPage error={error} isLoading={isLoading} />}
          >
            <Route index element={<LoginForm setError={setError} />} />
            <Route
              path="register"
              element={<SignupForm setError={setError} />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
