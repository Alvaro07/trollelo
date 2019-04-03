import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// Components
import Header from "../Header/Header";
import Loader from "../Loader/Loader";

const TaskBoard = props => {
  /**
   * Local State
   */

  const [isLoading, setLoad] = useState(true);

  useEffect(() => {
    setLoad(false);
  }, []);

  if (!props.state.isLogin) {
    return <Redirect from="/" to="/login" />;
  } else if (isLoading) {
    return (
      <React.Fragment>
        <Header />
        <Loader />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Header />
        <main className="taskboard">
          <header className="taskboard__header">
            <div className="taskboard__header__title">
              <h2>The Board's name</h2>
              <span className="taskboard__header__user">Owner: {props.state.dataUser.user}</span>
            </div>
          </header>
        </main>
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => ({ state });
// const mapDispatchToProps = dispatch => ({
//   showModal: modal => dispatch(showModal(modal)),
//   hideModal: () => dispatch(hideModal()),
//   setBoards: boards => dispatch(setBoards(boards))
// });

export default connect(
  mapStateToProps,
  null
)(TaskBoard);
