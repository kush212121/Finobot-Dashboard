import React from "react";

// Styles
import "./PopupContainer.css";

const PopupContainer = ({ onClose, children }) => {
  return (
    <div className="popupContainer" onClick={onClose}>
      <div
        className="popupContainer__children"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default PopupContainer;
