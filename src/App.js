import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Overview from "./components/Overview";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

const App = () => {
  const [user, setUser] = useState();

  return (
    <Routes>
      <Route path="/" element={<MainPage user={user} />}>
        <Route index element={<Overview />} />
        <Route path="dash" element={<Dashboard />} />
      </Route>
      <Route path="/login" element={<LoginPage user={user} />}>
        <Route index element={<LoginForm />} />
        <Route path="register" element={<SignupForm />} />
      </Route>
    </Routes>
  );
};

export default App;
