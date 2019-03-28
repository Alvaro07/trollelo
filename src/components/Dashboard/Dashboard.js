import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { showModal, hideModal, setBoards } from "../../redux/reducer";
import { createBoard, getUserBoards } from "../../firebase/functions/board";

// Components
import Header from "../Header/Header";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import InputText from "../InputText/InputText";
import Textarea from "../Textarea/Textarea";
import BoardCard from "../BoardCard/BoardCard";

const Dashboard = props => {
  const [newBoard, setNewBoard] = useState({
    name: "",
    description: "",
    errorMessage: "Complete all the fields",
    isValid: true
  });

  /**
   * Obtenemos todos los usuarios
   */

  useEffect(() => {
    if (props.state.isLogin) {
      getUserBoards(props.state.dataUser.user)
        .then(boards => {
          props.setBoards(boards);
        })
        .catch(error => console.log(error));
    }
  }, []);

  /**
   * Creamos/cerramos el modal
   */

  const handleCreateBoard = e => {
    e.preventDefault();

    if (newBoard.name.length !== 0 && newBoard.description.length !== 0) {
      createBoard(props.state.dataUser.user, newBoard.name, newBoard.errorMessage)
        .then(() => {
          setNewBoard({ ...newBoard, isValid: true, name: "", description: "" });
          props.hideModal();

          // obtenemos la lista de boards actualziadas
          getUserBoards(props.state.dataUser.user).then(boards => {
            props.setBoards(boards);
          });
        })
        .catch(error => console.log(error));
    } else {
      setNewBoard({ ...newBoard, isValid: false });
    }
  };

  const handleCloseNewBoard = () => {
    setNewBoard({ ...newBoard, name: "", description: "", isValid: true });
    props.hideModal();
  };

  if (!props.state.isLogin) {
    return <Redirect from="/" to="/login" />;
  } else {
    return (
      <div className="dashboard">
        <Header />
        <div className="dashboard__table">
          {props.state.boards &&
            props.state.boards.map((e, i) => {
              return <BoardCard key={i} name={props.state.boards[i].name} description={props.state.boards[i].description} />;
            })}

          <Button type="primary" text="New Board" icon="columns" onClick={() => props.showModal("new-board")} />

          {props.state.modal === "new-board" && (
            <Modal>
              <ModalContent modalTitle="Add new board" type="small" onClose={() => handleCloseNewBoard()}>
                <form>
                  {" "}
                  <InputText
                    type="text"
                    id="newBoardName"
                    placeholder="Board Name"
                    icon="columns"
                    extraClass="margin-bottom-10"
                    onKeyUp={e => setNewBoard({ ...newBoard, name: e.target.value })}
                    error={newBoard.isValid === false && !newBoard.name.length ? true : false}
                  />
                  <Textarea
                    placeholder="Description"
                    noResize={true}
                    extraClass="margin-bottom-20"
                    onKeyUp={e => setNewBoard({ ...newBoard, description: e.target.value })}
                    error={newBoard.isValid === false && !newBoard.description.length ? true : false}
                  />
                  <Button text="Create Board" icon="columns" onClick={e => handleCreateBoard(e)} />
                  {newBoard.isValid === false && <p className="color-orange bold padding-top-20">{newBoard.errorMessage}</p>}
                </form>
              </ModalContent>
            </Modal>
          )}
        </div>
      </div>
    );
  }
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
)(Dashboard);
