import { useNavigate } from "react-router-dom";

const Header = ({ user }) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="logo" style={{ fontSize: "4rem" }}>
        Yums
      </div>
      {user ? (
        <div>{user.username}</div>
      ) : (
        <button
          style={{ alignSelf: "center" }}
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
      )}
    </header>
  );
};

export default Header;
