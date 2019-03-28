import React from "react";

const Textarea = ({ extraClass, noResize, placeholder }) => {
  const noResizeClass = noResize ? "c-textarea--no-resize" : "";
  const extra = extraClass ? extraClass : "";


  return <textarea className={`c-textarea ${noResizeClass} ${extra}`} placeholder={placeholder} />;
};

export default Textarea;
