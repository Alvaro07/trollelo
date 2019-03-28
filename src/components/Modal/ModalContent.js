import React from "react";
import { connect } from "react-redux";
import { hideModal } from "../../redux/reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Modal Content component
export const ModalContent = props => {
  const title = props.modalTitle ? <h2 className="c-modal__title">{props.modalTitle}</h2> : "";
  const typeClass = props.type === 'small' ? "c-modal__container--small" : "";

  return (
    <div className="c-modal">
      <div className={`c-modal__container ${typeClass}`}>
        {title}
        {props.children}
        <FontAwesomeIcon icon="times" className="c-modal__button-close" onClick={() => props.hideModal()} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContent);
