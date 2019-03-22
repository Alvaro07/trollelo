import { auth } from "../firebase";
import firebase from "firebase/app";

// Funcion para crear usuarios
export const createUser = (user, email, password, callback) => {
  // Creamos el usuario en la autenticación de firebase
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      // Creamos el usuario en database
      firebase
        .database()
        .ref("users/" + result.user.uid)
        .set({ userName: user, email, password })
        .then(() => {
          // mantenemos el usuario en localstorage
          localStorage.setItem("userName", result.user.uid);
        });

      callback(false);
    })
    .catch(error => {
      callback(error);
    });
};

// Funcion para obtener usuario a traves del profileName
export const getUserByUid = (uid, callback) => {
  firebase
    .database()
    .ref("/users/" + uid)
    .once("value")
    .then(result => {
      // Devolvemos los datos del usuario
      callback(result.val());
    })
    .catch(error => {
      // Devolvemos el error
      callback(error);
    });
};
