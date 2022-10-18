import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useAlbum } from "../contexts/albumContext";
import StarRating from "./StarRating";

const AlbumInput = ({ label, type, value, onChange }) => {
  const { onStarClick, updateGeneralDetails, general } = useAlbum();
  const [location, setLocation] = useState(general.location);

  useEffect(() => {
    updateGeneralDetails("location", location);
  }, [location]);

  return (
    <div className="album-input">
      <label>{label}</label>
      {type === "rating" ? (
        <StarRating rating={value} onStarClick={onStarClick} />
      ) : type === "location" ? (
        <GooglePlacesAutocomplete
          apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
          selectProps={{ value: location, onChange: setLocation }}
        />
      ) : (
        <input type={type} value={value} onChange={onChange} />
      )}
    </div>
  );
};

export default AlbumInput;
