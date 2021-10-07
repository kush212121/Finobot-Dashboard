import React, { useState } from "react";

// Styles
import "./ChatInput.css";

const ChatInput = ({ iconClass, ...rest }) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className={`chatInput ${isFocus ? "chatInput__focus" : ""}`}>
      <i className={iconClass}></i>
      <input
        type="text"
        {...rest}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </div>
  );
};

export default ChatInput;
