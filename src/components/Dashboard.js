import { useEffect, useState } from "react";
import users from "../sampleusers";
import RestaurantCard from "./RestaurantCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import Album from "./Album";

const Dashboard = ({ username }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [showAlbum, setShowAlbum] = useState({ show: false, data: {} });

  useEffect(() => {
    // update to fetch from db later
    if (username) {
      const userData = users.find((user) => user.username === username);
      setRestaurants(userData.restaurantList);
    }
  }, [username]);

  return (
    <div id="dashboard" className="main-content">
      {showAlbum.show && (
        <Album data={showAlbum.data} setShowAlbum={setShowAlbum} />
      )}
      <div className="options-bar">
        <div className="search-bar">
          <input placeholder="Search" />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <select>
          <option>Oldest First</option>
          <option>Newest First</option>
        </select>
      </div>
      <div className="card-container">
        {restaurants.map((rest) => {
          return (
            <RestaurantCard
              rest={rest}
              setShowAlbum={setShowAlbum}
              key={`${rest.name}-${rest.date}`}
            />
          );
        })}
      </div>
      <div className="add-button" title="new album">
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  );
};

export default Dashboard;
