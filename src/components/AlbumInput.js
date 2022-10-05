import StarRating from "./StarRating";

const AlbumInput = ({ label, type, value, onChange }) => {
  return (
    <div className="album-input">
      <label>{label}</label>
      {type === "rating" ? (
        <StarRating
          style={{ cursor: "pointer" }}
          rating={value}
          onStarClick={onChange}
        />
      ) : (
        <input type={type} value={value} onChange={onChange} />
      )}
    </div>
  );
};

export default AlbumInput;
