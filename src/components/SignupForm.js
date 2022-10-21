import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const SignupForm = ({ setError }) => {
  const { checkDetails } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async () => {
    const response = await checkDetails(username, email, password);
    if (response) {
      setError({ show: true, message: response });
    } else {
      navigate("/dash");
    }
  };

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
        onKeyPress={(e) => e.key === "Enter" && handleRegistration()}
      />
      <button onClick={handleRegistration}>Sign Up</button>
      <div className="auth-switch">
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Log in</span>
      </div>
    </>
  );
};

export default SignupForm;
