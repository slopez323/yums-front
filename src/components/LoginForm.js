import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const LoginForm = ({ setError }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await login(email, password);
    if (response) {
      setError({ show: true, message: response });
    } else {
      navigate("/dash");
    }
  };

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
        onKeyPress={(e) => e.key === "Enter" && handleLogin()}
      />
      <button onClick={handleLogin}>Log In</button>
      <div className="auth-switch">
        Don't have an account?{" "}
        <span onClick={() => navigate("/login/register")}>Sign up</span>
      </div>
    </>
  );
};

export default LoginForm;
