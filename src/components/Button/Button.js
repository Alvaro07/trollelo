import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ text, type, size, extraClass, onClick, icon }) => {
  const extra = extraClass ? extraClass : "";
  const typeClass = !type ? "" : type === "secondary" ? "c-button--secondary" : type === "terciary" ? "c-button--terciary" : "";
  const sizeClass = !size ? "" : size === "small" ? "c-button--small" : "";
  const iconElement = icon ? <FontAwesomeIcon icon={icon} className="c-button__icon" /> : "";

  return (
    <button className={`c-button ${typeClass} ${sizeClass} ${extra}`} onClick={onClick}>
      {iconElement}
      {text}
    </button>
  );
};

export default Button;
