import React from "react";
import PropTypes from "prop-types";

const Textarea = ({ extraClass, noResize, placeholder, onKeyUp, error }) => {
  const noResizeClass = noResize ? "c-textarea--no-resize" : "";
  const extra = extraClass ? extraClass : "";
  const errorClass = error ? "c-textarea--error" : "";

  return <textarea className={`c-textarea ${errorClass} ${noResizeClass} ${extra}`} placeholder={placeholder} onKeyUp={onKeyUp} />;
};

/**
 * PropTypes
 */

Textarea.propTypes = {
  extraClass: PropTypes.string,
  placeholder: PropTypes.string,
  onKeyUp: PropTypes.func,
  noResize: PropTypes.bool,
  error: PropTypes.bool
};

export default Textarea;
