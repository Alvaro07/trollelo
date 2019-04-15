import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getBoard } from "../../firebase/functions/board";
import { createTasklist } from "../../firebase/functions/tasklist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showModal, hideModal, setDataBoard } from "../../redux/reducer";

// Components
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import InputText from "../InputText/InputText";
import TaskList from "../TaskList/TaskList";

// Styles
import "./taskBoard.scss";

/**
 * TaskBoard
 */

const TaskBoard = props => {
  /**
   * Local State
   */

  // estado local del task list a crear
  const [newTaskList, setNewTasklist] = useState({
    name: "",
    errorMessage: "Complete all the fields",
    isValid: true
  });

  // Loaders de la sección y del modal
  const [isLoading, setLoad] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);

  /**
   * Init component
   */

  useEffect(() => {
    if (props.state.isLogin) {
      getBoard(props.match.params.board).then(data => {
        props.setDataBoard(data);

        setLoad(false);
      });
    }
  }, []);

  /**
   * Creamos/cerramos el modal de crear task list
   */

  const handleCreateTaskList = e => {
    e.preventDefault();

    if (newTaskList.name.length !== 0) {
      setModalLoading(true);
      setNewTasklist({ ...newTaskList, errorMessage: "" });

      // Create taskList
      createTasklist(props.state.dataUser.user, props.state.boardData.id, newTaskList.name).then(data => {
        props.setDataBoard({ ...props.state.boardData, tasklists: [...props.state.boardData.tasklists, data] });
        setModalLoading(false);
        props.hideModal();
      });
    } else {
      setModalLoading(false);
      setNewTasklist({ ...newTaskList, isValid: false });
    }
  };

  /**
   * Render
   */

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
          <header className="subheader">
            <div className="subheader__content">
              <span className="subheader__icon">
                <FontAwesomeIcon icon="pencil-alt" />
              </span>

              <div className="subheader__title">
                <h2>Board: {props.state.boardData.name}</h2>
                <span className="subheader__title__user">Owner: {props.state.boardData.owner}</span>
              </div>
            </div>
            <div className="subheader__actions">
              <Button text="New Task List" onClick={() => props.showModal("new-task-list")} />
            </div>
          </header>

          <section className="taskboard__table">
            <div className="taskboard__table__scroll-wrap">
              {props.state.boardData.tasklists &&
                props.state.boardData.tasklists.map((e, i) => <TaskList key={i} id={i} name={e.title} />)}
            </div>
          </section>

          {props.state.modal === "new-task-list" && (
            <Modal>
              <ModalContent modalTitle="Add new task list" type="small">
                <form method="POST">
                  <InputText
                    type="text"
                    id="newTaskListName"
                    placeholder="Task list Name"
                    icon="pencil-alt"
                    extraClass="margin-bottom-20"
                    onKeyUp={e => setNewTasklist({ ...newTaskList, name: e.target.value })}
                    error={newTaskList.isValid === false && !newTaskList.name.length ? true : false}
                    required={true}
                  />

                  <Button text="Create Task list" onClick={e => handleCreateTaskList(e)}  isLoading={modalLoading} />
                  {newTaskList.isValid === false && (
                    <p className="color-orange bold padding-top-20">{newTaskList.errorMessage}</p>
                  )}
                </form>
              </ModalContent>
            </Modal>
          )}
        </main>
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => ({
  showModal: modal => dispatch(showModal(modal)),
  hideModal: () => dispatch(hideModal()),
  setDataBoard: data => dispatch(setDataBoard(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskBoard);
