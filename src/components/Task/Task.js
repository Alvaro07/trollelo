import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showModal, hideModal, setDataBoard } from "../../redux/reducer";
import { updateTask, removeTask } from "../../firebase/functions/task";

// Components
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import Textarea from "../Textarea/Textarea";

// Styles
import "./task.scss";

/**
 * Button
 */

const Task = props => {
  // State para setear el loader del modal
  const [modalLoading, setModalLoading] = useState(false);
  const [modalRemoveLoading, setModalRemoveLoading] = useState(false);
  const [task, setTask] = useState({
    title: props.state.boardData.tasklists[props.idTaskList].tasks[props.idTask].title,
    description: props.state.boardData.tasklists[props.idTaskList].tasks[props.idTask].description,
    errorMessage: "Complete the title field",
    isValid: true
  });

  /**
   * Update task
   */

  const handleUpdateTask = e => {
    e.preventDefault();
    setModalLoading(true);

    if (task.title.length) {
      setModalLoading(true);

      updateTask(
        task.title,
        task.description,
        props.state.dataUser.user,
        props.state.boardData.id,
        props.idTaskList,
        props.idTask
      ).then(data => {
        props.setDataBoard(data);
        setModalLoading(false);
        setTask({ ...task, title: "", description: "", isValid: true });
        props.hideModal();
      });
    } else {
      setModalLoading(false);
      setTask({ ...task, isValid: false });
    }
  };

  /**
   * Remove task
   */

  const handleRemoveTask = e => {
    e.preventDefault();
    setModalRemoveLoading(true);

    removeTask(
      task.title,
      task.description,
      props.state.dataUser.user,
      props.state.boardData.id,
      props.idTaskList,
      props.idTask
    ).then(data => {
      props.setDataBoard(data);
      setModalRemoveLoading(false);
      props.hideModal();
    });
  };

  return (
    <React.Fragment>
      <div className="c-task">
        <h3 className="c-task__title" onClick={() => props.showModal(`task-${props.idTask}${props.idTaskList}`)}>
          {props.title}
        </h3>
      </div>

      {/* ------------------
       Modal edit tasklist */}

      {props.state.modal === `task-${props.idTask}${props.idTaskList}` && (
        <Modal>
          <ModalContent modalTitle="Edit task">
            <form method="POST">
              <InputText
                type="text"
                id="taskTitle"
                labelText="Title:"
                icon="columns"
                extraClass="margin-bottom-20"
                onKeyUp={e => setTask({ ...task, title: e.target.value })}
                error={task.isValid === false && !task.title.length ? true : false}
                required={true}
                value={props.state.boardData.tasklists[props.idTaskList].tasks[props.idTask].title}
              />

              <Textarea
                labelText="Description:"
                noResize={true}
                extraClass="margin-bottom-20"
                onKeyUp={e => setTask({ ...task, description: e.target.value })}
                value={props.state.boardData.tasklists[props.idTaskList].tasks[props.idTask].description}
              />

              <Button text="Update task" onClick={e => handleUpdateTask(e)} submit={true} isLoading={modalLoading} />
              <Button
                text="Remove task"
                extraClass="margin-left-10"
                onClick={e => handleRemoveTask(e)}
                secondary
                isLoading={modalRemoveLoading}
              />
              {task.isValid === false && <p className="color-orange bold padding-top-20">{task.errorMessage}</p>}
            </form>
          </ModalContent>
        </Modal>
      )}
    </React.Fragment>
  );
};

/**
 * PropTypes
 */

Task.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  idTask: PropTypes.number,
  idTaskList: PropTypes.number
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
)(Task);
