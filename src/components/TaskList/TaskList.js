import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showModal, hideModal, setDataBoard } from "../../redux/reducer";
import { removeTasklist } from "../../firebase/functions/tasklist";

// Components
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import Button from "../Button/Button";

// Styles
import "./taskList.scss";

/**
 * TaskList
 */

const TaskList = props => {
  // State para setear el loader del modal
  const [modalLoading, setModalLoading] = useState(false);

  const handleRemove = e => {
    e.preventDefault();
    setModalLoading(true);

    removeTasklist(props.id, props.state.boardData.id).then(data => {
      props.hideModal();
      setModalLoading(false);
      props.setDataBoard({ ...props.state.boardData, tasklists: data });
    });
  };

  return (
    <React.Fragment>
      <div className="c-tasklist" data-id={props.id}>
        <h2 className="c-tasklist__title">{props.name}</h2>
        <span className="c-tasklist__remove" onClick={() => props.showModal(`remove-tasklist-${props.id}`)}>
          <FontAwesomeIcon icon="trash-alt" />
        </span>

        <div className="c-tasklist__add-task">
          <span className="c-tasklist__add-task__link">+ Add task</span>
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
