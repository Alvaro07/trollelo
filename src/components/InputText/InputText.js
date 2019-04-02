import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputText = ({ type, id, labelText, placeholder, onKeyUp, extraClass, error, icon, required }) => {
  const extra = extraClass ? extraClass : "";
  const errorClass = error ? "c-input-text--error" : "";

  return (
    <div className={`c-input-text ${errorClass} ${extra}`}>
      {labelText && (
        <label className="c-input-text__label" htmlFor={id}>
          {labelText}
        </label>
      )}
      <div className="c-input-text__field">
        {icon && (
          <div className="c-input-text__icon">
            <FontAwesomeIcon icon={icon} />
          </div>
        )}
        <input type={type} id={id} placeholder={placeholder} onKeyUp={onKeyUp} required={required ? "required" : null} />
      </div>
    </div>
  );
};

export default InputText;
