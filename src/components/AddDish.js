import { useAlbum } from "../contexts/albumContext";
import AlbumInput from "./AlbumInput";
import DishImageUpload from "./DishImageUpload";

const AddDish = ({ dish }) => {
  const { updateDishes } = useAlbum();

  return (
    <div>
      <div className="dish-count">{`DISH ${dish.count}`}</div>
      <div className="dish-details">
        <AlbumInput
          label="Dish Name"
          value={dish.name}
          onChange={(e) => updateDishes(dish.count, "name", e.target.value)}
        />
        <span className="dish-rating">
          <select
            value={dish.rating}
            onChange={(e) => updateDishes(dish.count, "rating", e.target.value)}
          >
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
          /5
        </span>
        <DishImageUpload dish={dish} />
      </div>
    </div>
  );
};

export default AddDish;
