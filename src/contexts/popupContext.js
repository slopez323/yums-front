import { createContext, useContext, useReducer } from "react";
import AddAlbum from "../components/AddAlbum";
import Album from "../components/Album";

const popupContext = createContext();
const empty = <></>;

const POPUP_TYPES = {
  HIDE: "hide",
  ALBUM: "album",
  NEW_ALBUM: "new-album",
  EDIT_ALBUM: "edit-album",
};

const popupReducer = (state, action) => {
  if (action.type === POPUP_TYPES.HIDE) {
    return empty;
  }
  if (action.type === POPUP_TYPES.ALBUM) {
    return <Album data={action.data} />;
  }
  if (action.type === POPUP_TYPES.NEW_ALBUM) {
    return <AddAlbum />;
  }
  if (action.type === POPUP_TYPES.EDIT_ALBUM) {
    return <AddAlbum albumId={action.albumId} />;
  }
  return state;
};

export const PopupProvider = ({ children }) => {
  const [popup, popupDispatcher] = useReducer(popupReducer, empty);

  const hidePopup = () => popupDispatcher({ type: POPUP_TYPES.HIDE });
  const showAlbum = (data) =>
    popupDispatcher({ type: POPUP_TYPES.ALBUM, data });
  const showNewAlbum = () => popupDispatcher({ type: POPUP_TYPES.NEW_ALBUM });
  const showEditAlbum = (albumId) =>
    popupDispatcher({ type: POPUP_TYPES.EDIT_ALBUM, albumId });

  return (
    <popupContext.Provider
      value={{ popup, hidePopup, showAlbum, showNewAlbum, showEditAlbum }}
    >
      {children}
    </popupContext.Provider>
  );
};

export const usePopup = () => useContext(popupContext);
