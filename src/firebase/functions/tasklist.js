import { database } from "../firebase";
import { getBoard } from "./board";

/**
 * Funcion para Crear un board a partir del userName.
 * @param {string} user
 * @param {string} board
 * @param {string} tasklistName
 * @returns {promise}
 */

export async function createTasklist(user, board, tasklistName) {
  const boardData = await getBoard(board);
  const tasklist = await setTasklist(user, board, tasklistName, boardData.tasklists);
  return tasklist;
}

/**
 * Funcion para setear una tasklist
 * @param {string} title
 * @param {array} data
 * @returns {promise}
 */

export function setTasklist(user, board, title, data) {
  return new Promise((resolve, reject) => {
    const tasklist = {
      title: title,
      owner: user,
      tasks: []
    };

    database
      .collection("boards")
      .doc(board)
      .update({ tasklists: [...data, tasklist] })
      .then(() => resolve(tasklist))
      .catch(error => reject(error));
  });
}

/**
 * Funcion para Borrar un 'tasklist'
 * @param {string} id
 * @param {string} user
 * @returns {promise}
 */

export async function removeTasklist(dataId, board) {
  const boardRef = database.collection("boards").doc(board);

  let boardData = await getBoard(board);
  await boardRef.update({ tasklists: boardData.tasklists.filter((e, i) => i !== dataId) });
  boardData = await getBoard(board);
  
  return boardData.tasklists;
}
