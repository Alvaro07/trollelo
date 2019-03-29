import { database } from "../firebase";

export const createBoard = (user, name, description) => {
  return new Promise((resolve, reject) => {
    const ref = database.collection("boards").doc();
    ref
      .set({
        owner: user,
        name: name,
        description: description,
        id: ref.id
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
        return resolve(boards);
      })
      .catch(error => {
        return reject(error);
      });
  });
};

export const removeBoard = id => {

  return new Promise((resolve, reject) => {
    database
      .collection("boards")
      .doc(id)
      .delete()
      .then(() => {
        return resolve();
      })
      .catch(error => {
        return reject(error);
      });
  });
};
