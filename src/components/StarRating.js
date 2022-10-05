import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StarRating = ({ rating, style, onStarClick }) => {
  return (
    <div className="star-rating">
      <span className="filled-star">
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
