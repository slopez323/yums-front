import { useEffect } from "react";
import { useAlbum } from "../contexts/albumContext";
import CreateDishSection from "./CreateDishSection";
import CreateGeneralSection from "./CreateGeneralSection";
import CreateOthersSection from "./CreateOthersSection";
import Popup from "./layout/Popup";
import PopupContainer from "./layout/PopupContainer";

const AddAlbum = ({ albumId, setError }) => {
  const { createAlbum, cancelCreate, editAlbum } = useAlbum();

  const handleAlbumCreation = async () => {
    const response = await createAlbum();
    if (response) {
      setError({ show: true, message: response });
    }
  };

  const handleAlbumUpdate = async () => {
    const response = await editAlbum(albumId);
    if (response) {
      setError({ show: true, message: response });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PopupContainer>
      <Popup style={{ padding: "20px" }}>
        <CreateGeneralSection />
        <CreateDishSection albumId={albumId} />
        <CreateOthersSection />
        <div className="create-end-buttons">
          <button onClick={cancelCreate}>Cancel</button>
          {albumId ? (
            <button onClick={handleAlbumUpdate}>Update Album</button>
          ) : (
            <button onClick={handleAlbumCreation}>Create Album</button>
          )}
        </div>
      </Popup>
    </PopupContainer>
  );
};

export default AddAlbum;
