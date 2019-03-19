import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  return (
    <section className="login-wrap">
      <header className="login-wrap__header">
        <h2 className="login-wrap__header__brand"><FontAwesomeIcon icon="carrot" /> Trolello</h2>
      </header>

      <main className="login">Login</main>
    </section>
  );
};

export default Login;
