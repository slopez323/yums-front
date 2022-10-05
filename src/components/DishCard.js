const DishCard = ({ dish }) => {
  const { name, image, rating } = dish;

  return (
    <div>
      <div className="dishlist-title">
        <div>{name}</div>
        <div>{rating}/5</div>
      </div>
      <img src={image.url} alt={name} className="dishlist-image" />
    </div>
  );
};

export default DishCard;
