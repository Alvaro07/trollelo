import React from "react";
import PropTypes from "prop-types";

// Styles
import "./textarea.scss";

/**
 * Textarea
 */

const Textarea = props => {
  const noResizeClass = props.noResize ? "c-textarea--no-resize" : "";
  const extra = props.extraClass ? props.extraClass : "";
  const errorClass = props.error ? "c-textarea--error" : "";

  return (
    <div className="c-textarea">
      {props.labelText && (
        <label className="c-textarea__label" htmlFor={props.id}>
          {props.labelText}
        </label>
      )}
      <textarea
        className={`c-textarea__field ${errorClass} ${noResizeClass} ${extra}`}
        placeholder={props.placeholder}
        onKeyUp={props.onKeyUp}
        defaultValue={props.value ? props.value : ""}
      />
    </div>
  );
};

/**
 * PropTypes
 */

Textarea.propTypes = {
  extraClass: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onKeyUp: PropTypes.func,
  noResize: PropTypes.bool,
  error: PropTypes.bool
};

export default Textarea;
