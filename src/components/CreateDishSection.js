import AddDish from "./AddDish";

const CreateDishSection = ({ dishes, setDishes, addMoreDishes }) => {
  return (
    <div className="create-dish-section">
      {dishes.map((dish) => {
        return (
          <AddDish
            dish={dish}
            dishes={dishes}
            setDishes={setDishes}
            key={dish.count}
          />
        );
      })}
      <button onClick={addMoreDishes}>Add Another Dish</button>
    </div>
  );
};

export default CreateDishSection;
