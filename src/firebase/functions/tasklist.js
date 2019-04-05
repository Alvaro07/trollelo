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
