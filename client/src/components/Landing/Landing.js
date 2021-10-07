import React, { useState } from "react";

// Styles
import "./Landing.css";
import Login from "./Login/Login";
import Register from "./Register/Register";

const Landing = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="landing">
      <div className={`landing__content ${isLogin ? "swipe-right" : ""}`}>
        <Register isLogin={isLogin} setIsLogin={setIsLogin} />
        <Login isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
    </div>
  );
};

export default Landing;
