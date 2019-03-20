import React from "react";

const Button = ({ text, extraClass, onClick, type }) => {
  const extra = extraClass ? extraClass : "";
  const typeClass = !type ? "" : type === "secondary" ? "c-button--secondary" : null;

  return (
    <button className={`c-button ${typeClass} ${extra}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
