import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faLocationDot,
  faPenToSquare,
  faTrash,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import PopupContainer from "./layout/PopupContainer";
import DishCard from "./DishCard";
import { usePopup } from "../contexts/popupContext";
import Popup from "./layout/Popup";
import StarRating from "./StarRating";
import { useAlbum } from "../contexts/albumContext";
import OtherImageCarousel from "./OtherImageCarousel";

const Album = ({ data, setError }) => {
  const { hidePopup, showEditAlbum } = usePopup();
  const { deleteAlbum, setEditData } = useAlbum();

  const url = data.location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        data.location.label
      )}&query_place_id=${data.location.value.place_id}`
    : "";

  const handleEdit = () => {
    showEditAlbum(data.albumId);
    setEditData(data);
  };

  const handleDelete = async () => {
    const response = await deleteAlbum(data.albumId);
    if (response) {
      setError({ show: true, message: response });
    } else hidePopup();
  };

  return (
    <PopupContainer>
      <Popup>
        <div className="album-actions">
          <FontAwesomeIcon icon={faPenToSquare} onClick={handleEdit} />
          <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
        </div>
        <div className="back-button" onClick={hidePopup}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div className="album-view">
          <div className="album-title">
            {data.name} <StarRating rating={data.rating} />
          </div>
          <div className="album-location" onClick={() => window.open(url)}>
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ fontSize: ".8rem" }}
            />{" "}
            <span>{data.location ? data.location.label : ""}</span>
          </div>
          <div className="album-date">
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{ fontSize: ".8rem" }}
            />
            <span>{data.date}</span>
          </div>
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
            {data.otherImages.length > 0 && (
              <div>
                <OtherImageCarousel images={data.otherImages} />
              </div>
            )}
          </div>
        </div>
      </Popup>
    </PopupContainer>
  );
};

export default Album;
