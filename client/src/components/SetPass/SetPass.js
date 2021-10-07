import React, { useState } from "react";
import { useHistory, useParams } from "react-router";

import "./SetPass.css";

//Assets
import Logo from "../../assets/fintractlogo.png";

//Extension
import swal from "sweetalert";
import { setPass } from "../../api/regOrgApi";

const SetPass = () => {
  const { id } = useParams();
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [isPassHidden, setIsPassHidden] = useState(true);
  const [isConPassHidden, setIsConPassHidden] = useState(true);

  const [isPassFocus, setIsPassFocus] = useState(false);
  const [isConPassFocus, setIsConPassFocus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPass)
      return swal("Failed!", "Passwords do not match!", "error");

    if (password.length < 6)
      return swal("Failed!", "Passwords should be min 6 characters!", "error");

    try {
      const res = await setPass({ password }, id);
      console.log({ res });

      localStorage.setItem("finnToken", res.data.result.token);

      history.push("/");
    } catch (error) {
      console.log({ error });
      return swal("Failed!", error.response.data.message, "error");
    }
  };

  return (
    <div className="setPass">
      <form className="setPass__box" autoComplete="off" onSubmit={handleSubmit}>
        <img src={Logo} alt="fintract" />
        <h2>Set New Password</h2>
        <div
          className={`setPass__input ${
            isPassFocus ? "setPass__input__focus" : ""
          }`}
        >
          <input
            name="password"
            value={password}
            label="Password"
            type={isPassHidden ? "password" : "text"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            onFocus={() => setIsPassFocus(true)}
            onBlur={() => setIsPassFocus(false)}
          />

          <i
            className={`fas fa-eye${isPassHidden ? "-slash" : ""}`}
            onClick={() => setIsPassHidden((prev) => !prev)}
          ></i>
        </div>
        <div
          className={`setPass__input ${
            isConPassFocus ? "setPass__input__focus" : ""
          }`}
        >
          <input
            name="confirmPass"
            value={confirmPass}
            placeholder="Confirm Password"
            label="Confirm Password"
            type={isConPassHidden ? "password" : "text"}
            onChange={(e) => setConfirmPass(e.target.value)}
            autoComplete="off"
            onFocus={() => setIsConPassFocus(true)}
            onBlur={() => setIsConPassFocus(false)}
          />
          <i
            className={`fas fa-eye${isConPassHidden ? "-slash" : ""}`}
            onClick={() => setIsConPassHidden((prev) => !prev)}
          ></i>
        </div>

        <button type="submit" className="btn btn-primary">
          Set Password
        </button>
      </form>
    </div>
  );
};

export default SetPass;
