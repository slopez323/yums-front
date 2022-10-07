import { useAlbum } from "../contexts/albumContext";
import ImageThumbNail from "./ImageThumbnail";

const DishImageUpload = ({ dish }) => {
  const { updateDishes } = useAlbum();

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
          updateDishes(dish.count, "image", {
            url: result.info.url,
            public_id: result.info.public_id,
          });
          // onImageChange({
          //   url: result.info.url,
          //   public_id: result.info.public_id,
          // });
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
        <ImageThumbNail
          image={dish.image}
          // onImageChange={onImageChange}
          name={dish.name}
        />
      )}
    </div>
  );
};

export default DishImageUpload;
