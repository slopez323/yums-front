import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import Error from "../Error";

const LoginPage = ({ error }) => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) navigate("/");
  }, [userId]);

  return (
    <div className="login-page">
      {error.show && <Error>{error.message}</Error>}
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
      </div>
    </div>
  );
};

export default LoginPage;
