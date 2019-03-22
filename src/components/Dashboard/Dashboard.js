import React from "react";
import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";

const Dashboard = props => {
  return <div className="dashboard">Dashboard</div>
  // return !props.state.isLogin ? <Redirect from="/" to="/login" /> : <div className="dashboard">Dashboard</div>;
};

const mapStateToProps = state => ({ state });

export default connect(
  mapStateToProps,
  null
)(Dashboard);
