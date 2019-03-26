import { auth, database } from "../firebase";

/**
 * Funcion para crear usuarios
 * @user necesario para acceder a los datos y devolver el email para loguearnos.
 * @param {string} user
 * @param {string} email
 * @param {string} password
 * @callback callback
 */

export const createUser = (user, email, password, callback) => {
  let userExist = false;

  // Accedemos a la colección de usuarios
  database
    .collection("users")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // Si existe seteamos que existe para no pasar al Auth.
        if (doc.id === user) {
          callback({ message: "The user name already exists" });
          userExist = true;
        }
      });
    })
    .then(() => {
      // Si existe salimos de la función
      if (userExist) return false;

      // Si no creamos el usuario en la autenticación de firebase
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(result => {
          database
            .collection("users")
            .doc(user)
            .set({
              uid: result.user.uid,
              user: user,
              email: email,
              password: password
            })
            .then(docRef => {
              localStorage.setItem("user", user);
              callback(docRef);
            })
            .catch(error => {
              callback(error);
            });
        })
        .catch(error => {
          callback(error);
        });
    });
};

/**
 * Funcion para autentificar
 * @param {string} user
 * @param {string} password
 * @callback callback
 */

export const authUser = (user) => {
  return new Promise((resolve, reject) => {
    getUserByUserName(user).then(data => {
      auth
        .signInWithEmailAndPassword(data.email, data.password)
        .then(result => {
          return resolve();
        })
        .catch(error => {
          return reject(error);
        });
    });
  });

  // getUserDataByUserName(user, data => {
  //   if (!data) {
  //     callback({ message: "The user not exist" });
  //   } else {
  //     auth
  //       .signInWithEmailAndPassword(data.email, password)
  //       .then(result => {
  //         callback(false);
  //       })
  //       .catch(error => {
  //         callback(error);
  //       });
  //   }
  // });
};

/**
 * Funcion para obtener userPath a traves del userName
 * @param {string} userName
 * @returns {promise}
 */

export const getUserByUserName = userName => {
  // Accedemos a la colección de usuarios
  return new Promise((resolve, reject) => {
    database
      .collection("users")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // Si existe seteamos que existe para no pasar al Auth.
          if (doc.id === userName) {
            return resolve(doc.data());
          }
        });
      })
      .catch(error => {
        return reject(error);
      });
  });
};
