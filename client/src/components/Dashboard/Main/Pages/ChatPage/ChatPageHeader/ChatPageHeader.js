import React, { useState } from "react";
import ChatInput from "./ChatInput/ChatInput";

// Styles
import "./ChatPageHeader.css";

const ChatPageHeader = () => {
  const [searchChatKey, setSearchChatKey] = useState("");

  return (
    <div className="chatPageHeader">
      <ChatInput
        variant="text"
        iconClass="lnr lnr-magnifier"
        onChange={(e) => setSearchChatKey(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
};

export default ChatPageHeader;
