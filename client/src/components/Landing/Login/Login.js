import React, { useState } from "react";
import { useHistory } from "react-router";
import InputGroup from "../../common/Groups/InputGroup/InputGroup";

// MatUI
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

//Assets
import Logo from "../../../assets/fintractlogo.png";

//Api
import swal from "sweetalert";
import { loginApprovedOrg, loginAgent, loginUser } from "../../../api/login";

//utils
import validate from "../../../utils/validate";

const Login = ({ isLogin, setIsLogin }) => {
  const [pgNo, setPgNo] = useState(1);

  const history = useHistory();

  const initState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initState);
  const [formDataValid, setFormDataValid] = useState({ email: "" });
  const [loginType, setLoginType] = useState("Agent");

  const { email, password } = formData;

  const handleChange = (e) => {
    const isValidMsg = validate(e.target.type, e.target.value);
    setFormDataValid({ ...formDataValid, [e.target.name]: isValidMsg });

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calcLoginType = (loginType) => {
    switch (loginType) {
      case "Agent":
        return "agents";
      case "Organization":
        return "orgs";
      case "Admin":
        return "admin";
      default:
        return "agents";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validation Handler

    if (formDataValid.email.length) {
      console.log({ er: formDataValid.email });
      return swal("Failed!", formDataValid.email, "error");
    }

    try {
      // let res;
      // if (loginType === "Agent Login") res = await loginAgent(formData);
      // else res = await loginApprovedOrg(formData);

      const res = await loginUser(formData, calcLoginType(loginType));

      console.log({ res });

      localStorage.setItem("finnToken", res?.data?.token);

      history.push("/dashboard");
    } catch (err) {
      console.log({ err: err?.response?.data?.message });
      swal("Failed!", err?.response?.data?.message, "error");
    }
  };

  return (
    <div className={`register ${isLogin ? "swipe-left" : ""}`}>
      <div className="register__content">
        <img src={Logo} alt="fintract" className="register__content__logo" />
        <p>Welcome Back!</p>
        <h1>Login to your account </h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <div className="multi__form">
            <div className={`multi__form__page`}>
              <TextField
                id="loginEmail"
                name="email"
                value={email}
                label="Email"
                type="email"
                onChange={handleChange}
                error={formDataValid.email.length ? true : false}
                helperText={formDataValid.email}
              />
              <TextField
                id="password"
                name="password"
                value={password}
                label="Password"
                type="password"
                onChange={handleChange}
              />
              <FormControl>
                <InputLabel>Login Type</InputLabel>
                <Select
                  value={loginType}
                  onChange={(e) => setLoginType(e.target.value)}
                >
                  <MenuItem value={"Agent"}>Agent</MenuItem>
                  <MenuItem value={"Organization"}>Organization</MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
              <button className="btn submit__btn">Login</button>
              <div className="grid__center">
                Dont have an account?{" "}
                <span
                  className="login__text"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  Join free today
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
