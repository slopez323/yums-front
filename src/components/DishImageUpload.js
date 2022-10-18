import { useAlbum } from "../contexts/albumContext";
import ImageThumbNail from "./ImageThumbnail";

const DishImageUpload = ({ dish, index, albumId }) => {
  const { updateDishes, addImageForUpload } = useAlbum();

  const showWidget = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUD_NAME,
        sources: ["local", "url", "google_drive"],
        uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
        cropping: true,
        maxFiles: 1,
        folder: "yums",
        clientAllowedFormats: "image",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const image = {
            url: result.info.url,
            public_id: result.info.public_id,
          };
          updateDishes(index, "image", image);
          addImageForUpload([image]);
        }
      }
    );
    widget.open();
  };

  return (
    <div>
      {!dish.image ? (
        <button onClick={showWidget}>Upload Image</button>
      ) : (
        <ImageThumbNail image={dish.image} index={index} name={dish.name} />
      )}
    </div>
  );
};

export default DishImageUpload;
