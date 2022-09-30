import StarRating from "./StarRating";
import { useState } from "react";

const AlbumInput = ({ label, type, value, onChange }) => {
  // const [newRating, setNewRating] = useState();

  // const onStarClick = (i) => {
  //   setNewRating(i + 1);
  // };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <label>{label}</label>
      {type === "rating" ? (
        <StarRating
          style={{ cursor: "pointer" }}
          rating={value}
          onStarClick={onChange}
        />
      ) : (
        <input
          type={type}
          value={value}
          style={{ maxWidth: "300px" }}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default AlbumInput;
