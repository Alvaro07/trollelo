import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

// Styles
import "./button.scss";

/**
 * Button
 */

const Task = props => {
  return <div>{props.title}</div>;
};

export default Task;
