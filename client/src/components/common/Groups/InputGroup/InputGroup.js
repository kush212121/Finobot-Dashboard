import React from "react";

//Components
import Input from "../../Input/Input";

// Styles
import "./InputGroup.css";

const InputGroup = (props) => {
  return (
    <div className="inputGroup">
      <label htmlFor={props.name}>{props.label}</label> <br />
      {props.type === "select" ? (
        <select name={props.name} onChange={props.onChange}>
          {props.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <Input {...props} />
      )}
    </div>
  );
};

export default InputGroup;
