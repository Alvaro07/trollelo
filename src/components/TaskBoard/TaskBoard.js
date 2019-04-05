import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getBoard } from "../../firebase/functions/board";
import { createTasklist } from "../../firebase/functions/tasklist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showModal, hideModal } from "../../redux/reducer";

// Components
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import InputText from "../InputText/InputText";
import TaskList from "../TaskList/TaskList";

const TaskBoard = props => {
  /**
   * Local State
   */

  // estado local del board en el que estamos
  const [board, setBoard] = useState({
    name: null,
    description: null,
    id: null,
    owner: null,
    tasklists: []
  });

  // estado local del task list a crear
  const [taskList, setTaskList] = useState({
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
        setBoard({
          description: data.description,
          id: data.id,
          name: data.name,
          owner: data.owner,
          tasklists: data.tasklists
        });
        setLoad(false);
      });
    }
  }, []);

  /**
   * Creamos/cerramos el modal de crear task list
   */

  const handleCreateTaskList = e => {
    e.preventDefault();

    if (taskList.name.length !== 0) {
      setModalLoading(true);
      setTaskList({ ...taskList, errorMessage: "" });

      // Create taskList
      createTasklist(props.state.dataUser.user, board.id, taskList.name).then(data => {
        setBoard({ ...board, tasklists: [...board.tasklists, data] });
        setModalLoading(false);
        props.hideModal();
      });
    } else {
      setModalLoading(false);
      setTaskList({ ...taskList, isValid: false });
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
                <h2>Board: {board.name}</h2>
                <span className="subheader__title__user">Owner: {board.owner}</span>
              </div>
            </div>
            <div className="subheader__actions">
              <Button text="New Task List" onClick={() => props.showModal("new-task-list")} />
            </div>
          </header>

          <section className="taskboard__table">
            <div className="taskboard__table__scroll-wrap">
              {board.tasklists && board.tasklists.map((e, i) => <TaskList key={i} name={e.title} />)}
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
                    onKeyUp={e => setTaskList({ ...taskList, name: e.target.value })}
                    error={taskList.isValid === false && !taskList.name.length ? true : false}
                    required={true}
                  />

                  <Button text="Create Task list" onClick={e => handleCreateTaskList(e)} submit={true} isLoading={modalLoading} />
                  {taskList.isValid === false && <p className="color-orange bold padding-top-20">{taskList.errorMessage}</p>}
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
  hideModal: () => dispatch(hideModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskBoard);
