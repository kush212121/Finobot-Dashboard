import React from "react";

// Styles
import "./InfoStrip.css";

const InfoStrip = ({ iconClass, heading, value }) => {
  return (
    <div className="infoStrip">
      <i className={iconClass} />
      <div className="infoStrip__content">
        <div className="infoStrip__heading">{heading}</div>
        <div className="infoStrip__value">{value}</div>
      </div>
    </div>
  );
};

export default InfoStrip;
