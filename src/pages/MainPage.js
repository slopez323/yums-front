import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import "../styles/main.css";

const MainPage = ({ user }) => {
  return (
    <div id="main">
      <Header user={user} />
      <div id="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
