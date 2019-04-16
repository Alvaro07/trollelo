import { storage } from "../firebase";

/**
 * Funcion subir una imagen
 * @param {string} user
 * @param {file} file
 * @returns {string} image Url
 */

export function uploadImage(user, file) {
  return new Promise((resolve, reject) => {
    const hash = generateHash();
    const storageRef = storage.ref(`images/${user}/${hash}${file.name}`);
    const task = storageRef.put(file);

    task.on(
      "state_changed",
      loading => {},
      error => {
        reject(error);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          resolve({ downloadURL, name: `${hash}${file.name}` });
        });
      }
    );
  });
}

/**
 * Funcion para borrar una imagen
 * @param {string} user
 * @param {file} fileName
 * @returns {promise}
 */

export function deleteImage(user, fileName) {
  return new Promise((resolve, reject) => {
    const deleteRef = storage.ref(`images/${user}/${fileName}`);
    deleteRef
      .delete()
      .then(() => resolve())
      .catch(error => reject());
  });
}

/**
 * Funcion que genera hash para las imagenes
 * @returns {string}
 */

export const generateHash = () => {
  return (
    Math.random()
      .toString(6)
      .substring(2, 7) +
    Math.random()
      .toString(6)
      .substring(2, 7)
  );
};
