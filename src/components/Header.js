import { useNavigate } from "react-router-dom";
import "../styles/header.css";

const Header = ({ user }) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="logo">Yums</div>
      {user ? (
        <div id="header-user">{user}</div>
      ) : (
        <button id="login-btn" onClick={() => navigate("/login")}>
          Log In
        </button>
      )}
    </header>
  );
};

export default Header;
