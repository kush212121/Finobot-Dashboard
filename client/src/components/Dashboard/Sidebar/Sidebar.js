import React, { useState } from "react";

// Styles
import "./Sidebar.css";

//Fintractlogo
import Logo from "../../../assets/fintractlogo.png";
import { setUser } from "../../../redux/actions/authActions";

//redux
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const Sidebar = ({ pagesData, activePageId, setActivePageId }) => {
  // const [pages, setPages] = useState([
  //   { id: 0, icon: "lnr lnr-chart-bars" },
  //   { id: 1, icon: "lnr lnr-bubble" },
  //   { id: 2, icon: "lnr lnr-cog" },
  // ]);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    history.push("/");
    localStorage.removeItem("finnToken");
    dispatch(setUser({ role: "org" }));
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src={Logo} alt="fintract" className="sidebar__logo" />
      </div>
      <div className="sidebar__btm">
        <div className="sidebar__middle">
          {pagesData.map(({ id, icon }) => (
            <div
              key={id}
              className={`sidebar__btn ${
                activePageId === id ? "sidebar__btn__active" : ""
              }`}
              onClick={() => setActivePageId(id)}
            >
              <i className={icon}></i>
            </div>
          ))}
          <div className="sidebar__btn" onClick={logout}>
            <i className={"lnr lnr-exit"}></i>
          </div>
        </div>

        <div className="sidebar__dp">
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            alt="people"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
