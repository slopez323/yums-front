import { useNavigate } from "react-router-dom";
import "../styles/header.css";

const Header = ({ username }) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="logo">Yums</div>
      {username ? (
        <div id="header-user">{username}</div>
      ) : (
        <button id="login-btn" onClick={() => navigate("/login")}>
          Log In
        </button>
      )}
    </header>
  );
};

export default Header;
