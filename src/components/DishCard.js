const DishCard = ({ dish }) => {
  const { dishName, dishImage, dishRating } = dish;

  return (
    <div>
      <div
        style={{
          fontFamily: "Caveat",
          textAlign: "end",
          fontSize: "1.3rem",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 5px",
        }}
      >
        <div>{dishName}</div>
        <div>{dishRating}/5</div>
      </div>
      <img
        src={dishImage}
        alt={dishName}
        style={{ width: "100%", maxHeight: "80%", objectFit: "cover" }}
      />
    </div>
  );
};

export default DishCard;
