import React from "react";
import ChatStrip from "./ChatStrip/ChatStrip";

// Styles
import "./ChatStrips.css";

const ChatStrips = ({ users }) => {
  return (
    <div className="chatStrips">
      {users.map(({ _id, cusId }) => (
        <ChatStrip key={_id} cusId={cusId} />
      ))}
    </div>
  );
};

export default ChatStrips;
