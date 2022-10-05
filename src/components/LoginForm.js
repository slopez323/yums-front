import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const LoginForm = () => {
  const { login, hideError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    hideError();
  }, []);

  return (
    <>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() => {
          login(email, password);
          navigate("/dash");
        }}
      >
        Log In
      </button>
      <div className="auth-switch">
        Don't have an account?{" "}
        <span onClick={() => navigate("/login/register")}>Sign up</span>
      </div>
    </>
  );
};

export default LoginForm;
