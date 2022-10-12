import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AlbumProvider } from "../../contexts/albumContext";
import { useAuth } from "../../contexts/authContext";
import { PopupProvider } from "../../contexts/popupContext";
import Header from "../layout/Header";

const MainPage = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate("/dash");
    } else navigate("/");
  }, [userId]);

  return (
    <PopupProvider>
      <AlbumProvider>
        <div className="main-page">
          <Header />
          <Outlet />
        </div>
      </AlbumProvider>
    </PopupProvider>
  );
};

export default MainPage;
