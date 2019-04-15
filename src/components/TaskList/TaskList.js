import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showModal, hideModal, setDataBoard } from "../../redux/reducer";
import { removeTasklist } from "../../firebase/functions/tasklist";
import { createTask } from "../../firebase/functions/task";
import { splitString } from "../../utils/utilsFunctions";

// Components
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import Textarea from "../Textarea/Textarea";
import Task from "../Task/Task";

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
    errorMessage: "Complete the title field",
    isValid: true,
    picture: null
  });

  /**
   * Remove task
   */

  const handleRemove = e => {
    e.preventDefault();
    setModalLoading(true);

    removeTasklist(props.id, props.state.boardData.id).then(data => {
      props.hideModal();
      setModalLoading(false);
      props.setDataBoard({ ...props.state.boardData, tasklists: data });
    });
  };

  /**
   * Close task
   */

  const handleCloseNewTask = () => {
    setNewTask({ ...newTask, title: "", description: "", isValid: true });
  };

  /**
   * Update tasks
   */

  

  /**
   * Create new task
   */

  const handleCreateNewTask = (e, index) => {
    e.preventDefault();
    setModalLoading(true);

    if (newTask.title.length) {
      setModalLoading(true);
      setNewTask({ ...newTask, errorMessage: "" });

      // Creamos la tarea en firestore
      createTask(
        newTask.title,
        newTask.description,
        newTask.picture,
        props.state.dataUser.user,
        props.state.boardData.id,
        index
      ).then(data => {
        props.setDataBoard(data);
        setModalLoading(false);
        setNewTask({ ...newTask, title: "", description: "", isValid: true, picture: null });
        props.hideModal();
      });
    } else {
      setModalLoading(false);
      setNewTask({ ...newTask, isValid: false });
    }
  };

  /**
   * Uplaod image
   */

  const handleUpload = e => {
    const file = e.target.files[0];
    if (file.type === "image/png" || file.type === "image/jpeg") {
      const reader = new FileReader();
      reader.onloadend = () => setNewTask({ ...newTask, picture: file });
      reader.readAsDataURL(file);
    } else {
      setNewTask({ ...newTask, errorMessage: "Invalid file format" });
    }
  };

  return (
    <React.Fragment>
      <section className="c-tasklist" data-id={props.id}>
        <header className="c-tasklist__header">
          <h2 className="c-tasklist__header__title" title={props.name}>
            {splitString(props.name, 140)}
          </h2>
          <span className="c-tasklist__header__remove" onClick={() => props.showModal(`remove-tasklist-${props.id}`)}>
            <FontAwesomeIcon icon="trash-alt" />
          </span>
        </header>

        <main className="c-tasklist__tasks">
          {props.state.boardData.tasklists[props.id].tasks.map((e, i) => (
            <Task key={i} task={e} idTaskList={props.id} idTask={i} {...props} />
          ))}
        </main>

        <footer className="c-tasklist__footer">
          <span className="c-tasklist__footer__add-task" onClick={() => props.showModal(`add-task-${props.id}`)}>
            + Add task
          </span>
        </footer>
      </section>

      {/* ---------------------
       Modal remove tasklist */}

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

      {/* ------------------
       Modal add tasklist */}

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
              />

              <InputText
                type="file"
                id="imageTask"
                labelText="Image:"
                icon="columns"
                extraClass="margin-bottom-20"
                onChange={e => handleUpload(e)}
              />

              <Button text="Create new task" onClick={e => handleCreateNewTask(e, props.id)} isLoading={modalLoading} />
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
