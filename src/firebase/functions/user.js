import { auth, database } from "../firebase";

/**
 * Funcion para crear usuarios
 * @param {string} user
 * @param {string} email
 * @param {string} password
 * @callback callback
 */

export async function createUser(user, email, password) {
  let dataUser = null;

  // comprobamos si existe el usuario
  try {
    await getUserData(user);
    return { exists: true, message: "The user name already exists" };
  } catch (error) {}

  // autentificamos
  try {
    dataUser = await setAuthUser(email, password);
  } catch (error) {
    return error;
  }

  // seteamos usuario
  await setCollectionUser(user, email, password, dataUser.user.uid);
  return dataUser;
}

/**
 * Funcion para guardar un nuevo usuario en la colección 'users'
 * @param {string} email
 * @param {string} password
 * @returns {promise}
 */

export function setCollectionUser(user, email, password, id) {
  return new Promise((resolve, reject) => {
    database
      .collection("users")
      .doc(user)
      .set({
        user: user,
        email: email,
        password: password,
        id: id,
        boards: []
      })
      .then(data => resolve())
      .catch(error => reject(error));
  });
}

/**
 * Funcion para guardar el nuevo usuario en 'Authenticathion' y autentificarse
 * @param {string} email
 * @param {string} password
 * @returns {promise}
 */

export function setAuthUser(email, password) {
  return new Promise((resolve, reject) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

/**
 * Funcion para autentificar con un usuario ya creado
 * @param {string} user
 * @param {string} password
 * @returns {promise}
 */

export function authUser(email, password) {
  return new Promise((resolve, reject) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return resolve();
      })
      .catch(error => reject(error));
  });
}

/**
 * Funcion para comprobar si esta logueado
 * @param {string} user
 * @returns {promise}
 */

export function checkAuth() {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        getUserDataByEmail(user.email).then(data => {
          resolve(data)
        })
      } else {
        reject('No user is signed in')
      }
    });
  });
}

/**
 * Funcion para obtener userPath a traves del userName
 * @param {string} user
 * @returns {promise}
 */

export function getUserData(user) {
  return new Promise((resolve, reject) => {
    database
      .collection("users")
      .where("user", "==", user)
      .get()
      .then(querySnapshot => {
        return !querySnapshot.empty ? querySnapshot.forEach(doc => resolve(doc.data())) : reject("The user not exists");
      })
      .catch(error => reject(error));
  });
}


/**
 * Funcion para obtener userPath a traves del email
 * @param {string} user
 * @returns {promise}
 */

export function getUserDataByEmail(email) {
  return new Promise((resolve, reject) => {
    database
      .collection("users")
      .where("email", "==", email)
      .get()
      .then(querySnapshot => {
        return !querySnapshot.empty ? querySnapshot.forEach(doc => resolve(doc.data())) : reject("The user not exists");
      })
      .catch(error => reject(error));
  });
}