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
    removeBoard(props.id).then(() => {
      getUserBoards(props.state.dataUser.user).then(boards => {
        props.hideModal();
        props.setBoards(boards);
      });
    });
  };

  return (
    <React.Fragment>
      <figure className="c-board-card">
        <h3 className="c-board-card__name">{props.name}</h3>
        <p className="c-board-card__desc">{props.description}</p>
        <div className="c-board-card__delete" onClick={() => props.showModal("modal-remove-board")}>
          <FontAwesomeIcon icon="trash" />
          Delete Board
        </div>
      </figure>

      {props.state.modal === "modal-remove-board" && (
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
