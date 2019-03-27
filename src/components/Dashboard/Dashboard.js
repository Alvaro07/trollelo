import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Dashboard = props => {
  if (!props.state.isLogin) {
    return <Redirect from="/" to="/login" />;
  } else {
    return <div className="dashboard">Dashboard</div>;
  }
};

const mapStateToProps = state => ({ state });

export default connect(
  mapStateToProps,
  null
)(Dashboard);
