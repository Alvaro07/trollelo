import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { showModal, hideModal, setBoards } from "../../redux/reducer";
import { createBoard, getUserBoards } from "../../firebase/functions/board";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import Header from "../Header/Header";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import InputText from "../InputText/InputText";
import Textarea from "../Textarea/Textarea";
import BoardCard from "../BoardCard/BoardCard";
import Loader from "../Loader/Loader";

const Dashboard = props => {
  /**
   * Local State
   */

  const [newBoard, setNewBoard] = useState({
    name: "",
    description: "",
    errorMessage: "Complete all the fields",
    isValid: true
  });

  const [isLoading, setLoad] = useState(true);

  // State para setear el loader del modal
  const [modalLoading, setModalLoading] = useState(false);

  /**
   * Obtenemos todos los usuarios
   */

  useEffect(() => {
    if (props.state.isLogin) {
      getUserBoards(props.state.dataUser.user)
        .then(data => {
          props.setBoards(data);
          setLoad(false);
        })
        .catch(error => {
          props.setBoards([]);
          setLoad(false);
        });
    }
  }, []);

  /**
   * Creamos/cerramos el modal
   */

  const handleCreateBoard = e => {
    e.preventDefault();

    if (newBoard.name.length !== 0 && newBoard.description.length !== 0) {
      // Creamos un 'board' con el usuario de redux y los datos del formulario local.
      // Seteamos el 'board' en el state local y cerramos el modal

      setModalLoading(true);

      createBoard(props.state.dataUser.user, newBoard.name, newBoard.description).then(data => {
        setNewBoard({ ...newBoard, isValid: true, name: "", description: "" });
        props.hideModal();
        setModalLoading(false);

        // obtenemos la lista de 'boards' actualizadas
        // Seteamos el 'board' en redux

        getUserBoards(props.state.dataUser.user)
          .then(data => {
            props.setBoards(data);
          })
          .catch(() => props.setBoards([]));
      });
    } else {
      setModalLoading(false);
      setNewBoard({ ...newBoard, isValid: false });
    }
  };

  const handleCloseNewBoard = () => {
    setNewBoard({ ...newBoard, name: "", description: "", isValid: true });
  };

  if (!props.state.isLogin) {
    return <Redirect from="/" to="/login" />;
  } else if (isLoading) {
    return (
      <React.Fragment>
        <Header />
        <Loader />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Header />

        <main className="dashboard">
          <header className="dashboard__header">
            <span className="dashboard__header__icon">
              <FontAwesomeIcon icon="align-left" />
            </span>

            <div className="dashboard__header__title">
              <h2>My Dashboard</h2>
              <span className="dashboard__header__user">{props.state.dataUser.user}</span>
            </div>

            <Button
              type="primary"
              text="New Board"
              icon="columns"
              extraClass="margin-left-auto"
              onClick={() => props.showModal("new-board")}
            />
          </header>
          <section className="dashboard__table">
            {props.state.boards &&
              props.state.boards.map((e, i) => {
                return (
                  <BoardCard
                    key={i}
                    name={props.state.boards[i].name}
                    description={props.state.boards[i].description}
                    id={props.state.boards[i].id}
                  />
                );
              })}

            {props.state.modal === "new-board" && (
              <Modal>
                <ModalContent modalTitle="Add new board" type="small" onClose={() => handleCloseNewBoard()}>
                  <form method="POST">
                    <InputText
                      type="text"
                      id="newBoardName"
                      placeholder="Board Name"
                      icon="columns"
                      extraClass="margin-bottom-10"
                      onKeyUp={e => setNewBoard({ ...newBoard, name: e.target.value })}
                      error={newBoard.isValid === false && !newBoard.name.length ? true : false}
                      required={true}
                    />
                    <Textarea
                      placeholder="Description"
                      noResize={true}
                      extraClass="margin-bottom-20"
                      onKeyUp={e => setNewBoard({ ...newBoard, description: e.target.value })}
                      error={newBoard.isValid === false && !newBoard.description.length ? true : false}
                      required={true}
                    />
                    <Button text="Create Board" icon="columns" onClick={e => handleCreateBoard(e)} submit={true} isLoading={modalLoading} />
                    {newBoard.isValid === false && <p className="color-orange bold padding-top-20">{newBoard.errorMessage}</p>}
                  </form>
                </ModalContent>
              </Modal>
            )}
          </section>
        </main>
      </React.Fragment>
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
