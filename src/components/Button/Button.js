import React from "react";

const Button = ({ text, extraClass, onClick }) => {
  return (
    <button className={`c-button ${extraClass}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
