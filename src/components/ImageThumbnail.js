import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAlbum } from "../contexts/albumContext";

const ImageThumbNail = ({ image, name }) => {
  const { coverPhoto, chooseCoverPhoto, deleteImage } = useAlbum();

  const selected = image.url === coverPhoto ? "selected" : "";

  return (
    <div
      className={`thumbnail ${selected}`}
      onClick={() => chooseCoverPhoto(image.url)}
    >
      <FontAwesomeIcon
        icon={faCircleXmark}
        onClick={() => deleteImage(image.public_id)}
      />
      <img src={image.url} alt={name} />
    </div>
  );
};

export default ImageThumbNail;
