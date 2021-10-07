import React from "react";

//Styles
import "./Loader.css";

//Assets
import Spinner from "./Spinner.svg";

const Loader = () => {
  return (
    <div className="loader">
      <div>
        <img src={Spinner} alt="Spinner" />
        Please Wait...
      </div>
    </div>
  );
};

export default Loader;
