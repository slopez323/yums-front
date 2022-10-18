import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAlbum } from "../../contexts/albumContext";

const Header = ({ setShowAccountMenu }) => {
  const { userData } = useAlbum();
  const navigate = useNavigate();

  return (
    <header>
      <div className="logo" style={{ fontSize: "4rem" }}>
        Yums
      </div>
      {userData ? (
        <div className="username" onClick={() => setShowAccountMenu(true)}>
          <span>{userData.username}</span>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
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
