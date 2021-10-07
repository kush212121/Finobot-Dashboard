import React, { useEffect, useState } from "react";

// Styles
import "./Dashboard.css";

//Router
import { useHistory } from "react-router-dom";

//Components
import Sidebar from "./Sidebar/Sidebar";
import Main from "./Main/Main";

//Pages
import ChatPage from "./Main/Pages/ChatPage/ChatPage";
import ManageOrgs from "./Main/Pages/ManageOrgs/ManageOrgs";
import setAuthToken from "../../api/setAuthToken";
import { verifyToken } from "../../api/verifyToken";
import { setUser } from "../../redux/actions/authActions";

import { useDispatch, useSelector } from "react-redux";
import ManageAgents from "./Main/Pages/ManageAgents/ManageAgents";
import OrgHome from "./Main/Pages/OrgHome/OrgHome";
import IntentEditor from "./Main/Pages/IntentEditor/IntentEditor";
import OrgSettings from "./Main/Pages/OrgSettings/OrgSettings";

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  //States
  const [activePageId, setActivePageId] = useState(0);

  const adminPagesData = [
    {
      id: 0,
      component: <ManageOrgs />,
      icon: "lnr lnr-home",
    },
    {
      id: 1,
      component: <IntentEditor />,
      icon: "lnr lnr-list",
    },
  ];
  const orgPagesData = [
    {
      id: 0,
      component: <OrgHome />,
      icon: "lnr lnr-home",
    },
    {
      id: 1,
      component: <ManageAgents />,
      icon: "lnr lnr-user",
    },
    {
      id: 2,
      component: <IntentEditor />,
      icon: "lnr lnr-list",
    },
    {
      id: 3,
      component: <OrgSettings />,
      icon: "lnr lnr-cog",
    },
  ];

  const agentPagesData = [
    {
      id: 0,
      component: <ChatPage />,
      icon: "lnr lnr-bubble",
    },
  ];

  // const [pagesData, setPagesData] = useState(
  //   user.role === "org" ? orgPagesData : agentPagesData
  // );

  const pagesData =
    user.role === "admin"
      ? adminPagesData
      : user.role === "org"
      ? orgPagesData
      : agentPagesData;

  useEffect(() => {
    const token = localStorage.getItem("finnToken");

    setAuthToken(token);

    // checkToken();

    if (token) {
      setAuthToken(token);

      (async () => {
        try {
          const res = await verifyToken();
          // console.log({ user: res, token });
          dispatch(setUser(res.data));
        } catch (error) {
          console.log({ error });
          history.push("/");
          localStorage.removeItem("finnToken");
        }
      })();
    } else return history.push("/");
  }, []);

  // const checkToken = async () => {
  //   try {
  //     const res = await verifyToken();
  //     console.log({ verTok: res });
  //   } catch (error) {
  //     console.log({ error: error });
  //   }
  // };

  return (
    <div className="dashboard">
      <Sidebar
        pagesData={pagesData}
        activePageId={activePageId}
        setActivePageId={setActivePageId}
      />
      <Main
        activePage={pagesData.find(({ id }) => id === activePageId).component}
      />
    </div>
  );
};

export default Dashboard;
