/**
 * Reducer actions
 */

// export const setUser = (user, data) => ({ type: "SET_USER", user, data });

/**
 * Reducer
 */

export const reducer = (state, action) => {
  let newState = { ...state };

  switch (action.type) {
    // case "SET_USER":
    //   return { ...newState, user: action.user, data: action.data };

    default:
      return newState;
  }
};
