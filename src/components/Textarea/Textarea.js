import React from "react";

const Textarea = ({ extraClass, noResize, placeholder, onKeyUp, error }) => {
  const noResizeClass = noResize ? "c-textarea--no-resize" : "";
  const extra = extraClass ? extraClass : "";
  const errorClass = error ? "c-textarea--error" : "";

  return <textarea className={`c-textarea ${errorClass} ${noResizeClass} ${extra}`} placeholder={placeholder} onKeyUp={onKeyUp} />;
};

export default Textarea;
