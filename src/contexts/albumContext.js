import { createContext, useContext, useEffect, useState } from "react";
import { usePopup } from "./popupContext";

const albumContext = createContext();

export const AlbumProvider = ({ children }) => {
  const { hidePopup } = usePopup();
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
  const [otherImages, setOtherImages] = useState([]);
  const [notes, setNotes] = useState("");
  const [coverPhoto, setCoverPhoto] = useState();

  const updateGeneralDetails = (key, value) => {
    setGeneral({ ...general, [key]: value });
  };

  const updateDishes = (count, key, value) => {
    const updated = dishes.map((dish) => {
      if (dish.count === count) {
        return { ...dish, [key]: value };
      }
      return { ...dish };
    });
    setDishes(updated);
  };

  const onStarClick = (i) => {
    setGeneral({ ...general, rating: i + 1 });
  };

  const deleteImage = async (id) => {
    const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
    const url = `${urlEndpoint}/images/delete`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const responseJSON = await response.json();
    if (responseJSON.success) removefromImageList(id);
  };

  const removefromImageList = (id) => {
    if (otherImages.some((image) => image.public_id)) {
      const imageRemoved = otherImages.filter(
        (image) => image.public_id !== id
      );
      setOtherImages(imageRemoved);
    } else {
      const imageRemoved = dishes.map((dish) => {
        if (dish.image && dish.image.public_id === id) {
          return { ...dish, image: null };
        }
        return { ...dish };
      });
      setDishes(imageRemoved);
    }
  };

  const addMoreDishes = () => {
    const count = dishes.length + 1;
    setDishes([...dishes, { ...newDish, count }]);
  };

  const addOtherImage = (img) => {
    setOtherImages([...otherImages, ...img]);
  };

  const chooseCoverPhoto = (url) => {
    setCoverPhoto(url);
  };

  const deleteUnsavedImages = () => {
    //delete all uploaded images in cloudinary for cancelled album
    //do same on unmount of addalbum component
    dishes.forEach((dish) => {
      if (dish.image) {
        deleteImage(dish.image.public_id);
      }
    });
    otherImages.forEach((image) => {
      deleteImage(image.public_id);
    });
  };

  const cancelCreate = () => {
    setGeneral({ ...initialGeneral });
    setDishes([{ ...newDish }]);
    setNotes("");
    setCoverPhoto();
    setOtherImages([]);
    deleteUnsavedImages();
    hidePopup();
  };

  useEffect(() => {
    if (
      !coverPhoto ||
      (!dishes.some((dish) => dish.image && dish.image.url === coverPhoto) &&
        !otherImages.some((image) => image.url === coverPhoto))
    ) {
      if (dishes.some((dish) => dish.image)) {
        const first = dishes.find((dish) => dish.image);
        setCoverPhoto(first.image.url);
        return;
      }
      if (otherImages.length > 0) {
        setCoverPhoto(otherImages[0].url);
      }
      // add class to highlight thumbnail of coverphoto
    }
    if (
      coverPhoto &&
      otherImages.length === 0 &&
      !dishes.some((dish) => dish.image)
    )
      setCoverPhoto();
  }, [dishes, otherImages]);

  const value = {
    general,
    dishes,
    otherImages,
    notes,
    coverPhoto,
    chooseCoverPhoto,
    updateGeneralDetails,
    updateDishes,
    onStarClick,
    addMoreDishes,
    addOtherImage,
    cancelCreate,
    deleteImage,
  };

  return (
    <albumContext.Provider value={value}>{children}</albumContext.Provider>
  );
};

export const useAlbum = () => useContext(albumContext);
