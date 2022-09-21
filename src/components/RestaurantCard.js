import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RestaurantCard = ({ rest, setShowAlbum }) => {
  return (
    <div
      className="restaurant-card"
      onClick={() => setShowAlbum({ show: true, data: rest })}
    >
      <img src={rest.coverPhoto} alt={rest.name} />
      <p className="restaurant-name">{rest.name}</p>
      <div className="restaurant-rating">
        {[...Array(rest.rating)].map((x, i) => {
          return <FontAwesomeIcon icon={faStar} key={i} />;
        })}
      </div>
      <div className="restaurant-date">{rest.date}</div>
    </div>
  );
};

export default RestaurantCard;
