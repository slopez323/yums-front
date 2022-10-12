import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import { usePopup } from "./popupContext";

const albumContext = createContext();
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

export const AlbumProvider = ({ children }) => {
  const { userId } = useAuth();
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

  const [userData, setUserData] = useState();
  const [refreshData, setRefreshData] = useState();

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

  const removeDishes = () => {};

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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(albumDetails),
    });
    const responseJSON = await response.json();
    if (responseJSON.success) {
      setRefreshData(response);
      hidePopup();
    }
  };

  const editAlbum = async (albumId) => {
    const { name, location, date, rating } = general;
    const dishList = dishes.map((dish) => {
      const { count, ...rest } = dish;
      return rest;
    });

    const albumDetails = {
      userId,
      albumId,
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
    const url = `${urlEndpoint}/users/edit-album`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(albumDetails),
    });
    const responseJSON = await response.json();
    if (responseJSON.success) {
      setRefreshData(response);
      hidePopup();
    }
  };

  const setEditData = (data) => {
    const {
      coverPhoto,
      date,
      dishList,
      location,
      name,
      notes,
      otherImages,
      rating,
    } = data;

    const dishCount = dishList.map((dish, i) => {
      return { ...dish, count: i + 1 };
    });

    setGeneral({ name, location, date, rating });
    setDishes([...dishCount]);
    setNotes(notes);
    setCoverPhoto(coverPhoto);
    setOtherImages([...otherImages]);
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

  const getUserData = async () => {
    const url = `${urlEndpoint}/users/user?id=${userId}`;
    const response = await fetch(url);
    const responseJSON = await response.json();
    if (responseJSON.success) setUserData(responseJSON.message);
  };

  const deleteAlbum = async (albumId) => {
    const album = userData.restaurantList.find(
      (item) => item.albumId === albumId
    );
    const dishImages = album.dishList.reduce((filtered, dish) => {
      if (dish.image) filtered.push(dish.image.public_id);
      return filtered;
    }, []);
    const other = album.otherImages.map((img) => img.public_id);
    const images = [...dishImages, ...other];

    const url = `${urlEndpoint}/users/delete-album`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, albumId }),
    });
    const responseJSON = await response.json();
    if (responseJSON.success) {
      images.forEach(async (img) => await deleteImage(img));
      setRefreshData(response);
      hidePopup();
    }
  };

  useEffect(() => {
    if (userId) getUserData();
  }, [userId, refreshData]);

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
    createAlbum,
    userData,
    deleteAlbum,
    setEditData,
    editAlbum,
  };

  return (
    <albumContext.Provider value={value}>{children}</albumContext.Provider>
  );
};

export const useAlbum = () => useContext(albumContext);
