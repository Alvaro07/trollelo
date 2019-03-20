import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputText from "../InputText/InputText";

const Login = () => {
  return (
    <section className="login-wrap">
      <header className="login-wrap__header">
        <h1 className="login-wrap__header__brand">
          {/* <FontAwesomeIcon icon="carrot" /> Trolello */}
          Trolello
        </h1>
      </header>

      <main className="login">
        <form className="login__form">
          <h2 className="login__title">Sign In</h2>
          <InputText type="text" id="signInUser" labelText="User" placeholder="type your user..." extraClass="margin-bottom-30"/>
          <InputText type="password" id="signInPassword" labelText="Password" placeholder="enter your password..." />
        </form>
        <form className="login__form">
          <h2 className="login__title">Register</h2>
          <InputText type="text" id="registerUser" labelText="User" placeholder="type your user..." extraClass="margin-bottom-30"/>
          <InputText type="email" id="registerEmail" labelText="Email" placeholder="type your email..." extraClass="margin-bottom-30" />
          <InputText type="password" id="registerPassword" labelText="Password" placeholder="enter your new password..." />
        </form>
      </main>
    </section>
  );
};

export default Login;
