import { createPortal } from "react-dom";
import usePortal from "../../hooks/usePortal/usePortal";
import PropTypes from "prop-types";

const Modal = ({ children }) => {
  const target = usePortal("modal");
  return createPortal(children, target);
};

/**
 * PropTypes
 */

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Modal;
