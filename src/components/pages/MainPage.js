import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AlbumProvider } from "../../contexts/albumContext";
import { useAuth } from "../../contexts/authContext";
import { PopupProvider } from "../../contexts/popupContext";
import AccountMenu from "../AccountMenu";
import Error from "../Error";
import Header from "../layout/Header";

const MainPage = ({ error, setError }) => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  useEffect(() => {
    if (userId) {
      navigate("/dash");
    } else navigate("/");
  }, [userId]);

  return (
    <PopupProvider setError={setError}>
      <AlbumProvider>
        <div className="main-page">
          {error.show && <Error>{error.message}</Error>}
          <Header setShowAccountMenu={setShowAccountMenu} />
          {showAccountMenu && (
            <AccountMenu
              setShowAccountMenu={setShowAccountMenu}
              setError={setError}
            />
          )}
          <Outlet />
        </div>
      </AlbumProvider>
    </PopupProvider>
  );
};

export default MainPage;
