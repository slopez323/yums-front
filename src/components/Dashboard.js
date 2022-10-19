import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { usePopup } from "../contexts/popupContext";
import { useAlbum } from "../contexts/albumContext";

const Dashboard = () => {
  const { userData } = useAlbum();
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date-desc");
  const [filteredList, setFilteredList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const { popup, showNewAlbum } = usePopup();

  useEffect(() => {
    if (userData) setRestaurants(userData.restaurantList);
  }, [userData]);

  useEffect(() => {
    if (search === "") {
      setFilteredList(restaurants);
    } else {
      const filtered = restaurants.filter((restaurant) => {
        return (
          restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
          (restaurant.location &&
            restaurant.location.label
              .toLowerCase()
              .includes(search.toLowerCase())) ||
          restaurant.date.includes(search.toLowerCase()) ||
          restaurant.notes.toLowerCase().includes(search.toLowerCase()) ||
          restaurant.dishList.some((dish) =>
            dish.name.toLowerCase().includes(search.toLowerCase())
          )
        );
      });
      setFilteredList(filtered);
    }
  }, [search, restaurants]);

  useEffect(() => {
    const sortCopy = JSON.parse(JSON.stringify(filteredList));
    if (sort === "date-asc") {
      sortCopy.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sort === "date-desc") {
      sortCopy.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === "name-asc") {
      sortCopy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name-desc") {
      sortCopy.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === "rate-asc") {
      sortCopy.sort((a, b) => a.rating - b.rating);
    } else if (sort === "rate-desc") {
      sortCopy.sort((a, b) => b.rating - a.rating);
    }
    setSortedList(sortCopy);
  }, [filteredList, sort]);

  return (
    <div className="dashboard">
      {popup}
      <div className="dashboard-options">
        <div className="add-button" title="new album" onClick={showNewAlbum}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <div className="search">
          <input
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="date-asc">Date ↑</option>
          <option value="date-desc">Date ↓</option>
          <option value="name-asc">Name ↑</option>
          <option value="name-desc">Name ↓</option>
          <option value="rate-asc">Rating ↑</option>
          <option value="rate-desc">Rating ↓</option>
        </select>
      </div>
      <div className="dashboard-main">
        {sortedList.map((rest) => {
          return <RestaurantCard rest={rest} key={rest.albumId} />;
        })}
        {sortedList.length === 0 && (
          <div className="empty-dashboard">No Albums.</div>
        )}
      </div>
      {/* <div className="add-button" title="new album" onClick={showNewAlbum}>
        <FontAwesomeIcon icon={faPlus} />
      </div> */}
    </div>
  );
};

export default Dashboard;
