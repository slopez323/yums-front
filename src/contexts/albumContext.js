import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import { usePopup } from "./popupContext";

const albumContext = createContext();
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

export const AlbumProvider = ({ children, setIsLoading }) => {
  const { userId } = useAuth();
  const { hidePopup, showAlbum } = usePopup();
  const newDish = { name: "", image: null, rating: 5 };
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
  const [imagesForDeletion, setImagesForDeletion] = useState([]);
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [notes, setNotes] = useState("");
  const [coverPhoto, setCoverPhoto] = useState();

  const [userData, setUserData] = useState();
  const [refreshData, setRefreshData] = useState();

  const updateGeneralDetails = (key, value) => {
    setGeneral({ ...general, [key]: value });
  };

  const updateDishes = (index, key, value) => {
    const dishesCopy = JSON.parse(JSON.stringify(dishes));
    dishesCopy[index][key] = value;
    setDishes(dishesCopy);
  };

  const updateNotes = (text) => {
    setNotes(text);
  };

  const onStarClick = (i) => {
    setGeneral({ ...general, rating: i + 1 });
  };

  const addImageForDeletion = (id) => {
    setImagesForDeletion([...imagesForDeletion, id]);
  };

  const addImageForUpload = (imgArr) => {
    setImagesToUpload((prevState) => [...prevState, ...imgArr]);
  };

  const deleteImage = async (id) => {
    setIsLoading(true);
    try {
      const url = `${urlEndpoint}/images/delete`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
    } catch (e) {}
    setIsLoading(false);
  };

  const addMoreDishes = () => {
    setDishes([...dishes, { ...newDish }]);
  };

  const removeDishes = (index) => {
    const dishesCopy = JSON.parse(JSON.stringify(dishes));
    dishesCopy.splice(index, 1);
    setDishes(dishesCopy);
  };

  const addOtherImage = (imgArr) => {
    setOtherImages((prevState) => [...prevState, ...imgArr]);
  };

  const removeOtherImage = (imgToRemove) => {
    setOtherImages(otherImages.filter((image) => image !== imgToRemove));
  };

  const chooseCoverPhoto = (url) => {
    setCoverPhoto(url);
  };

  const deleteUnsavedImages = () => {
    imagesToUpload.forEach((img) => deleteImage(img.public_id));
  };

  const createAlbum = async () => {
    setIsLoading(true);
    try {
      const { name, location, date, rating } = general;

      const albumDetails = {
        name,
        location,
        coverPhoto,
        date,
        rating,
        dishes,
        otherImages,
        notes,
      };
      const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
      const url = `${urlEndpoint}/users/create-album`;
      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(albumDetails),
      });
      const responseJSON = await response.json();
      if (responseJSON.success) {
        try {
          if (imagesForDeletion.length > 0)
            await Promise.all(
              imagesForDeletion.forEach(async (id) => await deleteImage(id))
            );
        } catch (e) {}
        resetStates();
        setRefreshData(response);
        setIsLoading(false);
        showAlbum(responseJSON.message);
        return;
      } else {
        setIsLoading(false);
        return "Unable to create album.  Try again.";
      }
    } catch (e) {
      setIsLoading(false);
      return "Unable to create album.  Try again.";
    }
  };

  const editAlbum = async (albumId) => {
    setIsLoading(true);
    try {
      const { name, location, date, rating } = general;

      const albumDetails = {
        albumId,
        name,
        location,
        coverPhoto,
        date,
        rating,
        dishes,
        otherImages,
        notes,
      };
      const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
      const url = `${urlEndpoint}/users/edit-album`;
      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(albumDetails),
      });
      const responseJSON = await response.json();
      if (responseJSON.success) {
        try {
          if (imagesForDeletion.length > 0)
            await Promise.all(
              imagesForDeletion.forEach(async (id) => await deleteImage(id))
            );
        } catch (e) {}
        resetStates();
        setRefreshData(response);
        setIsLoading(false);
        showAlbum(responseJSON.message);
      } else {
        setIsLoading(false);
        return "Unable to update album.  Try again.";
      }
    } catch (e) {
      setIsLoading(false);
      return "Unable to update album.  Try again.";
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

    setGeneral({ name, location, date, rating });
    setDishes([...dishList]);
    setNotes(notes);
    setCoverPhoto(coverPhoto);
    setOtherImages([...otherImages]);
  };

  const resetStates = () => {
    setGeneral({ ...initialGeneral });
    setDishes([{ ...newDish }]);
    setNotes("");
    setImagesForDeletion([]);
    setImagesToUpload([]);
    setCoverPhoto();
    setOtherImages([]);
    hidePopup();
  };

  const cancelCreate = () => {
    deleteUnsavedImages();
    resetStates();
  };

  const getUserData = async () => {
    setIsLoading(true);
    try {
      const url = `${urlEndpoint}/users/user-data`;
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const responseJSON = await response.json();
      if (responseJSON.success) {
        setUserData(responseJSON.message);
      } else setUserData();
    } catch (e) {
      setUserData();
    }
    setIsLoading(false);
  };

  const deleteAlbum = async (albumId) => {
    setIsLoading(true);
    try {
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
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ albumId }),
      });
      const responseJSON = await response.json();
      if (responseJSON.success) {
        try {
          if (images.length > 0)
            await Promise.all(
              images.forEach(async (id) => await deleteImage(id))
            );
        } catch (e) {}
        setRefreshData(response);
        setIsLoading(false);
        hidePopup();
        return;
      } else {
        setIsLoading(false);
        return "Unable to delete album.  Try again.";
      }
    } catch (e) {
      setIsLoading(false);
      return "Unable to delete album.  Try again.";
    }
  };

  useEffect(() => {
    getUserData();
  }, [userId, refreshData]);

  useEffect(() => {
    if (dishes !== [{ ...newDish }]) {
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
    }
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
    updateNotes,
    onStarClick,
    addMoreDishes,
    removeDishes,
    addOtherImage,
    removeOtherImage,
    cancelCreate,
    addImageForDeletion,
    addImageForUpload,
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
