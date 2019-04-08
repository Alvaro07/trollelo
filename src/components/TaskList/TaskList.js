import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showModal, hideModal, setDataBoard } from "../../redux/reducer";
import { removeTasklist } from "../../firebase/functions/tasklist";
import { createTask } from "../../firebase/functions/task";

// Components
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import Textarea from "../Textarea/Textarea";

// Styles
import "./taskList.scss";

/**
 * TaskList
 */

const TaskList = props => {
  // State para setear el loader del modal
  const [modalLoading, setModalLoading] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    errorMessage: "Complete all the fields",
    isValid: true
  });

  const handleRemove = e => {
    e.preventDefault();
    setModalLoading(true);

    removeTasklist(props.id, props.state.boardData.id).then(data => {
      props.hideModal();
      setModalLoading(false);
      props.setDataBoard({ ...props.state.boardData, tasklists: data });
    });
  };

  const handleCloseNewTask = () => {
    setNewTask({ ...newTask, title: "", description: "", isValid: true });
  };

  const handleCreateNewTask = (e, index) => {
    e.preventDefault();
    setModalLoading(true);

    if (newTask.title.length !== 0 && newTask.description.length !== 0) {
      setModalLoading(true);
      setNewTask({ ...newTask, errorMessage: "" });

      // create task --------
      createTask(
        newTask.title,
        newTask.description,
        props.state.dataUser.user,
        props.state.boardData.id,
        index
      ).then(data => {
        setModalLoading(false);
        props.hideModal();
      });
      // ----------------------
    } else {
      setModalLoading(false);
      setNewTask({ ...newTask, isValid: false });
    }
  };

  return (
    <React.Fragment>
      <div className="c-tasklist" data-id={props.id}>
        <h2 className="c-tasklist__title">{props.name}</h2>
        <span className="c-tasklist__remove" onClick={() => props.showModal(`remove-tasklist-${props.id}`)}>
          <FontAwesomeIcon icon="trash-alt" />
        </span>

        <div className="c-tasklist__tasks">
        
        
        </div>

        <div className="c-tasklist__add-task">
          <span className="c-tasklist__add-task__link" onClick={() => props.showModal(`add-task-${props.id}`)}>
            + Add task
          </span>
        </div>
      </div>
      {props.state.modal === `remove-tasklist-${props.id}` && (
        <Modal>
          <ModalContent modalTitle="Remove task" type="small">
            <form>
              <p className="margin-bottom-20">
                <span className="bold">Are you sure</span> to remove this tasklist?
              </p>
              <Button text="Remove Board" onClick={e => handleRemove(e)} isLoading={modalLoading} />
            </form>
          </ModalContent>
        </Modal>
      )}

      {props.state.modal === `add-task-${props.id}` && (
        <Modal>
          <ModalContent modalTitle="Add new task" type="small" onClose={() => handleCloseNewTask()}>
            <form method="POST">
              <InputText
                type="text"
                id="newTaskTitle"
                placeholder="Task title"
                icon="columns"
                extraClass="margin-bottom-10"
                onKeyUp={e => setNewTask({ ...newTask, title: e.target.value })}
                error={newTask.isValid === false && !newTask.title.length ? true : false}
                required={true}
              />

              <Textarea
                placeholder="Description"
                noResize={true}
                extraClass="margin-bottom-20"
                onKeyUp={e => setNewTask({ ...newTask, description: e.target.value })}
                error={newTask.isValid === false && !newTask.description.length ? true : false}
                required={true}
              />

              <Button
                text="Create new task"
                onClick={e => handleCreateNewTask(e, props.id)}
                submit={true}
                isLoading={modalLoading}
              />
              {newTask.isValid === false && <p className="color-orange bold padding-top-20">{newTask.errorMessage}</p>}
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

TaskList.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
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
)(TaskList);
