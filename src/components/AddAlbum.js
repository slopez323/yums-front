import { useEffect } from "react";
import { useAlbum } from "../contexts/albumContext";
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
  const { general, dishes, otherImages, notes, coverPhoto, cancelCreate } =
    useAlbum();

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
        <CreateGeneralSection />
        <CreateDishSection />
        <CreateOthersSection />
        <div className="create-end-buttons">
          <button onClick={cancelCreate}>Cancel</button>
          <button onClick={createAlbum}>Create Album</button>
        </div>
      </Popup>
    </PopupContainer>
  );
};

export default AddAlbum;
