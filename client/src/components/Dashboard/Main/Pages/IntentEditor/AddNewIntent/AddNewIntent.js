import React, { useState } from "react";

//Stykles
import "./AddNewIntent.css";

//mATui
import { TextField } from "@material-ui/core";

//Components
import PopupContainer from "../../../../../common/Containers/PopupContainer/PopupContainer";
import { createCustomIntent } from "../../../../../../api/regOrgApi";
import swal from "sweetalert";

const AddNewIntent = ({ onClose, fetchIntents, isMultiActive }) => {
  const [form, setForm] = useState({
    intentName: "",
    responses: ["Contact Customer Care"],
    isMulti: isMultiActive,
    isCustom: true,
  });

  const [newResponse, setNewResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await createCustomIntent(form);
      console.log({ res });
      onClose();
      swal({
        title: "Good job!",
        text: "Intent Requested!",
        icon: "success",
        button: "Exit",
      });
      fetchIntents();
    } catch (error) {
      console.log({ err: error.response });
    }
  };

  return (
    <PopupContainer onClose={onClose}>
      <div className="addNewIntent">
        <i className="fas fa-times" onClick={onClose}></i>

        <h2 className="addNewIntent__heading">
          Add New Intent
          {isMultiActive ? (
            <span className="badge badge-success">multi</span>
          ) : (
            <span className="badge badge-primary">single</span>
          )}
        </h2>
        <br />
        <TextField
          name="intentName"
          value={form.intentName}
          label="Intent Name"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, intentName: e.target.value }))
          }
          type="text"
          style={{ width: "100%" }}
        />

        <TextField
          name="intentName"
          value={newResponse}
          label="Add New Response"
          onChange={(e) => setNewResponse(e.target.value)}
          type="text"
          style={{ width: "100%" }}
        />

        <button
          className="btn btn-primary add-btn"
          onClick={() => {
            newResponse &&
              !form.responses.includes(newResponse) &&
              form.responses.length < 5 &&
              setForm((prev) => ({
                ...prev,
                responses: [...prev.responses, newResponse],
              }));
            setNewResponse("");
          }}
        >
          Add Response
        </button>

        <h3>Responses</h3>

        {form.responses.map((response, i) => (
          <div className="addNewIntent__response">
            <span className="intent__num">{i + 1}</span>
            <span className="addNewIntent__response__text">{response}</span>
            <span
              className="fas fa-trash"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  responses: [
                    ...prev.responses.filter((item) => item !== response),
                  ],
                }))
              }
            ></span>
          </div>
        ))}

        <button className="btn btn-primary save-btn" onClick={handleSubmit}>
          Save Intent
        </button>
      </div>
    </PopupContainer>
  );
};

export default AddNewIntent;
