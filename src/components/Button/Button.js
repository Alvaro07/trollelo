import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

// Styles
import './button.scss';

/**
 * Button
 */

const Button = ({ text, secondary, terciary, size, extraClass, onClick, icon, submit, isLoading }) => {
  const extra = extraClass ? extraClass : "";

  const secondaryClass = secondary ? "c-button--secondary" : "";
  const terciaryClass = terciary ? "c-button--terciary" : "";
  const sizeClass = !size ? "" : size === "small" ? "c-button--small" : "";
  const iconElement = icon ? <FontAwesomeIcon icon={icon} className="c-button__icon" /> : "";

  return (
    <button
      className={`c-button ${secondaryClass} ${terciaryClass} ${isLoading ? "c-button--loading" : ""} ${sizeClass} ${extra}`}
      onClick={onClick}
      type={submit ? "submit" : null}>
      {!isLoading && iconElement}
      {isLoading ? <FontAwesomeIcon icon="spinner" className="c-button__load-icon" /> : null}
      {isLoading ? "Loading" : text}
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
  submit: PropTypes.bool,
  isLoading: PropTypes.bool
};

export default Button;
