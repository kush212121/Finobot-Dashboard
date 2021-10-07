import React from "react";

// Styles
import "./ChatPage.css";
import ChatPageHeader from "./ChatPageHeader/ChatPageHeader";
import ChatScreen from "./ChatScreen/ChatScreen";

const ChatPage = () => {
  return (
    <div className="chatPage">
      <ChatPageHeader />
      <ChatScreen />
    </div>
  );
};

export default ChatPage;
