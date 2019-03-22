import { auth, databaseRefUsers } from "../firebase";
import firebase from "firebase/app";

/**
 * Funcion para crear usuarios
 * @user necesario para acceder a los datos y devolver el email para loguearnos.
 * @email Email del usuario
 * @password Password de acceso
 * @callback Función para devolver los datos, o el mensaje error
 */

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

/**
 * Funcion para autentificar
 * @user necesario para acceder a los datos y devolver el email para loguearnos.
 * @password Password de acceso.
 * @callback Función para devolver los datos, o el mensaje error
 */

export const authUser = (user, password, callback) => {
  getUserDataByUserName(user, data => {
    if (!data) {
      callback({ message: "The user not exist" });
    } else {
      auth
        .signInWithEmailAndPassword(data.email, password)
        .then(result => {
          callback(false);
        })
        .catch(error => {
          callback(error);
        });
    }
  });
};

/**
 * Función para obtener usuario a traves del uId.
 * @uId Key de firebase del usuario.
 * @callback Función para devolver los datos, o el mensaje error.
 */

export const getUserByUid = (uId, callback) => {
  firebase
    .database()
    .ref("/users/" + uId)
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

/**
 * Funcion para obtener userPath a traves del userName
 * @userName Nombre del usuario
 * @callback Función para devolver los datos, o el mensaje error.
 */

export const getUserDataByUserName = (userName, callback) => {
  let userPath = null;

  databaseRefUsers
    .orderByChild("userName")
    .equalTo(userName)
    .once("value", snapshot => {
      if (!snapshot.val()) {
        callback(userPath);
        return;
      }

      snapshot.forEach(data => {
        databaseRefUsers
          .orderByKey()
          .equalTo(data.key)
          .on("value", snapshot => {
            userPath = snapshot.child(data.key).val();
            callback(userPath);
          });
      });
    });
};
