const PopupContainer = ({ children, className }) => {
  return <div className={`popup-container ${className}`}>{children}</div>;
};

export default PopupContainer;
