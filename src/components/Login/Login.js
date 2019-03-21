import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import InputText from "../InputText/InputText";
import Button from "../Button/Button";

const Login = props => {
  /**
   * Component State
   */

  const [dataLogin, setDataLogin] = useState({
    user: "",
    password: "",
    isValid: true,
    errorMessage: "Complete all the fields to login"
  });

  const [dataRegister, setDataRegister] = useState({
    user: "",
    email: "",
    password: "",
    isValid: true,
    errorMessage: "The register is not complete"
  });

  const [shake, setShake] = useState(false);

  /**
   * Effect
   */

  useEffect(() => {
    setTimeout(() => {
      setShake(false);
    }, 500);
  }, [shake]);

  /**
   * Handle functions
   */

  const handleLogin = e => {
    e.preventDefault();
    if (!dataLogin.user.length || !dataLogin.password.length) {
      setDataLogin({ ...dataLogin, isValid: false });
      setShake(true);
    } else {
      setDataLogin({ ...dataLogin, isValid: true });
    }
  };

  const handleRegister = e => {
    e.preventDefault();
    if (!dataRegister.user.length || !dataRegister.email.length || !dataRegister.password.length) {
      setDataRegister({ ...dataRegister, isValid: false });
      setShake(true);
    } else {
      setDataRegister({ ...dataRegister, isValid: true });
    }
  };

  return props.state.isLogin ? (
    <Redirect from="/" to="/dashboard" />
  ) : (
    <section className="login-wrap">
      <header className="login-wrap__header">
        <h1 className="login-wrap__header__brand">Trolello</h1>
      </header>

      <main className={`login ${shake === true ? "login--shake" : ""}`}>
        <form className="login__form">
          <h2 className="login__title">Sign in</h2>
          <InputText
            type="text"
            id="signInUser"
            labelText="User"
            placeholder="type your user..."
            extraClass="margin-bottom-20"
            onKeyUp={e => setDataLogin({ ...dataLogin, user: e.target.value })}
            error={dataLogin.isValid === false && dataLogin.user.length === 0 ? true : false}
          />
          <InputText
            type="password"
            id="signInPassword"
            labelText="Password"
            placeholder="enter your password..."
            extraClass="margin-bottom-30"
            onKeyUp={e => setDataLogin({ ...dataLogin, password: e.target.value })}
            error={dataLogin.isValid === false && dataLogin.password.length === 0 ? true : false}
          />

          <Button text="Log in" onClick={e => handleLogin(e)} />

          {dataLogin.isValid === false && <p className="color-orange bold padding-top-20">{dataLogin.errorMessage}</p>}
        </form>
        <form className="login__form">
          <h2 className="login__title">Register</h2>
          <InputText
            type="text"
            id="registerUser"
            labelText="User"
            placeholder="type your user..."
            extraClass="margin-bottom-20"
            onKeyUp={e => setDataRegister({ ...dataRegister, user: e.target.value })}
            error={dataRegister.isValid === false && dataRegister.user.length === 0 ? true : false}
          />
          <InputText
            type="email"
            id="registerEmail"
            labelText="Email"
            placeholder="type your email..."
            extraClass="margin-bottom-20"
            onKeyUp={e => setDataRegister({ ...dataRegister, email: e.target.value })}
            error={dataRegister.isValid === false && dataRegister.email.length === 0 ? true : false}
          />
          <InputText
            type="password"
            id="registerPassword"
            labelText="Password"
            placeholder="enter your new password..."
            extraClass="margin-bottom-30"
            onKeyUp={e => setDataRegister({ ...dataRegister, password: e.target.value })}
            error={dataRegister.isValid === false && dataRegister.password.length === 0 ? true : false}
          />
          <Button text="Register" type="secondary" onClick={e => handleRegister(e)} />

          {dataRegister.isValid === false && (
            <p className="color-orange bold padding-top-20">{dataRegister.errorMessage}</p>
          )}
        </form>
      </main>
    </section>
  );
};

const mapStateToProps = state => ({ state });

export default connect(
  mapStateToProps,
  null
)(Login);
