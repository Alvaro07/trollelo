import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

// Styles
import './inputText.scss';

/**
 * InputText
 */

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

/**
 * PropTypes
 */

InputText.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  onKeyUp: PropTypes.func,
  extraClass: PropTypes.string,
  error: PropTypes.bool,
  icon: PropTypes.string,
  required: PropTypes.bool
};

export default InputText;
