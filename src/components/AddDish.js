import AlbumInput from "./AlbumInput";

const AddDish = ({ dish, count, dishes, setDishes }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <AlbumInput label={`Dish ${dish ? dish.count : count}`} />
      <span style={{ fontSize: "1.2rem" }}>
        <select style={{ fontSize: "1.2rem" }}>
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
        /5
      </span>
      <button>Upload Image</button>
    </div>
  );
};

export default AddDish;
