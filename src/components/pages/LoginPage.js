import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const LoginPage = ({ username }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (username) navigate("/");
  }, [username]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <div className="logo" style={{ fontSize: "6rem" }}>
        Yums
      </div>
      <div
        style={{ height: "50vh", width: "2px", backgroundColor: "gray" }}
      ></div>
      <div
        style={{
          padding: "20px 30px",
          backgroundColor: "#c06c84",
          borderRadius: "20px",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default LoginPage;
