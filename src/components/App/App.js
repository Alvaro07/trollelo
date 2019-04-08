import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

// Styles
import './app.scss';

// Components
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import TaskBoard from "../TaskBoard/TaskBoard";

/**
 * App
 */

const App = props => {

  useEffect(()=> {
    document.title = 'Trollelo'
  }, [])

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/login" render={props => <Login {...props}/>} />
        <Route exact path="/dashboard" render={() => <Dashboard />} />
        <Route path="/taskBoard/:board" render={props => <TaskBoard {...props} />} />

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
