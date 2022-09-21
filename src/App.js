import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Overview from "./components/Overview";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

const App = () => {
  const [username, setUsername] = useState("user1");

  return (
    <Routes>
      <Route path="/" element={<MainPage username={username} />}>
        <Route index element={<Overview username={username} />} />
        <Route path="dash" element={<Dashboard username={username} />} />
      </Route>
      <Route path="/login" element={<LoginPage username={username} />}>
        <Route index element={<LoginForm />} />
        <Route path="register" element={<SignupForm />} />
      </Route>
    </Routes>
  );
};

export default App;
