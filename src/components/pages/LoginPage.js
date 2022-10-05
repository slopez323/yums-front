import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import Error from "../Error";

const LoginPage = () => {
  const { userId, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) navigate("/");
  }, [userId]);

  return (
    <div className="login-page">
      <div className="logo" style={{ fontSize: "6rem" }}>
        Yums
      </div>
      <div
        style={{ height: "50vh", width: "2px", backgroundColor: "gray" }}
      ></div>
      <div className="login-right">
        <div className="login-form">
          <Outlet />
        </div>
        {error.show && <Error message={error.message} />}
      </div>
    </div>
  );
};

export default LoginPage;
