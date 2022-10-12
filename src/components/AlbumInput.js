import { useAlbum } from "../contexts/albumContext";
import StarRating from "./StarRating";

const AlbumInput = ({ label, type, value, onChange }) => {
  const { onStarClick } = useAlbum();

  return (
    <div className="album-input">
      <label>{label}</label>
      {type === "rating" ? (
        <StarRating rating={value} onStarClick={onStarClick} />
      ) : (
        <input type={type} value={value} onChange={onChange} />
      )}
    </div>
  );
};

export default AlbumInput;
