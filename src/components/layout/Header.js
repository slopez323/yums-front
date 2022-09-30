import { useNavigate } from "react-router-dom";

const Header = ({ username }) => {
  const navigate = useNavigate();

  return (
    <header
      style={{
        padding: "10px 30px",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        zIndex: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="logo" style={{ fontSize: "4rem" }}>
        Yums
      </div>
      {username ? (
        <div id="header-user">{username}</div>
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
