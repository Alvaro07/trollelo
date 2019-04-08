import { database } from "../firebase";
import { getBoard } from "./board";

/**
 * Funcion para crear una task
 * @param {string} title
 * @param {string} description
 * @param {string} user
 * @param {string} board
 * @param {number} indexTasklist
 * @returns {promise}
 */

export async function createTask(title, description, user, board, indexTasklist) {
  const boardData = await getBoard(board);
  const task = await setTask(title, description, user, boardData, indexTasklist);
  return task;
}

/**
 * Funcion para setear la task dentro de su tasklist
 * @param {string} title
 * @param {string} description
 * @param {string} user
 * @param {object} boardData
 * @param {number} indexTasklist
 * @returns {promise}
 */

export function setTask(title, description, user, boardData, indexTasklist) {
  const ref = database.collection("boards").doc(boardData.id);
  let updateBoard = boardData;

  return new Promise((resolve, reject) => {
    const task = {
      title: title,
      description: description,
      owner: user,
      images: [],
      tags: [],
      comments: []
    };

    updateBoard.tasklists[indexTasklist].tasks = [...updateBoard.tasklists[indexTasklist].tasks, task];

    ref
      .set(updateBoard)
      .then(() => resolve(updateBoard))
      .catch(error => reject(error));
  });
}
