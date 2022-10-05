import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { usePopup } from "../contexts/popupContext";
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const { user } = useOutletContext();
  const [restaurants, setRestaurants] = useState([]);
  const { popup, showNewAlbum } = usePopup();

  useEffect(() => {
    if (user) setRestaurants(user.restaurantList);
  }, [user]);

  return (
    <div className="dashboard">
      {popup}
      <div className="dashboard-options">
        <div className="search">
          <input placeholder="Search" />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#575555", cursor: "pointer" }}
          />
        </div>
        <select>
          <option>Oldest First</option>
          <option>Newest First</option>
        </select>
      </div>
      <div className="dashboard-main">
        {restaurants.map((rest) => {
          return (
            <RestaurantCard rest={rest} key={`${rest.name}-${rest.date}`} />
          );
        })}
      </div>
      <div className="add-button" title="new album" onClick={showNewAlbum}>
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  );
};

export default Dashboard;
