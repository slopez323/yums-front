import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faStar,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/album.css";
import Popup from "./Popup";

const Album = ({ data, setShowAlbum }) => {
  return (
    <Popup>
      <div className="album">
        <div
          className="back-button"
          onClick={() => setShowAlbum({ show: false, data: {} })}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div className="album-main">
          <div className="album-title">
            {data.name}{" "}
            <div className="album-rating">
              <span className="restaurant-rating">
                {[...Array(data.rating)].map((x, i) => (
                  <FontAwesomeIcon icon={faStar} />
                ))}
              </span>
              <span>
                {[...Array(5 - data.rating)].map((x, i) => (
                  <FontAwesomeIcon icon={faStar} />
                ))}
              </span>
            </div>
          </div>
          <div className="album-location">
            <FontAwesomeIcon icon={faLocationDot} />{" "}
            <span>{data.location}</span>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default Album;
