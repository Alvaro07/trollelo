import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";

const App = props => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/dashboard" render={() => <Dashboard />} />
        <Route exact path="/login" render={() => <Login />} />

        <Redirect from="/" to={!props.state.isLogin ? "/login" : "dashboard"} />
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
