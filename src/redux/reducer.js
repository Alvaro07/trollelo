/**
 * Reducer actions
 */

export const setLogin = boolean => ({ type: "SET_LOGIN", boolean });
export const setUser = data => ({ type: "SET_USER", data });

/**
 * Reducer
 */

export const reducer = (state, action) => {
  let newState = { ...state };

  switch (action.type) {
    case "SET_USER":
      return { ...newState, dataUser: action.data};

    case "SET_LOGIN":
      return { ...newState, isLogin: action.boolean };

    default:
      return newState;
  }
};
