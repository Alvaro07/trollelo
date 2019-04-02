import { database } from "../firebase";
// import { getUserData } from "./user";

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
        getUserBoards(user).then(data => {
          userRef
            .update({ boards: data })
            .then(() => resolve())
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

export function getUserBoards(user) {
  return new Promise((resolve, reject) => {
    database
      .collection("boards")
      .get()
      .then(querySnapshot => {
        let boards = [];
        querySnapshot.forEach(doc => {
          boards.push(doc.data());
        });
        // Filtrar mediante firestore para conseguir saber si hay usuario o no, y devolver la promesa fallida
        return !querySnapshot.empty ? resolve(boards.filter(e => e.owner === user)) : reject("no boards");
      })
      .catch(error => reject(error));
  });
}

/**
 * Funcion para Borrar un 'board' del usuario
 * @param {string} id
 * @returns {promise}
 */

export function removeBoard(id) {
  return new Promise((resolve, reject) => {
    database
      .collection("boards")
      .doc(id)
      .delete()
      .then(() => {
        return resolve();
      })
      .catch(error => reject(error));
  });
}

// export function removeBoard(id, user) {
//   const userRef = database.collection("users").doc(user);
//   let arrayBoards = [];

//   return new Promise((resolve, reject) => {
//     getUserBoards(user).then(data => {
//       arrayBoards = data.filter(e => e !== id);
//       userRef
//         .update({
//           boards: arrayBoards
//         })
//         .then(() => {
//           console.log("llego");
//           return resolve();
//         })
//         .catch(error => reject(error));
//     });
//   });
// }
