import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AlbumProvider } from "../../contexts/albumContext";
import { useAuth } from "../../contexts/authContext";
import { PopupProvider } from "../../contexts/popupContext";
import Header from "../layout/Header";

const MainPage = () => {
  const { userId } = useAuth();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const getUserData = async () => {
    const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
    const url = `${urlEndpoint}/users/user?id=${userId}`;
    const response = await fetch(url);
    const responseJSON = await response.json();
    if (responseJSON.success) setUser(responseJSON.message);
  };

  useEffect(() => {
    if (userId) {
      getUserData();
      navigate("/dash");
    } else navigate("/");
  }, [userId]);

  return (
    <PopupProvider>
      <AlbumProvider>
        <div className="main-page">
          <Header user={user} />
          <Outlet context={{ user }} />
        </div>
      </AlbumProvider>
    </PopupProvider>
  );
};

export default MainPage;
