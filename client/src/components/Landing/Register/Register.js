import React, { useState } from "react";
import InputGroup from "../../common/Groups/InputGroup/InputGroup";
import Input from "../../common/Input/Input";

// Style
import "./Register.css";

// Mat UI
import TextField from "@material-ui/core/TextField";

//Assets
import Logo from "../../../assets/fintractlogo.png";

//Utils
import validate from "../../../utils/validate";

//Api
import { registerOrg } from "../../../api/regOrgApi";
import swal from "sweetalert";

const Register = ({ isLogin, setIsLogin }) => {
  const [pgNo, setPgNo] = useState(1);

  const initState = {
    orgName: "",
    address: "",
    directorName: "",
    email: "",
    firstNumber: "",
    secondNumber: "",
    domainName: "",
  };

  const [formData, setFormData] = useState(initState);
  const [formDataValid, setFormDataValid] = useState(initState);

  const {
    orgName,
    address,
    directorName,
    email,
    firstNumber,
    secondNumber,
    domainName,
  } = formData;

  ///State Change Handler
  const handleChange = (e) => {
    const isValidMsg = validate(e.target.type, e.target.value);
    setFormDataValid({ ...formDataValid, [e.target.name]: isValidMsg });

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validation Handler
    let validErr = false;

    Object.values(formDataValid).forEach((field) => {
      if (field !== "") validErr = true;
    });

    if (validErr) return swal("Failed!", "Invalid Fields", "error");

    try {
      const res = await registerOrg(formData);

      console.log({ res });
      swal(
        "You have been registered for Finnobot!😊",
        "You will receive your credentials shortly!",
        "success"
      );

      setFormData(initState);
      setFormDataValid(initState);
    } catch (err) {
      console.log({ err: err?.response?.data?.message });
      swal("Failed!", err?.response?.data?.message, "error");
    }

    console.log({ formData });
  };

  return (
    <div className={`register ${isLogin ? "swipe-left" : ""}`}>
      <div className="register__content">
        <img src={Logo} alt="fintract" className="register__content__logo" />
        <p>Welcome to Finnobot</p>
        <h1>Register for Finnobot</h1>

        <div className="register__step__btns">
          {pgNo === 2 && (
            <i
              className="btn fas fa-arrow-circle-left arrow"
              onClick={() => setPgNo(1)}
            />
          )}
          <span
            className={`${pgNo === 1 ? "register__step__btn__active" : ""}`}
            onClick={() => setPgNo(1)}
          >
            1
          </span>
          <span
            className={`${pgNo === 2 ? "register__step__btn__active" : ""}`}
            onClick={() => setPgNo(2)}
          >
            2
          </span>
        </div>

        <form className="register__form" onSubmit={handleSubmit}>
          <div className="multi__form">
            <div
              className={`multi__form__page ${pgNo > 1 ? "swipe-left" : ""}`}
            >
              {/* Input Group 1 */}
              <TextField
                id="orgName"
                name="orgName"
                value={orgName}
                label="Organization Name"
                onChange={handleChange}
                type="text"
                error={formDataValid.orgName.length ? true : false}
                helperText={formDataValid.orgName}
              />
              <TextField
                id="address"
                name="address"
                value={address}
                label="Address"
                onChange={handleChange}
                type="text"
                error={formDataValid.address.length ? true : false}
                helperText={formDataValid.address}
              />
              <TextField
                id="directorName"
                name="directorName"
                value={directorName}
                label="Director Name"
                onChange={handleChange}
                type="text"
                error={formDataValid.directorName.length ? true : false}
                helperText={formDataValid.directorName}
              />
              <TextField
                id="regEmail"
                name="email"
                value={email}
                label="Email"
                type="email"
                onChange={handleChange}
                error={formDataValid.email.length ? true : false}
                helperText={formDataValid.email}
              />

              {/* Input Group 1 */}
              <div className="grid__center">
                <i
                  className="btn fas fa-arrow-circle-right arrow"
                  onClick={() => setPgNo(2)}
                />
                <br />
                Already Registered?{" "}
                <span
                  className="login__text"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  Login
                </span>
              </div>
            </div>
            <div
              className={`multi__form__page page2 ${
                pgNo > 1 ? "swipe-left" : ""
              }`}
            >
              {/* Input Group 2 */}
              <TextField
                id="firstNumber"
                name="firstNumber"
                placeholder="+91 8386087482"
                value={firstNumber}
                label="First Number (with country code)"
                onChange={handleChange}
                type="tel"
                error={formDataValid.firstNumber.length ? true : false}
                helperText={formDataValid.firstNumber}
              />
              <TextField
                id="secondNumber"
                name="secondNumber"
                value={secondNumber}
                placeholder="+91 8386087482"
                label="Second Number (with country code)"
                onChange={handleChange}
                type="tel"
                error={formDataValid.secondNumber.length ? true : false}
                helperText={formDataValid.secondNumber}
              />
              <TextField
                id="domainName"
                name="domainName"
                placeholder="https://google.com"
                value={domainName}
                label="Domain Name"
                onChange={handleChange}
                type="text"
                error={formDataValid.domainName.length ? true : false}
                helperText={formDataValid.domainName}
              />

              {/* Input Group 2 */}
              <button className="btn submit__btn">Register</button>
              <div className="grid__center">
                Already Registered?{" "}
                <span
                  className="login__text"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  Login
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
