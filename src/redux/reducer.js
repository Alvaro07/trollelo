/**
 * Reducer actions
 */

export const setLogin = boolean => ({ type: "SET_LOGIN", boolean });

/**
 * Reducer
 */

export const reducer = (state, action) => {
  let newState = { ...state };

  switch (action.type) {
    case "SET_LOGIN":
      return { ...newState, isLogin: action.boolean };

    default:
      return newState;
  }
};
