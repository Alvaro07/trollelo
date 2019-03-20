import React, { useState } from "react";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";

const Login = () => {
  const [userLogin, setUserLogin] = useState("");
  const [passLogin, setPassLogin] = useState("");
  const [validationLogin, setValidationLogin] = useState({ isValid: true, message: "Complete all the fields" });

  const [userRegister, setUserRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passRegister, setPassRegister] = useState("");
  const [validationRegister, setValidationRegister] = useState({ isValid: true, message: "Complete all the fields" });

  const handleLogin = e => {
    e.preventDefault();
    if (!userLogin.length || !passLogin.length) {
      setValidationLogin({ ...validationLogin, isValid: false });
    } else {
      setValidationLogin({ ...validationLogin, isValid: true });
    }
  };

  const handleRegister = e => {
    e.preventDefault();
    if (!userRegister.length || !emailRegister.length || !passRegister.length) {
      setValidationRegister({ ...validationRegister, isValid: false });
    } else {
      setValidationRegister({ ...validationRegister, isValid: true });
    }
  };


  return (
    <section className="login-wrap">
      <header className="login-wrap__header">
        <h1 className="login-wrap__header__brand">Trolello</h1>
      </header>

      <main className="login">
        <form className="login__form">
          <h2 className="login__title">Sign in</h2>
          <InputText
            type="text"
            id="signInUser"
            labelText="User"
            placeholder="type your user..."
            extraClass="margin-bottom-30"
            onKeyUp={e => setUserLogin(e.target.value)}
            error={validationLogin.isValid === false && userLogin.length === 0 ? true : false}
          />
          <InputText
            type="password"
            id="signInPassword"
            labelText="Password"
            placeholder="enter your password..."
            extraClass="margin-bottom-20"
            onKeyUp={e => setPassLogin(e.target.value)}
            error={validationLogin.isValid === false && passLogin.length === 0 ? true : false}
          />

          <Button text="Log in" onClick={e => handleLogin(e)} />

          {validationLogin.isValid === false && <p className="color-orange bold padding-top-20">{validationLogin.message}</p>}
        </form>
        <form className="login__form">
          <h2 className="login__title">Register</h2>
          <InputText
            type="text"
            id="registerUser"
            labelText="User"
            placeholder="type your user..."
            extraClass="margin-bottom-30"
            onKeyUp={e => setUserRegister(e.target.value)}
            error={validationRegister.isValid === false && userRegister.length === 0 ? true : false}
          />
          <InputText
            type="email"
            id="registerEmail"
            labelText="Email"
            placeholder="type your email..."
            extraClass="margin-bottom-30"
            onKeyUp={e => setEmailRegister(e.target.value)}
            error={validationRegister.isValid === false && emailRegister.length === 0 ? true : false}
          />
          <InputText
            type="password"
            id="registerPassword"
            labelText="Password"
            placeholder="enter your new password..."
            extraClass="margin-bottom-20"
            onKeyUp={e => setPassRegister(e.target.value)}
            error={validationRegister.isValid === false && passRegister.length === 0 ? true : false}
          />
          <Button text="Register" type="secondary" onClick={e => handleRegister(e)} />

          {validationRegister.isValid === false && <p className="color-orange bold padding-top-20">{validationRegister.message}</p>}
        </form>
      </main>
    </section>
  );
};

export default Login;
