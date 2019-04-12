import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showModal, hideModal, setDataBoard } from "../../redux/reducer";
import { updateTask, removeTask } from "../../firebase/functions/task";
import { splitString } from "../../utils/utilsFunctions";

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
  /**
   * State para setear el loader del modal
   */

  const [modalLoading, setModalLoading] = useState(false);
  const [modalRemoveLoading, setModalRemoveLoading] = useState(false);

  /**
   * Creamos el estado local de la task para pintarla y que se actualice
   */

  const oldTask = props.state.boardData.tasklists[props.idTaskList].tasks[props.idTask];
  const [task, setTask] = useState({
    title: oldTask.title,
    description: oldTask.description,
    picture: null,
    imageUrl: oldTask.taskImage,
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
        task.picture,
        props.state.dataUser.user,
        props.state.boardData.id,
        props.idTaskList,
        props.idTask
      ).then(data => {
        props.setDataBoard(data);
        setModalLoading(false);
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

    removeTask(props.state.boardData.id, props.idTaskList, props.idTask).then(data => {
      setModalRemoveLoading(false);
      props.hideModal();
      props.setDataBoard(data);
    });
  };

  /**
   * Uplaod image
   */

  const handleUpload = e => {
    const file = e.target.files[0];
    if (file.type === "image/png" || file.type === "image/jpeg") {
      const reader = new FileReader();
      reader.onloadend = () => setTask({ ...task, picture: file });
      reader.readAsDataURL(file);
    } else {
      setTask({ ...task, errorMessage: "Invalid file format" });
    }
  };

  /**
   * Remove Image
   */

  const handleRemoveImage = e => {
    e.preventDefault();
    setTask({ ...task, imageUrl: null });
  };

  /**
   * Render
   */
  

  return (
    <React.Fragment>
      <div className="c-task" onClick={() => props.showModal(`task-${props.idTask}${props.idTaskList}`)}>
        {props.imageUrl && <img className="c-task__picture" src={props.imageUrl} alt="alt" />}
        <h3 className="c-task__title">{splitString(props.title, 150)}</h3>
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
                extraClass="margin-bottom-20"
                onKeyUp={e => setTask({ ...task, description: e.target.value })}
                value={props.state.boardData.tasklists[props.idTaskList].tasks[props.idTask].description}
              />

              {task.imageUrl && (
                <div className="c-task__update__image">
                  <p className="bold">Image:</p>
                  <img src={task.imageUrl} alt={task.title} />
                  <Button
                    extraClass="c-task__update__image__remove"
                    text="Remove Image"
                    secondary
                    size="small"
                    onClick={e => handleRemoveImage(e)}
                    submit={true}
                  />
                </div>
              )}

              {!task.imageUrl && (
                <InputText
                  type="file"
                  id="imageTask"
                  labelText="Image:"
                  icon="columns"
                  extraClass="margin-bottom-20"
                  onChange={e => handleUpload(e)}
                />
              )}

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
