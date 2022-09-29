import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faStar,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import PopupContainer from "./PopupContainer";
import DishCard from "./DishCard";
import { usePopup } from "../contexts/popupContext";

const Album = ({ data }) => {
  const { hidePopup } = usePopup();

  return (
    <PopupContainer>
      <div className="album">
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
            {data.name}{" "}
            <div
              style={{
                fontSize: "1.2rem",
                color: "#ececec",
                display: "flex",
              }}
            >
              <span className="restaurant-rating">
                {[...Array(data.rating)].map((x, i) => (
                  <FontAwesomeIcon icon={faStar} key={`star-${i}`} />
                ))}
              </span>
              <span>
                {[...Array(5 - data.rating)].map((x, i) => (
                  <FontAwesomeIcon icon={faStar} key={`emptystar-${i}`} />
                ))}
              </span>
            </div>
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
      </div>
    </PopupContainer>
  );
};

export default Album;
