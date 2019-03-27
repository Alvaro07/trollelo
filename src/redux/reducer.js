/**
 * Reducer actions
 */

export const setLogin = boolean => ({ type: "SET_LOGIN", boolean });
export const setLoading = boolean => ({ type: "SET_LOADING", boolean });
export const setUser = data => ({ type: "SET_USER", data });

/**
 * Reducer
 */

export const reducer = (state, action) => {
  let newState = { ...state };

  switch (action.type) {
    case "SET_LOADING":
      return { ...newState, isLoading: action.boolean };

    case "SET_LOGIN":
      return { ...newState, isLogin: action.boolean };

    case "SET_USER":
      return { ...newState, dataUser: action.data };

    default:
      return newState;
  }
};
