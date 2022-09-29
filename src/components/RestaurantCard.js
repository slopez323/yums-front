import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { usePopup } from "../contexts/popupContext";

const RestaurantCard = ({ rest }) => {
  const { showAlbum } = usePopup();

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "300px",
        padding: "10px",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        cursor: "pointer",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
      onClick={() => showAlbum(rest)}
    >
      <img
        src={rest.coverPhoto}
        alt={rest.name}
        style={{ width: "100%", height: "80%", objectFit: "cover" }}
      />
      <p style={{ margin: 0 }}>{rest.name}</p>
      <div className="restaurant-rating">
        {[...Array(rest.rating)].map((x, i) => {
          return <FontAwesomeIcon icon={faStar} key={i} />;
        })}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          fontFamily: "'Caveat', cursive",
          fontSize: "1.2rem",
          color: "#596e79",
        }}
      >
        {rest.date}
      </div>
    </div>
  );
};

export default RestaurantCard;
