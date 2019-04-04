import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Button = ({ text, variant, size, extraClass, onClick, icon, submit }) => {
  const extra = extraClass ? extraClass : "";
  const variantClass = !variant ? "" : variant === "secondary" ? "c-button--secondary" : variant === "terciary" ? "c-button--terciary" : "";
  const sizeClass = !size ? "" : size === "small" ? "c-button--small" : "";
  const iconElement = icon ? <FontAwesomeIcon icon={icon} className="c-button__icon" /> : "";

  return (
    <button className={`c-button ${variantClass} ${sizeClass} ${extra}`} onClick={onClick} type={submit ? "submit" : null}>
      {iconElement}
      {text}
    </button>
  );
};

/**
 * PropTypes
 */

Button.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["secondary", "terciary"]),
  size: PropTypes.oneOf(["small"]),
  onClick: PropTypes.func,
  icon: PropTypes.string,
  submit: PropTypes.bool
};

export default Button;
