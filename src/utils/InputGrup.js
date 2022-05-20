import React from "react";

const InputGroup = ({ name, changeID, locations }) => {
  return (
    <div className="input-froup mb-3">
      <select onChange={(e) => changeID(e.target.value)} className="form-select" id={name}>
        <option defaultValue value="1">
          Choose..
        </option>
        {locations.map((x) => {
          return (
            <option value={x} key={x}>
              {x}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default InputGroup;
