import React, { useEffect, useState } from "react";

// Styles
import "./ChatScreen.css";

//Components
import ChatStrips from "./ChatStrips/ChatStrips";
import UserChat from "./UserChat/UserChat";
import UserDetails from "./UserDetails/UserDetails";

//Api
import { getAllCustomers } from "../../../../../../api/regOrgApi";
import { useSelector } from "react-redux";

const ChatScreen = () => {
  const { orgId } = useSelector((state) => state.auth.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (orgId) getCustomers(orgId);
  }, [orgId]);

  const getCustomers = async (data) => {
    try {
      const custs = await getAllCustomers(data);
      console.log({ custs });
      setUsers(custs.data);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="chatScreen">
      <ChatStrips users={users} />
      <UserChat />
      <UserDetails />
    </div>
  );
};

export default ChatScreen;
