import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getBoard } from "../../firebase/functions/board";

// Components
import Header from "../Header/Header";
import Loader from "../Loader/Loader";

const TaskBoard = props => {
  /**
   * Local State
   */

  const [board, setBoard] = useState({
    name: null,
    description: null,
    id: null,
    owner: null
  });

  const [isLoading, setLoad] = useState(true);

  useEffect(() => {
    if (props.state.isLogin) {
      getBoard(props.match.params.board).then(data => {
        setBoard({ description: data.description, id: data.id, name: data.name, owner: data.owner });
        setLoad(false);
      });
    }
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
        <Header {...props} />
        <main className="taskboard">
          <header className="taskboard__header">
            <div className="taskboard__header__title">
              <h2>{board.name}</h2>
              <span className="taskboard__header__user">{board.owner}</span>
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
