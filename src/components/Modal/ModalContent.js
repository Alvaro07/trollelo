import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { hideModal } from "../../redux/reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ModalContent = props => {
  const title = props.modalTitle ? <h2 className="c-modal__title">{props.modalTitle}</h2> : "";
  const typeClass = props.type === "small" ? "c-modal__container--small" : "";

  const modalRef = useRef();

  /**
   * Efecto de opacidad al aparecer
   */

  useEffect(() => {
    setTimeout(() => modalRef.current.style.setProperty("--modal-opacity", 1), 100);
    return () => {
      modalRef.current.style.setProperty("--modal-opacity", 0);
    };
  }, []);

  const hideModalComponent = () => {
    modalRef.current.style.setProperty("--modal-opacity", 0);
    setTimeout(() => props.hideModal(), 100);
    if (props.onClose) props.onClose();
  };

  return (
    <div className="c-modal" ref={modalRef}>
      <div className={`c-modal__container ${typeClass}`}>
        {title}
        {props.children}
        <FontAwesomeIcon icon="times" className="c-modal__button-close" onClick={() => hideModalComponent()} />
      </div>
    </div>
  );
};

/**
 * PropTypes
 */

ModalContent.propTypes = {
  children: PropTypes.element.isRequired,
  modalTitle: PropTypes.string,
  onClose: PropTypes.func,
  type: PropTypes.oneOf(["small"])
};

/**
 * Redux connection
 */

const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContent);
