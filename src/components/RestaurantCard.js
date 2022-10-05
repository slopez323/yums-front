import { usePopup } from "../contexts/popupContext";
import StarRating from "./StarRating";

const RestaurantCard = ({ rest }) => {
  const { showAlbum } = usePopup();

  return (
    <div className="album-card" onClick={() => showAlbum(rest)}>
      <img src={rest.coverPhoto} alt={rest.name} />
      <p style={{ margin: 0 }}>{rest.name}</p>
      <StarRating rating={rest.rating} />
      <div className="album-card-date">{rest.date}</div>
    </div>
  );
};

export default RestaurantCard;
