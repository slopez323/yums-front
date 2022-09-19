const LoginForm = () => {
  return (
    <>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Log In</button>
      <div>
        Don't have an account? <span>Sign up</span>
      </div>
    </>
  );
};

export default LoginForm;
