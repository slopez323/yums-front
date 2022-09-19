import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../styles/login.css";

const LoginPage = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div id="login-page">
      <div className="logo">Yums</div>
      <div id="login-divider"></div>
      <div id="login-form">
        <Outlet />
      </div>
    </div>
  );
};

export default LoginPage;
