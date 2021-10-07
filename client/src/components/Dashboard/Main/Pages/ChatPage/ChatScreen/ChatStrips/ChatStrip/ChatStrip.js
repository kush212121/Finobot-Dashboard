import React from "react";

// Styles
import "./ChatStrip.css";

const ChatStrip = ({ cusId }) => {
  return (
    <div className="chatStrip">
      <div className="chatStrip__uname">
        User#{cusId} <span className="badge badge-success">Live</span>
      </div>
      <div className="chatStrip__btm">
        <div>user: last msg 🎉</div>
        <div>11:00 AM</div>
      </div>
    </div>
  );
};

export default ChatStrip;
