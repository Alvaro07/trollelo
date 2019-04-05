import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TaskList = props => {
  return (
    <div className="c-tasklist" data-id={props.id}>
      <h2 className="c-tasklist__title">{props.name}</h2>
      <div className="c-tasklist__add-task">
        <span className="c-tasklist__add-task__link">+ Add task</span>
      </div>
    </div>
  );
};

/**
 * PropTypes
 */

TaskList.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default TaskList;
