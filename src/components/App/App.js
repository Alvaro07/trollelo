import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

// Styles
import "./app.scss";

// Components
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import TaskBoard from "../TaskBoard/TaskBoard";

/**
 * App
 */

const App = props => {
  useEffect(() => {
    document.title = "Trollelo";
  }, []);

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/trollelo/login" render={props => <Login {...props} />} />
        <Route exact path="/trollelo/dashboard" render={() => <Dashboard />} />
        <Route path="/trollelo/taskBoard/:board" render={props => <TaskBoard {...props} />} />

        <Redirect from="/" to="/trollelo/login" />
        <Redirect from="/" to={!props.state.isLogin ? "/trollelo/login" : "/trollelo/dashboard"} />

        
        <Redirect from="https://alvaro07.github.io/trollelo/" to="https://alvaro07.github.io/trollelo/" />
        <Redirect from="https://alvaro07.github.io/trollelo/login" to="https://alvaro07.github.io/trollelo/" />
        <Redirect from="https://alvaro07.github.io/trollelo/dashboard" to="https://alvaro07.github.io/trollelo/" />
        <Redirect from="https://alvaro07.github.io/trollelo/taskBoard/:board" to="https://alvaro07.github.io/trollelo/" />

        <Route render={() => <div>Page not found</div>} />
      </Switch>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({ state });

export default connect(
  mapStateToProps,
  null
)(App);
