import { useAlbum } from "../contexts/albumContext";
import CreateDishSection from "./CreateDishSection";
import CreateGeneralSection from "./CreateGeneralSection";
import CreateOthersSection from "./CreateOthersSection";
import Popup from "./layout/Popup";
import PopupContainer from "./layout/PopupContainer";

const AddAlbum = ({ albumId }) => {
  const { createAlbum, cancelCreate, editAlbum } = useAlbum();

  return (
    <PopupContainer>
      <Popup style={{ padding: "20px" }}>
        <CreateGeneralSection />
        <CreateDishSection />
        <CreateOthersSection />
        <div className="create-end-buttons">
          <button onClick={cancelCreate}>Cancel</button>
          {albumId ? (
            <button onClick={() => editAlbum(albumId)}>Update Album</button>
          ) : (
            <button onClick={createAlbum}>Create Album</button>
          )}
        </div>
      </Popup>
    </PopupContainer>
  );
};

export default AddAlbum;
