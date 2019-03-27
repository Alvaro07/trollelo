import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Header from "../Header/Header";
import Button from "../Button/Button";

const Dashboard = props => {
  if (!props.state.isLogin) {
    return <Redirect from="/" to="/login" />;
  } else {
    return (
      <div className="dashboard">
        <Header />
        <div className="dashboard__table">
          <Button type="primary" text="New Board" iconClass="columns" />
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({ state });

export default connect(
  mapStateToProps,
  null
)(Dashboard);
