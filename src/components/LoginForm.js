import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Log In</button>
      <div className="auth-switch">
        Don't have an account?{" "}
        <span onClick={() => navigate("/login/register")}>Sign up</span>
      </div>
    </>
  );
};

export default LoginForm;
