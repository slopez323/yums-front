import { faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAlbum } from "../contexts/albumContext";
import AlbumInput from "./AlbumInput";
import DishImageUpload from "./DishImageUpload";

const AddDish = ({ dish, index, albumId }) => {
  const { updateDishes, removeDishes } = useAlbum();

  return (
    <div>
      <div className="dish-count">{`DISH ${index + 1}`}</div>
      <div className="dish-details">
        <FontAwesomeIcon
          icon={faSquareMinus}
          onClick={() => removeDishes(index)}
        />
        <AlbumInput
          label="Dish Name"
          value={dish.name}
          onChange={(e) => updateDishes(index, "name", e.target.value)}
        />
        <span className="dish-rating">
          <select
            value={dish.rating}
            onChange={(e) => updateDishes(index, "rating", e.target.value)}
          >
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
          /5
        </span>
        <DishImageUpload dish={dish} index={index} albumId={albumId} />
      </div>
    </div>
  );
};

export default AddDish;
