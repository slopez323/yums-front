const PopupContainer = ({ children }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "#f0ece2d3",
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    >
      {children}
    </div>
  );
};

export default PopupContainer;
