import { useNavigate } from "react-router-dom";
import { useAlbum } from "../../contexts/albumContext";

const Header = () => {
  const { userData } = useAlbum();
  const navigate = useNavigate();

  return (
    <header>
      <div className="logo" style={{ fontSize: "4rem" }}>
        Yums
      </div>
      {userData ? (
        <div>{userData.username}</div>
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
