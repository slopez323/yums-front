import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faLocationDot,
  faPenToSquare,
  faTrash,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import PopupContainer from "./PopupContainer";
import DishCard from "./DishCard";
import { usePopup } from "../contexts/popupContext";
import Popup from "./Popup";
import StarRating from "./StarRating";
import { useAlbum } from "../contexts/albumContext";
import OtherImageCarousel from "./OtherImageCarousel";
import { useEffect } from "react";

const Album = ({ data, setShowConfirm }) => {
  const { hidePopup, showEditAlbum } = usePopup();
  const { setEditData } = useAlbum();

  const url = data.location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        data.location.label
      )}&query_place_id=${data.location.value.place_id}`
    : "";

  const handleEdit = () => {
    showEditAlbum(data.albumId);
    setEditData(data);
  };

  const handleDelete = () => {
    setShowConfirm({ show: true, type: "delete-album", albumId: data.albumId });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PopupContainer>
      <Popup>
        <div className="album-actions">
          <div className="back-button" onClick={hidePopup}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div>
            <FontAwesomeIcon icon={faPenToSquare} onClick={handleEdit} />
            <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
          </div>
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
              <OtherImageCarousel images={data.otherImages} />
            )}
          </div>
        </div>
      </Popup>
    </PopupContainer>
  );
};

export default Album;
