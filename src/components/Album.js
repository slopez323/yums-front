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
        <div style={{ padding: "0 20px" }}>
          <div
            style={{
              fontSize: "1.4rem",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 1fr",
              gap: "20px",
            }}
          >
            <div
              style={{
                padding: "10px 0",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "10px",
              }}
            >
              {data.dishList.map((dish) => {
                return <DishCard dish={dish} key={dish.dishId} />;
              })}
            </div>
            <div
              style={{
                backgroundColor: "#f8da5b",
                padding: "10px",
                overflow: "auto",
              }}
            >
              <p style={{ fontSize: "1.1rem", fontWeight: "bold", margin: 0 }}>
                Notes:
              </p>
              <div
                style={{
                  padding: "10px",
                  fontFamily: "Caveat",
                  fontSize: "1.2rem",
                }}
              >
                {data.notes}
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </PopupContainer>
  );
};

export default Album;
