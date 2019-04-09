import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeBoard, getUserBoards } from "../../firebase/functions/board";
import { showModal, hideModal, setBoards } from "../../redux/reducer";
import { splitString } from "../../utils/utilsFunctions";

// Styles
import "./boardCard.scss";

// Components
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import Button from "../Button/Button";

/**
 * BoardCard
 */

const BoardCard = props => {
  // State para setear el loader del modal
  const [modalLoading, setModalLoading] = useState(false);

  const handleRemove = e => {
    e.preventDefault();
    setModalLoading(true);

    removeBoard(props.id, props.state.dataUser.user).then(() => {
      getUserBoards(props.state.dataUser.user)
        .then(data => {
          setModalLoading(false);
          props.hideModal();
          props.setBoards(data);
        })
        .catch(() => props.setBoards([]));
    });
  };

  return (
    <React.Fragment>
      <figure className="c-board-card">
        <h3 className="c-board-card__name">
          <Link to={`/trollelo/TaskBoard/${props.id}`}>{props.name}</Link>
        </h3>
        <p> {splitString(props.description, 250)} </p>
        <div className="c-board-card__delete" onClick={() => props.showModal(`modal-remove-board${props.id}`)}>
          <FontAwesomeIcon icon="trash" />
          Remove
        </div>
      </figure>

      {props.state.modal === `modal-remove-board${props.id}` && (
        <Modal>
          <ModalContent modalTitle="Remove board" type="small">
            <form>
              <p className="margin-bottom-20">
                <span className="bold">Are you sure</span> to remove this Board?
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

BoardCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

/**
 * Redux connection
 */

const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => ({
  showModal: modal => dispatch(showModal(modal)),
  hideModal: () => dispatch(hideModal()),
  setBoards: boards => dispatch(setBoards(boards))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardCard);
