import { useAlbum } from "../contexts/albumContext";
import ImageThumbNail from "./ImageThumbnail";

const CreateOthersSection = ({ notes, setNotes, name }) => {
  const { otherImages, addOtherImage, addImageForUpload } = useAlbum();

  const showWidget = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUD_NAME,
        sources: ["local", "url", "google_drive"],
        uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
        folder: "yums",
        maxFiles: 20,
        clientAllowedFormats: "image",
      },
      (error, result) => {
        if (!error && result && result.event === "queues-end") {
          const files = result.info.files;
          const newImages = files.map((file) => {
            return {
              url: file.uploadInfo.url,
              public_id: file.uploadInfo.public_id,
            };
          });
          addOtherImage([...newImages]);
          addImageForUpload([...newImages]);
        }
      }
    );
    widget.open();
  };

  return (
    <div className="create-others-section">
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button onClick={showWidget}>Upload Other Album Images</button>
      <div className="add-other-images">
        {otherImages.map((image) => {
          return (
            <ImageThumbNail image={image} name={name} key={image.public_id} />
          );
        })}
      </div>
    </div>
  );
};

export default CreateOthersSection;
