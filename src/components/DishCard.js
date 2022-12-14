import noimage from "../assets/noimage.jpeg";

const DishCard = ({ dish }) => {
  const { name, image, rating } = dish;

  return (
    <div className="dishlist-item">
      <div className="dishlist-title">
        <div>{name}</div>
        <div>{rating}/5</div>
      </div>
      <img
        src={image ? image.url : noimage}
        alt={name}
        className="dishlist-image"
      />
    </div>
  );
};

export default DishCard;
