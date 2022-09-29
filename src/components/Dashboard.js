import { useEffect, useState } from "react";
import users from "../mockData/sampleusers";
import RestaurantCard from "./RestaurantCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { usePopup } from "../contexts/popupContext";

const Dashboard = ({ username }) => {
  const [restaurants, setRestaurants] = useState([]);
  const { popup, showNewAlbum } = usePopup();

  useEffect(() => {
    // update to fetch from db later
    if (username) {
      const userData = users.find((user) => user.username === username);
      setRestaurants(userData.restaurantList);
    }
  }, [username]);

  return (
    <div
      className="main-content"
      style={{
        backgroundColor: "#dfd3c3",
        padding: "20px",
        position: "relative",
      }}
    >
      {popup}
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "15px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <input
            placeholder="Search"
            style={{ width: "250px", height: "30px" }}
          />
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "15px",
        }}
      >
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
