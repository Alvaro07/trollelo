import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

// Styles
import "./inputText.scss";

/**
 * InputText
 */

const InputText = props => {
  const extra = props.extraClass ? props.extraClass : "";
  const errorClass = props.error ? "c-input-text--error" : "";

  return (
    <div className={`c-input-text ${errorClass} ${extra}`}>
      {props.labelText && (
        <label className="c-input-text__label" htmlFor={props.id}>
          {props.labelText}
        </label>
      )}
      <div className="c-input-text__field">
        {props.icon && (
          <div className="c-input-text__icon">
            <FontAwesomeIcon icon={props.icon} />
          </div>
        )}
        <input
          type={props.type}
          id={props.id}
          placeholder={props.placeholder}
          onKeyUp={props.onKeyUp}
          required={props.required ? "required" : null}
          defaultValue={props.value ? props.value : ""}
        />
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
  value: PropTypes.string,
  onKeyUp: PropTypes.func,
  extraClass: PropTypes.string,
  error: PropTypes.bool,
  icon: PropTypes.string,
  required: PropTypes.bool
};

export default InputText;
