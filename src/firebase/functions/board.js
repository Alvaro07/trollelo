import { database } from "../firebase";
import { getUserData } from "./user";

/**
 * Funcion para Crear un board a partir del userName.
 * @param {string} user
 * @param {string} name
 * @param {string} description
 * @returns {promise}
 */

export function createBoard(user, name, description) {
  return new Promise((resolve, reject) => {
    const userRef = database.collection("users").doc(user);
    const ref = database.collection("boards").doc();
    // Creamos y seteamos la board
    ref
      .set({
        owner: user,
        name: name,
        description: description,
        id: ref.id
      })
      .then(() => {
        // Asociamos el board al usuario
        getUserData(user).then(data => {
          userRef
            .update({ boards: [...data.boards, ref.id] })
            .then(() => {
              return resolve();
            })
            .catch(error => reject(error));
        });
      })
      .catch(error => reject(error));
  });
}

/**
 * Funcion para obtener un 'board'
 * @param {string} id
 * @returns {promise}
 */

export function getBoard(id) {
  return new Promise((resolve, reject) => {
    database
      .collection("boards")
      .doc(id)
      .get()
      .then(querySnapshot => {
        return resolve(querySnapshot.data());
      })
      .catch(error => reject(error));
  });
}

/**
 * Funcion para obtener todos los 'boards'
 * @param {string} id
 * @returns {promise}
 */

// Refactor de rendimiento
export function getUserBoards(user) {
  return new Promise((resolve, reject) => {
    // Obtenemos todas las 'boards'
    database
      .collection("boards")
      .get()
      .then(querySnapshot => {
        // Las filtramos para obtener solo las de el usuario
        let boards = [];
        querySnapshot.forEach(doc => {
          boards.push(doc.data());
        });
        return !querySnapshot.empty ? resolve(boards.filter(e => e.owner === user)) : reject("no boards");
      })
      .catch(error => reject(error));
  });
}

/**
 * Funcion para Borrar un 'board' del usuario
 * @param {string} id
 * @param {string} user
 * @returns {promise}
 */

export function removeBoard(id, user) {
  const userRef = database.collection("users").doc(user);
  return new Promise((resolve, reject) => {
    // Borramos la 'board' en la 'board collection'
    database
      .collection("boards")
      .doc(id)
      .delete()
      .then(() => {
        // Asociamos el board al usuario
        getUserData(user).then(data => {
          userRef
            .update({ boards: data.boards.filter(e => e !== id) })
            .then(() => {
              return resolve();
            })
            .catch(error => reject(error));
        });
      })
      .catch(error => reject(error));
  });
}
