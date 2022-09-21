import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import "../styles/main.css";

const MainPage = ({ username }) => {
  return (
    <div id="main">
      <Header username={username} />
      <Outlet />
    </div>
  );
};

export default MainPage;
