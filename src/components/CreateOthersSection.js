import { useDispatch } from "react-redux";
import { addOtherImage } from "../contexts/otherImageSlice";

const CreateOthersSection = ({ notes, setNotes }) => {
  const dispatch = useDispatch();

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
        if (!error && result && result.event === "success") {
          console.log(result);
          dispatch(
            addOtherImage({
              url: result.info.url,
              public_id: result.info.public_id,
            })
          );
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
    </div>
  );
};

export default CreateOthersSection;
