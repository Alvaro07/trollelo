import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";

const Login = () => {
  return (
    <section className="login-wrap">
      <header className="login-wrap__header">
        <h1 className="login-wrap__header__brand">Trolello</h1>
      </header>

      <main className="login">
        <form className="login__form">
          <h2 className="login__title">
            <FontAwesomeIcon icon="street-view" className="color-dark-blue" /> Sign in
          </h2>
          <InputText
            type="text"
            id="signInUser"
            labelText="User"
            placeholder="type your user..."
            extraClass="margin-bottom-30"
          />
          <InputText
            type="password"
            id="signInPassword"
            labelText="Password"
            placeholder="enter your password..."
            extraClass="margin-bottom-20"
          />
          <Button text="Log in" />
        </form>
        <form className="login__form">
          <h2 className="login__title">
            <FontAwesomeIcon icon="motorcycle" className="color-dark-blue" /> Register
          </h2>
          <InputText
            type="text"
            id="registerUser"
            labelText="User"
            placeholder="type your user..."
            extraClass="margin-bottom-30"
          />
          <InputText
            type="email"
            id="registerEmail"
            labelText="Email"
            placeholder="type your email..."
            extraClass="margin-bottom-30"
          />
          <InputText
            type="password"
            id="registerPassword"
            labelText="Password"
            placeholder="enter your new password..."
            extraClass="margin-bottom-20"
          />
          <Button text="Register" />
        </form>
      </main>
    </section>
  );
};

export default Login;
