import { useAlbum } from "../contexts/albumContext";
import AddDish from "./AddDish";

const CreateDishSection = () => {
  const { dishes, addMoreDishes } = useAlbum();

  return (
    <div className="create-dish-section">
      {dishes.map((dish) => {
        return <AddDish dish={dish} key={dish.count} />;
      })}
      <button onClick={addMoreDishes}>Add Another Dish</button>
    </div>
  );
};

export default CreateDishSection;
