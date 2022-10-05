import ImageThumbNail from "./ImageThumbnail";

const DishImageUpload = ({ image, name, onImageChange }) => {
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
          onImageChange({
            url: result.info.url,
            public_id: result.info.public_id,
          });
        }
      }
    );
    widget.open();
  };

  return (
    <div>
      {!image ? (
        <button onClick={showWidget}>Upload Image</button>
      ) : (
        <ImageThumbNail
          image={image}
          onImageChange={onImageChange}
          name={name}
        />
      )}
    </div>
  );
};

export default DishImageUpload;
