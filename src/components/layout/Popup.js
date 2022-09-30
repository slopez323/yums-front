const Popup = ({ children, style }) => {
  return (
    <div
      style={{
        width: "95%",
        height: "90%",
        boxSizing: "border-box",
        padding: "10px",
        backgroundColor: "white",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Popup;
