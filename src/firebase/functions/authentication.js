import { auth } from "../firebase";
import firebase from "firebase/app";

// Funcion para crear usuarios
export const createUser = (user, email, password, callback) => {

  // Creamos el usuario en la autenticación de firebase
  auth.createUserWithEmailAndPassword(email, password).then(result => {
    
    // Creamos el usuario en database
    firebase
      .database()
      .ref("users/" + result.user.uid)
      .set({ user, email, password }).then(() => {

        // mantenemos el usuario en localstorage
        localStorage.setItem("user", result.user.uid);
        
        
      })
  }).catch(error => {
    callback(error);
  });;
};
