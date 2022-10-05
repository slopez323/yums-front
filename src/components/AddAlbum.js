import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../contexts/authContext";
import { usePopup } from "../contexts/popupContext";
import CreateDishSection from "./CreateDishSection";
import CreateGeneralSection from "./CreateGeneralSection";
import CreateOthersSection from "./CreateOthersSection";
import Popup from "./layout/Popup";
import PopupContainer from "./layout/PopupContainer";

const AddAlbum = () => {
  const { userId } = useAuth();
  const { hidePopup } = usePopup();
  const otherImages = useSelector((state) => state.otherImages);
  const newDish = { name: "", image: null, rating: 5, count: 1 };
  const initialGeneral = {
    name: "",
    location: "",
    date: new Date().toLocaleDateString("en-CA"),
    rating: 0,
  };
  const [general, setGeneral] = useState({
    ...initialGeneral,
  });
  const [dishes, setDishes] = useState([{ ...newDish }]);
  const [notes, setNotes] = useState("");
  const [coverPhoto, setCoverPhoto] = useState();

  const onStarClick = (i) => {
    setGeneral({ ...general, rating: i + 1 });
  };

  const addMoreDishes = () => {
    const count = dishes.length + 1;
    setDishes([...dishes, { ...newDish, count }]);
  };

  const deleteUnsavedImages = () => {};

  const cancelCreate = () => {
    //set all states to initial
    //delete all uploaded images in cloudinary
    setGeneral({ ...initialGeneral });
    setDishes([{ ...newDish }]);
    setNotes("");
    setCoverPhoto();
    deleteUnsavedImages();
  };

  const createAlbum = async () => {
    const { name, location, date, rating } = general;
    const dishList = dishes.map((dish) => {
      const { count, ...rest } = dish;
      return rest;
    });

    const albumDetails = {
      userId,
      name,
      location,
      coverPhoto,
      date,
      rating,
      dishes: dishList,
      otherImages,
      notes,
    };
    const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
    const url = `${urlEndpoint}/users/create-album`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(albumDetails),
    });
    const responseJSON = await response.json();
    if (responseJSON.success) hidePopup();
  };

  return (
    <PopupContainer>
      <Popup style={{ padding: "20px" }}>
        <CreateGeneralSection
          general={general}
          setGeneral={setGeneral}
          onStarClick={onStarClick}
        />
        <CreateDishSection
          dishes={dishes}
          setDishes={setDishes}
          addMoreDishes={addMoreDishes}
        />
        <CreateOthersSection notes={notes} setNotes={setNotes} />
        <div className="create-end-buttons">
          <button onClick={cancelCreate}>Cancel</button>
          <button onClick={createAlbum}>Create Album</button>
        </div>
      </Popup>
    </PopupContainer>
  );
};

export default AddAlbum;
