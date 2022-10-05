import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ImageThumbNail = ({ image, onImageChange, name }) => {
  const deleteImage = async () => {
    const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
    const url = `${urlEndpoint}/images/delete`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: image.public_id }),
    });
    const responseJSON = await response.json();
    if (responseJSON.success) onImageChange(null);
  };

  return (
    <div className="thumbnail" onClick={deleteImage}>
      <FontAwesomeIcon icon={faCircleXmark} />
      <img src={image.url} alt={name} />
    </div>
  );
};

export default ImageThumbNail;
