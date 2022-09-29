import { Outlet } from "react-router-dom";
import { PopupProvider } from "../../contexts/popupContext";
import Header from "../Header";

const MainPage = ({ username }) => {
  return (
    <PopupProvider>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <Header username={username} />
        <Outlet />
      </div>
    </PopupProvider>
  );
};

export default MainPage;
