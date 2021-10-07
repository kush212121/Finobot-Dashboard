import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Styles
import "./OrgSettings.css";

// MatUI
import { TextField } from "@material-ui/core";

//Components
import Loader from "../../../../common/Loader/Loader";
import { updateOrg } from "../../../../../api/regOrgApi";
import { setUser } from "../../../../../redux/actions/authActions";

const OrgSettings = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //Local State
  const [form, setForm] = useState({ ...user });
  const [isUnsaved, setIsUnsaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formCompData = {
    directorName: {
      label: "Director Name",
      type: "directorName",
      isDisabled: true,
    },
    orgName: {
      label: "Organization Name",
      type: "text",
      isDisabled: true,
    },
    email: { label: "Email", type: "email" },
    address: { label: "Address", type: "text" },
    firstNumber: { label: "First Number", type: "text" },
    secondNumber: { label: "Second Number", type: "text" },
    domainName: { label: "Domain Name", type: "text" },
  };

  const handleChange = (e) => {
    setIsUnsaved(true);
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ form });

    try {
      setIsLoading(true);
      const updatedOrg = await updateOrg(form);

      console.log({ updatedOrg });

      dispatch(setUser(form));
      setIsUnsaved(false);
    } catch (error) {
      console.log({ err: error.response });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="orgSettings dashboard__page" onSubmit={handleSubmit}>
      {isLoading && <Loader />}

      <h1 className="manageOrgs__heading">Settings</h1>

      <h3>Account Details</h3>

      <div className="orgSettings__grid">
        {Object.keys(form)
          .filter((key) => Object.keys(formCompData).includes(key))
          .sort(
            (a, b) =>
              Object.keys(formCompData).indexOf(a) -
              Object.keys(formCompData).indexOf(b)
          )
          .map((key) => {
            const { label, type, isDisabled } = formCompData[key];

            return (
              <TextField
                key={key}
                name={key}
                value={form[key]}
                label={label}
                type={type}
                onChange={handleChange}
                disabled={isDisabled}
              />
            );
          })}
      </div>

      <button className="btn btn-primary">Save Settings</button>

      {isUnsaved && (
        <div className="text-danger">
          Unsaved changes click on save to save your settings
        </div>
      )}
    </form>
  );
};

export default OrgSettings;
