import React from "react";

const InputText = ({ type, id, labelText, placeholder, onKeyUp, extraClass, error }) => {
  const extra = extraClass ? extraClass : "";
  const errorClass = error ? 'c-input-text--error' : "";

  return (
    <div className={`c-input-text ${errorClass} ${extra}`}>
      <label className="c-input-text__label" htmlFor={id}>
        {labelText}
      </label>
      <input className="c-input-text__field" type={type} id={id} placeholder={placeholder} onKeyUp={onKeyUp} />
    </div>
  );
};

export default InputText;
