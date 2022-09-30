import { useState } from "react";
import AddDish from "./AddDish";
import AlbumInput from "./AlbumInput";
import Popup from "./layout/Popup";
import PopupContainer from "./layout/PopupContainer";

const AddAlbum = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState();
  const [rating, setRating] = useState(0);
  const [dishes, setDishes] = useState([]);

  const onStarClick = (i) => {
    setRating(i + 1);
  };

  const addMoreDishes = () => {};

  return (
    <PopupContainer>
      <Popup style={{ padding: "20px" }}>
        <div style={{ display: "grid", gap: "10px" }}>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <AlbumInput
              label="Restaurant Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <AlbumInput
              label="Location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <AlbumInput
              label="Date"
              type="date"
              value={new Date().toLocaleDateString("en-CA")}
              onChange={(e) => setDate(e.target.value)}
            />
            <AlbumInput
              label="Rating"
              type="rating"
              value={rating}
              onChange={onStarClick}
            />
          </div>
        </div>
        <div
          style={{
            padding: "25px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {dishes.map((dish) => {
            return <AddDish dish={dish} />;
          })}
          <AddDish
            count={dishes.length + 1}
            dishes={dishes}
            setDishes={setDishes}
          />
          <button onClick={addMoreDishes}>Add Another Dish</button>
        </div>
      </Popup>
    </PopupContainer>
  );
};

export default AddAlbum;
