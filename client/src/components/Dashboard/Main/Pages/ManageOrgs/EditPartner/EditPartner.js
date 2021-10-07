import React, { useEffect, useState } from "react";

//Styles
import "./EditPartner.css";

//Components
import PopupContainer from "../'../../../../../../common/Containers/PopupContainer/PopupContainer";
import swal from "sweetalert";
import { updateOrg } from "../../../../../../api/regOrgApi";

const EditPartner = ({ orgsData, activeOrgId, onClose, getOrgs }) => {
  const [activeOrg, setActiveOrg] = useState({});

  useEffect(() => {
    console.log({ orgsData });

    const actOrg = Object.values(orgsData).find(
      ({ _id }) => _id === activeOrgId
    );

    setActiveOrg(actOrg);
  }, []);

  const displayData = {
    orgName: "Organization Name",
    address: "Address",
    directorName: "Director Name",
    email: "Email",
    firstNumber: "First Number",
    secondNumber: "Second Number",
    domainName: "Domain Name",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActiveOrg((prev) => ({ ...prev, [name]: value }));
  };

  const handleIncrement = (name) => {
    setActiveOrg((prev) => ({ ...prev, [name]: Number(prev[name]) + 500 }));
  };
  const handleDecrement = (name) => {
    if (activeOrg[name] - 500 > 0)
      setActiveOrg((prev) => ({ ...prev, [name]: Number(prev[name]) - 500 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { apiCallsLeft, messagesLeft, _id } = activeOrg;

      const updatedOrg = await updateOrg({ _id, apiCallsLeft, messagesLeft });
      console.log({ updatedOrg });

      onClose();

      await getOrgs("orgs");

      swal({
        title: "Good job!",
        text: "API Plan Updated!",
        icon: "success",
        button: "Exit",
      });
    } catch (error) {
      console.log({ err: error.response });
    }
  };

  return (
    <PopupContainer onClose={onClose}>
      <form className="editPartner" onSubmit={handleSubmit}>
        <h2>Edit Organization</h2>
        <i className="fas fa-times" onClick={onClose}></i>

        <h3>Organization Details</h3>

        <div className="editPartner__grid">
          {Object.keys(activeOrg)
            .filter((key) => Object.keys(displayData).includes(key))
            .map((key) => (
              <div key={key} className="editPartner__grid__item">
                <div className="editPartner__grid__col">
                  {displayData[key]}:
                </div>
                <div className="editPartner__grid__col">{activeOrg[key]}</div>
              </div>
            ))}
        </div>
        <hr />

        <h3>Plan Details</h3>
        <div className="editPartner__grid">
          <div className="editPartner__grid__item">
            <div className="editPartner__grid__col">API Calls Left : </div>
            <div className="editPartner__grid__col editPartner__plan__row ">
              {" "}
              <i
                className="fas fa-minus"
                onClick={() => handleDecrement("apiCallsLeft")}
              ></i>
              <input
                name="apiCallsLeft"
                value={activeOrg.apiCallsLeft}
                type="number"
                onChange={handleChange}
              />
              <i
                className="fas fa-plus"
                onClick={() => handleIncrement("apiCallsLeft")}
              ></i>
            </div>
          </div>
          <div className="editPartner__grid__item">
            <div className="editPartner__grid__col">Messages Left : </div>
            <div className="editPartner__grid__col editPartner__plan__row ">
              {" "}
              <i
                className="fas fa-minus"
                onClick={() => handleDecrement("messagesLeft")}
              ></i>
              <input
                name="messagesLeft"
                value={activeOrg.messagesLeft}
                type="number"
                onChange={handleChange}
              />
              <i
                className="fas fa-plus"
                onClick={() => handleIncrement("messagesLeft")}
              ></i>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </PopupContainer>
  );
};

export default EditPartner;
