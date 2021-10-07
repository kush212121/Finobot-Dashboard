import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// Styles
import "./UserChat.css";

//Utils
import { formatAMPM } from "../../../../../../../utils/formatDateTime";

//Components
import ChatMsg from "./ChatMsg/ChatMsg";
import { useSelector } from "react-redux";

//var
let socket;

const UserChat = () => {
  // const ENDPOINT = "http://localhost:5000";
  const ENDPOINT =
    process.env.REACT_APP_ENDPOINT ||
    "https://finnobot-node-back.fintract.co.uk";
  // const ENDPOINT = "https://finnobot-node-back.fintract.co.uk";

  const [messages, setMessages] = useState([]);

  const [chatInput, setChatInput] = useState("");
  const [customerSocId, setCustomerSocId] = useState(null);

  //redux
  const {
    user: { name: agentName, orgId },
  } = useSelector((state) => state.auth);

  // refs
  const chatWinRef = useRef(null);
  const dummy = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!chatInput) return;

    const msgPayload = {
      text: chatInput,
      sender: "me",
      customerSocId,
      timestamp: formatAMPM(new Date()),
    };

    socket.emit("agent-message", msgPayload, ({ err }) => {
      console.log({ err });
    });

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length,
        text: chatInput,
        sender: "me",
        timestamp: formatAMPM(new Date()),
      },
    ]);

    setChatInput("");
    chatWinRef.current.scrollTo(0, chatWinRef.current.scrollHeight + 1500);
  };

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit(
      "join",
      {
        userName: agentName,
        agentId: "12139",
        isAgent: true,
        orgOrigin: orgId.domainName,
      },
      (error) => {
        console.log({ error });
      }
    );

    socket.on("message", ({ text, sender }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          text,
          sender,
          timestamp: formatAMPM(new Date()),
        },
      ]);
    });

    socket.on("customer-connect", ({ message, customerSocId: cusSocId }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          text: message,
          sender: "bot",
          timestamp: formatAMPM(new Date()),
        },
      ]);
      setCustomerSocId(cusSocId);
    });
    socket.on("customer-disconnect", ({ message }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          text: message,
          sender: "bot",
          timestamp: formatAMPM(new Date()),
        },
      ]);
      setCustomerSocId(null);
    });

    //DESC: Disconnect Event
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT]);

  useEffect(() => {
    chatWinRef.current.scrollTo(0, chatWinRef.current.scrollHeight + 1500);
  }, [messages]);

  return (
    <form className="userChat" onSubmit={handleSubmit}>
      <div className="userChat__header">Conversation</div>
      <div className="userChat__msgs" ref={chatWinRef}>
        {messages.map(({ id, timestamp, text, sender }) => (
          <ChatMsg
            key={id}
            text={text}
            timestamp={timestamp}
            isMe={sender === "me"}
            isBot={sender === "bot"}
          />
        ))}
      </div>
      <div className="userChat__inputs">
        <div className="message__input">
          <input
            type="text"
            value={chatInput}
            placeholder="Type a message..."
            onChange={(e) => setChatInput(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

export default UserChat;
