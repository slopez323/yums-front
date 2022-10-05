import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const SignupForm = () => {
  const { checkDetails, hideError } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    hideError();
  }, []);

  return (
    <>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <button onClick={() => checkDetails(username, email, password)}>
        Sign Up
      </button>
      <div className="auth-switch">
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Log in</span>
      </div>
    </>
  );
};

export default SignupForm;
