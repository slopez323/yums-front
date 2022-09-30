import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StarRating = ({ rating, style, onStarClick }) => {
  return (
    <div
      style={{
        fontSize: "1.2rem",
        color: "#ececec",
        display: "flex",
        ...style,
      }}
    >
      <span style={{ display: "flex", color: "#c06c84" }}>
        {[...Array(rating)].map((x, i) => (
          <FontAwesomeIcon
            icon={faStar}
            key={`star-${i}`}
            onClick={() => (onStarClick ? onStarClick(i) : "")}
          />
        ))}
      </span>
      <span>
        {[...Array(5 - rating)].map((x, i) => (
          <FontAwesomeIcon
            icon={faStar}
            key={`emptystar-${i}`}
            onClick={() => (onStarClick ? onStarClick(rating + i) : "")}
          />
        ))}
      </span>
    </div>
  );
};

export default StarRating;
