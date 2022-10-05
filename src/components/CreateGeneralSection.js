import AlbumInput from "./AlbumInput";

const CreateGeneralSection = ({ general, setGeneral, onStarClick }) => {
  return (
    <div className="create-general-section">
      <AlbumInput
        label="Restaurant Name"
        value={general.name}
        onChange={(e) => setGeneral({ ...general, name: e.target.value })}
      />
      <AlbumInput
        label="Location"
        value={general.location}
        onChange={(e) => setGeneral({ ...general, location: e.target.value })}
      />
      <AlbumInput
        label="Date"
        type="date"
        value={general.date}
        onChange={(e) => setGeneral({ ...general, date: e.target.value })}
      />
      <AlbumInput
        label="Rating"
        type="rating"
        value={general.rating}
        onChange={onStarClick}
      />
    </div>
  );
};

export default CreateGeneralSection;
