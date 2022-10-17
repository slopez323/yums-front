import { useAlbum } from "../contexts/albumContext";
import AlbumInput from "./AlbumInput";

const CreateGeneralSection = () => {
  const { general, coverPhoto, updateGeneralDetails } = useAlbum();

  return (
    <div className="create-general-section">
      <div className="general-details">
        <AlbumInput
          label="Restaurant Name"
          value={general.name}
          onChange={(e) => updateGeneralDetails("name", e.target.value)}
        />
        <AlbumInput
          label="Location"
          type="location"
          value={general.location}
          // onChange={(e) => updateGeneralDetails("location", e.target.value)}
        />
        <AlbumInput
          label="Date"
          type="date"
          value={general.date}
          onChange={(e) => updateGeneralDetails("date", e.target.value)}
        />
        <AlbumInput label="Rating" type="rating" value={general.rating} />
      </div>
      {coverPhoto ? (
        <div className="create-cover">
          <img src={coverPhoto} alt={general.name} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreateGeneralSection;
