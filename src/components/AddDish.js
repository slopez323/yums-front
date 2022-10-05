import AlbumInput from "./AlbumInput";
import DishImageUpload from "./DishImageUpload";

const AddDish = ({ dish, count, dishes, setDishes }) => {
  const onNameChange = (name) => {
    const updatedList = dishes.map((item) => {
      if (item.count === dish.count) {
        return { ...item, name };
      }
      return { ...item };
    });
    setDishes(updatedList);
  };

  const onRatingChange = (rating) => {
    const updatedList = dishes.map((item) => {
      if (item.count === dish.count) {
        return { ...item, rating };
      }
      return { ...item };
    });
    setDishes(updatedList);
  };

  const onImageChange = (image) => {
    const updatedList = dishes.map((item) => {
      if (item.count === dish.count) {
        return { ...item, image };
      }
      return { ...item };
    });
    setDishes(updatedList);
  };

  return (
    <div>
      <div className="dish-count">{`DISH ${dish ? dish.count : count}`}</div>
      <div className="dish-details">
        <AlbumInput
          label="Dish Name"
          value={dish.name}
          onChange={(e) => onNameChange(e.target.value)}
        />
        <span className="dish-rating">
          <select
            value={dish.rating}
            onChange={(e) => onRatingChange(e.target.value)}
          >
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
          /5
        </span>
        <DishImageUpload
          image={dish.image}
          name={dish.name}
          onImageChange={onImageChange}
        />
      </div>
    </div>
  );
};

export default AddDish;
