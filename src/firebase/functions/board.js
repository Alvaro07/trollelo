import { database } from "../firebase";

export const createBoard = (user, name, description) => {
  return new Promise((resolve, reject) => {
    database
      .collection("boards")
      .doc()
      .set({
        owner: user,
        name: name,
        description: description
      })
      .then(() => {
        return resolve();
      })
      .catch(error => {
        return reject(error);
      });
  });
};

export const getUserBoards = user => {
  return new Promise((resolve, reject) => {
    database
      .collection("boards")
      .where("owner", "==", user)
      .get()
      .then(querySnapshot => {
        const boards = [];
        querySnapshot.forEach(doc => {
          boards.push(doc.data());
        });
        // Filtrar mediante firestore para conseguir saber si hay usuario o no, y devolver la promesa fallida
        return resolve(boards);
      })
      .catch(error => {
        return reject(error);
      });
  });
};
