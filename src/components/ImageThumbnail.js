import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAlbum } from "../contexts/albumContext";

const ImageThumbNail = ({ image, name, index }) => {
  const {
    coverPhoto,
    chooseCoverPhoto,
    addImageForDeletion,
    updateDishes,
    removeOtherImage,
  } = useAlbum();

  const selected = image.url === coverPhoto ? "selected" : "";

  const handleImageDelete = () => {
    addImageForDeletion(image.public_id);
    if (index >= 0) {
      console.log(index);
      updateDishes(index, "image", null);
    } else {
      removeOtherImage(image);
    }
  };

  return (
    <div className="thumbnail">
      <img
        src={image.url}
        alt={name}
        className={selected}
        onClick={() => chooseCoverPhoto(image.url)}
      />
      <FontAwesomeIcon icon={faCircleXmark} onClick={handleImageDelete} />
    </div>
  );
};

export default ImageThumbNail;
