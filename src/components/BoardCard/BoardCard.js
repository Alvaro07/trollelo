import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeBoard, getUserBoards } from "../../firebase/functions/board";
import { showModal, hideModal, setBoards } from "../../redux/reducer";

// Components
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import Button from "../Button/Button";

const BoardCard = props => {
  const handleRemove = e => {
    e.preventDefault();
    removeBoard(props.id, props.state.dataUser.user).then(() => {
      getUserBoards(props.state.dataUser.user)
        .then(data => {
          props.hideModal();
          props.setBoards(data);
        })
        .catch(() => props.setBoards([]));
    });
  };

  let descriptionText = null;
  if (props.description.length >= 250) {
    descriptionText = `${props.description.slice(0, 250)}...`;
  } else {
    descriptionText = props.description;
  }

  return (
    <React.Fragment>
      <figure className="c-board-card">
        <h3 className="c-board-card__name">{props.name}</h3>
        <p className="c-board-card__description">{descriptionText}</p>
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
              <Button text="Remove Board" icon="columns" onClick={e => handleRemove(e)} />
            </form>
          </ModalContent>
        </Modal>
      )}
    </React.Fragment>
  );
};

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
