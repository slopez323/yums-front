import { useAlbum } from "../contexts/albumContext";
import AddDish from "./AddDish";

const CreateDishSection = ({ albumId }) => {
  const { dishes, addMoreDishes } = useAlbum();

  return (
    <div className="create-dish-section">
      {dishes.map((dish, index) => {
        return (
          <AddDish
            dish={dish}
            index={index}
            albumId={albumId}
            key={`dish-${index}`}
          />
        );
      })}
      <button onClick={addMoreDishes}>Add Another Dish</button>
    </div>
  );
};

export default CreateDishSection;
