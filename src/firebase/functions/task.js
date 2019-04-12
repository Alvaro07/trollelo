import { database } from "../firebase";
import { getBoard } from "./board";
import { uploadImage } from "./utils";

/**
 * Funcion para setear la task dentro de su tasklist
 * @param {string} title
 * @param {string} description
 * @param {string} user
 * @param {object} boardData
 * @param {number} indexTasklist
 * @returns {promise}
 */

export function setTask(title, description, image, user, boardData, indexTasklist) {
  const ref = database.collection("boards").doc(boardData.id);

  return new Promise((resolve, reject) => {
    const task = {
      title: title,
      description: description,
      owner: user,
      taskImage: image,
      tags: [],
      comments: []
    };

    boardData.tasklists[indexTasklist].tasks = [...boardData.tasklists[indexTasklist].tasks, task];

    ref
      .set(boardData)
      .then(() => resolve(boardData))
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

export async function createTask(title, description, picture, user, board, indexTasklist) {
  const boardData = await getBoard(board);
  const imageUrl = await uploadImage(user, picture);
  const task = await setTask(title, description, imageUrl, user, boardData, indexTasklist);
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

export function updateFirebaseTask(title, description, image, user, boardData, indexTasklist, indexTask) {
  const ref = database.collection("boards").doc(boardData.id);
  let updateBoard = boardData;

  return new Promise((resolve, reject) => {
    const task = {
      title: title,
      description: description,
      owner: user,
      images: image,
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

export async function updateTask(title, description, picture, user, board, indexTasklist, indexTask) {
  const boardData = await getBoard(board);
  const imageUrl = await uploadImage(user, picture);
  const task = await updateFirebaseTask(title, description, imageUrl, user, boardData, indexTasklist, indexTask);
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
