import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import PopupContainer from "./layout/PopupContainer";
import DishCard from "./DishCard";
import { usePopup } from "../contexts/popupContext";
import Popup from "./layout/Popup";
import StarRating from "./StarRating";

const Album = ({ data }) => {
  const { hidePopup } = usePopup();

  return (
    <PopupContainer>
      <Popup>
        <div className="back-button" onClick={hidePopup}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div className="album-view">
          <div className="album-title">
            {data.name} <StarRating rating={data.rating} />
          </div>
          <div className="album-location">
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ fontSize: ".8rem" }}
            />{" "}
            <span>{data.location}</span>
          </div>
          <div>{data.date}</div>
          <div className="album-body">
            <div className="dishlist-container">
              {data.dishList.map((dish) => {
                return <DishCard dish={dish} key={dish.dishId} />;
              })}
            </div>
            <div className="notes">
              <p>Notes:</p>
              <div>{data.notes}</div>
            </div>
          </div>
        </div>
      </Popup>
    </PopupContainer>
  );
};

export default Album;
