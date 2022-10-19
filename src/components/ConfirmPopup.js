import { useAlbum } from "../contexts/albumContext";
import { useAuth } from "../contexts/authContext";
import PopupContainer from "./layout/PopupContainer";

const ConfirmPopup = ({
  showConfirm,
  setShowConfirm,
  setError,
  setShowAccountMenu,
}) => {
  const { deleteAlbum } = useAlbum();
  const { deleteAccount } = useAuth();

  const onConfirm = async () => {
    if (showConfirm.type === "delete-album") {
      const response = await deleteAlbum(showConfirm.albumId);
      if (response) {
        setError({ show: true, message: response });
      } else {
        setShowConfirm({
          show: false,
          type: "",
          albumId: "",
        });
      }
    } else if (showConfirm.type === "delete-account") {
      const response = await deleteAccount();
      if (response) {
        setError({ show: true, message: response });
      } else {
        setShowConfirm({
          show: false,
          type: "",
          albumId: "",
        });
        setShowAccountMenu(false);
      }
    }
  };

  return (
    <PopupContainer className="confirm">
      <div className="confirm-popup">
        <span>
          Would you like to proceed with deleting this{" "}
          {showConfirm.type === "delete-album" ? "album" : "account"}?
        </span>
        <div>
          <button
            onClick={() =>
              setShowConfirm({
                show: false,
                type: "",
                albumId: "",
              })
            }
          >
            Cancel
          </button>
          <button onClick={onConfirm}>Proceed</button>
        </div>
      </div>
    </PopupContainer>
  );
};

export default ConfirmPopup;
