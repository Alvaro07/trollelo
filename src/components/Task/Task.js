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

  const [editTask, setEditTask] = useState({
    title: props.task.title,
    description: props.task.description,
    picture: null,
    imageUrl: props.task.taskImage,
    errorMessage: "Complete the title field",
    isValid: true
  });

  /**
   * Update task
   */

  const handleUpdateTask = e => {
    e.preventDefault();
    setModalLoading(true);

    if (editTask.title.length) {
      setModalLoading(true);
      updateTask(
        editTask.title,
        editTask.description,
        editTask.picture,
        props.state.dataUser.user,
        props.state.boardData.id,
        props.idTaskList,
        props.idTask
      ).then(data => {
        props.setDataBoard(data.boardUpdate);
        setEditTask({ ...editTask, imageUrl: data.imageUrl });
        setModalLoading(false);
        props.hideModal();
      });
    } else {
      setModalLoading(false);
      setEditTask({ ...editTask, isValid: false });
    }
  };

  /**
   * Remove task
   */

  const handleRemoveTask = e => {
    e.preventDefault();
    setModalRemoveLoading(true);
    const fileName = props.state.boardData.tasklists[props.idTaskList].tasks[props.idTask].taskImageName;

    removeTask(props.state.boardData.id, props.idTaskList, props.idTask, props.state.dataUser.user, fileName).then(data => {
      setModalRemoveLoading(false);
      props.setDataBoard(data);
      props.hideModal();
    });
  };

  /**
   * Uplaod image
   */

  const handleUpload = e => {
    const file = e.target.files[0];
    if (file.type === "image/png" || file.type === "image/jpeg") {
      const reader = new FileReader();
      reader.onloadend = () => setEditTask({ ...editTask, picture: file });
      reader.readAsDataURL(file);
    } else {
      setEditTask({ ...editTask, errorMessage: "Invalid file format" });
    }
  };

  /**
   * Remove Image
   */

  const handleRemoveImage = e => {
    e.preventDefault();
    setEditTask({ ...editTask, imageUrl: null, picture: null });
  };

  /**
   * Cierre without save
   */

  const handleCloseEditTask = () => {
    setEditTask({
      ...editTask,
      title: props.task.title,
      description: props.task.description,
      picture: null,
      imageUrl: props.task.taskImage,
      isValid: true
    });
  };

  /**
   * Render
   */
  const pictureUrl = props.state.boardData.tasklists[props.idTaskList].tasks[props.idTask].taskImage;

  return (
    <React.Fragment>
      <div className="c-task" onClick={e => props.showModal(`task-${props.idTask}${props.idTaskList}`)}>
        {pictureUrl && <img className="c-task__picture" src={pictureUrl} alt="alt" />}
        <h3 className="c-task__title">{splitString(props.task.title, 150)}</h3>
      </div>

      {/* Modal edit tasklist */}

      {props.state.modal === `task-${props.idTask}${props.idTaskList}` && (
        <Modal>
          <ModalContent modalTitle="Edit task" onClose={() => handleCloseEditTask()}>
            <form method="POST">
              <InputText
                type="text"
                id="taskTitle"
                labelText="Title:"
                icon="columns"
                extraClass="margin-bottom-20"
                required={true}
                error={editTask.isValid === false && !editTask.title.length ? true : false}
                value={editTask.title}
                onKeyUp={e => setEditTask({ ...editTask, title: e.target.value })}
              />

              <Textarea
                labelText="Description:"
                extraClass="margin-bottom-20"
                value={editTask.description}
                onKeyUp={e => setEditTask({ ...editTask, description: e.target.value })}
              />

              {editTask.imageUrl && (
                <div className="c-task__update__image">
                  <p className="bold">Image:</p>
                  <img src={editTask.imageUrl} alt={editTask.title} />
                  <Button
                    extraClass="c-task__update__image__remove"
                    text="Remove Image"
                    secondary
                    size="small"
                    onClick={e => handleRemoveImage(e)}
                  />
                </div>
              )}

              {!editTask.imageUrl && (
                <InputText
                  type="file"
                  id="imageTask"
                  labelText="Image:"
                  icon="columns"
                  extraClass="margin-bottom-20"
                  onChange={e => handleUpload(e)}
                />
              )}

              <Button text="Update task" onClick={e => handleUpdateTask(e)} isLoading={modalLoading} />
              <Button
                text="Remove task"
                extraClass="margin-left-10"
                secondary
                onClick={e => handleRemoveTask(e)}
                isLoading={modalRemoveLoading}
              />

              {editTask.isValid === false && <p className="color-orange bold padding-top-20">{editTask.errorMessage}</p>}
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
  task: PropTypes.object
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
