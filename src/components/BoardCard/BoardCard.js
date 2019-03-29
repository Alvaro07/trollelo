import React from "react";

const BoardCard = props => {
  return (
    <div className="c-board-card">
      <h3 className="c-board-card__name">{props.name}</h3>
      <p className="c-board-card__desc">{props.description}</p>
    </div>
  );
};

export default BoardCard;
