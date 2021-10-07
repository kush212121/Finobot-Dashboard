import React, { useState } from "react";

import "./AgentCard.css";

const AgentCard = ({
  agentId,
  agentName,
  agentEmail,
  saveAgent,
  delAgent,
  upAgent,
  isAdd,
}) => {
  const initFormState = {
    name: agentName || "",
    email: agentEmail || "",
    password: "",
  };

  const [form, setForm] = useState(initFormState);

  const { name, email, password } = form;

  const [focus, setFocus] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [isPassHidden, setIsPassHidden] = useState(true);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="agentCard">
      <div className="agentCard__row">
        <img
          src={`https://ui-avatars.com/api/?format=svg&background=random&name=${
            name || "John Doe"
          }`}
          alt={name}
        />

        {/* <div className="agentCard__info">
          <div className="agentCard__name">{name}</div>
          <a href="mailto:a4748g@gmail.com" className="agentCard__email">
            a4748g@gmail.com
          </a>
        </div> */}

        <div className="agentCard__info">
          <div className="agentCard__input">
            <input
              type="text"
              value={name}
              placeholder={`${isAdd ? "New " : ""}Agent Name`}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="agentCard__input">
            <input
              type="text"
              value={email}
              placeholder={`${isAdd ? "New " : ""}Agent Email`}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="agentCard__input">
            <input
              type={isPassHidden ? "password" : "text"}
              value={password}
              placeholder="New Password"
              name="password"
              onChange={handleChange}
            />
            <i
              className={`fas fa-eye${isPassHidden ? "-slash" : ""}`}
              onClick={() => setIsPassHidden((prev) => !prev)}
            ></i>
          </div>
        </div>
      </div>

      <div className="agentCard__row">
        <div
          className="btn btn-primary"
          onClick={() => {
            if (isAdd) saveAgent(form);
            else upAgent(agentId, form);
            setForm(initFormState);
          }}
        >
          Save{" "}
        </div>
        {!isAdd && (
          <div className="btn btn-danger" onClick={() => delAgent(agentId)}>
            Delete
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentCard;
