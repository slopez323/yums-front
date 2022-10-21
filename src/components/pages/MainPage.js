import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AlbumProvider } from "../../contexts/albumContext";
import { useAuth } from "../../contexts/authContext";
import { PopupProvider } from "../../contexts/popupContext";
import AccountMenu from "../AccountMenu";
import ConfirmPopup from "../ConfirmPopup";
import Error from "../Error";
import Header from "../Header";
import Loading from "../Loading";

const MainPage = ({ error, setError, isLoading, setIsLoading }) => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState({
    show: false,
    type: "",
    albumId: "",
  });

  useEffect(() => {
    if (userId) {
      navigate("/dash");
    } else navigate("/");
  }, [userId]);

  return (
    <PopupProvider setError={setError} setShowConfirm={setShowConfirm}>
      <AlbumProvider setIsLoading={setIsLoading}>
        <div className="main-page">
          {isLoading && <Loading />}
          {error.show && <Error>{error.message}</Error>}
          <Header setShowAccountMenu={setShowAccountMenu} />
          {showAccountMenu && (
            <AccountMenu
              setShowAccountMenu={setShowAccountMenu}
              setError={setError}
              setShowConfirm={setShowConfirm}
            />
          )}
          {showConfirm.show && (
            <ConfirmPopup
              showConfirm={showConfirm}
              setShowConfirm={setShowConfirm}
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
