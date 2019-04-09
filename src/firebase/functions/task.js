import { database } from "../firebase";
import { getBoard } from "./board";

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
 * Funcion para udpatear la task
 * @param {string} title
 * @param {string} description
 * @param {string} user
 * @param {object} boardData
 * @param {number} indexTasklist
 * @param {number} indexTask
 * @returns {promise}
 */

export function updateFirebaseTask(title, description, user, boardData, indexTasklist, indexTask) {
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

    updateBoard.tasklists[indexTasklist].tasks[indexTask] = task;

    ref
      .set(updateBoard)
      .then(() => resolve(updateBoard))
      .catch(error => reject(error));
  });
}

/**
 * Funcion Update
 * @param {string} title
 * @param {string} description
 * @param {string} user
 * @param {string} board
 * @param {number} indexTasklist
 * @param {number} indexTask
 * @returns {promise}
 */

export async function updateTask(title, description, user, board, indexTasklist, indexTask) {
  const boardData = await getBoard(board);
  const task = await updateFirebaseTask(title, description, user, boardData, indexTasklist, indexTask);
  return task;
}

/**
 * Funcion para borrar la task
 * @param {string} title
 * @param {string} description
 * @param {string} user
 * @param {object} boardData
 * @param {number} indexTasklist
 * @param {number} indexTask
 * @returns {promise}
 */

export function removeFirebaseTask(boardData, indexTasklist, indexTask) {
  const ref = database.collection("boards").doc(boardData.id);
  let updateBoard = boardData;

  return new Promise((resolve, reject) => {
    updateBoard.tasklists[indexTasklist].tasks = updateBoard.tasklists[indexTasklist].tasks.filter((e, i) => i !== indexTask);

    ref
      .set(updateBoard)
      .then(() => resolve(updateBoard))
      .catch(error => reject(error));
  });
}

/**
 * Funcion remove
 * @param {string} title
 * @param {string} description
 * @param {string} user
 * @param {string} board
 * @param {number} indexTasklist
 * @param {number} indexTask
 * @returns {promise}
 */

export async function removeTask(board, indexTasklist, indexTask) {
  const boardData = await getBoard(board);
  const task = await removeFirebaseTask(boardData, indexTasklist, indexTask);
  return task;
}
