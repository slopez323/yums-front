import { Route, Routes } from "react-router-dom";
import Overview from "./components/Overview";
import LoginPage from "./components/pages/LoginPage";
import MainPage from "./components/pages/MainPage";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<Overview />} />
        <Route path="dash" element={<Dashboard />} />
      </Route>
      <Route path="/login" element={<LoginPage />}>
        <Route index element={<LoginForm />} />
        <Route path="register" element={<SignupForm />} />
      </Route>
    </Routes>
  );
};

export default App;
