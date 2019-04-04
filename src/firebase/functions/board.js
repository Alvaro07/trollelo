import { database } from "../firebase";
import { getUserData } from "./user";

/**
 * Funcion para Crear un board a partir del userName.
 * @param {string} user
 * @param {string} name
 * @param {string} description
 * @returns {promise}
 */

export async function createBoard(user, name, description) {
  const userData = await getUserData(user);
  const refId = await setBoard(user, name, description);
  await setUserBoardId(userData.boards, refId, userData.user);
}

/**
 * Funcion para setear el board en la colección de boards.
 * @param {string} user
 * @param {string} name
 * @param {string} description
 * @returns {promise}
 */

function setBoard(user, name, description) {
  return new Promise((resolve, reject) => {
    const ref = database.collection("boards").doc();
    ref
      .set({
        owner: user,
        name: name,
        description: description,
        id: ref.id
      })
      .then(() => resolve(ref.id))
      .catch(error => reject(error));
  });
}

/**
 * Funcion para setear el id de la board creada en el usuario
 * @param {string} data
 * @param {string} id
 * @param {string} user
 * @returns {promise}
 */

function setUserBoardId(data, id, user) {
  return new Promise((resolve, reject) => {
    const userRef = database.collection("users").doc(user);
    userRef
      .update({ boards: [...data, id] })
      .then(() => resolve())
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

export async function removeBoard(id, user) {
  const userRef = database.collection("users").doc(user);

  await database
    .collection("boards")
    .doc(id)
    .delete();

  const userData = await getUserData(user);
  await userRef.update({ boards: userData.boards.filter(e => e !== id) });
}
