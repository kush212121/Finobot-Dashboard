import React from "react";

// Styles
import "./ChatMsg.css";

const ChatMsg = ({ text, timestamp, isMe, isBot }) => {
  return (
    <div
      className={`chatMsg ${
        isMe ? "chatMsg__isMe" : isBot ? "chatMsg__isBot" : ""
      }`}
    >
      {text}
      <div className="chatMsg__timestamp">{timestamp}</div>
    </div>
  );
};

export default ChatMsg;
