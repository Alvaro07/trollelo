/**
 * Reducer actions
 */

export const setLogin = boolean => ({ type: "SET_LOGIN", boolean });
export const setLoading = boolean => ({ type: "SET_LOADING", boolean });
export const setUser = data => ({ type: "SET_USER", data });
export const showModal = modal => ({ type: "SHOW_MODAL", modal });
export const hideModal = () => ({ type: "HIDE_MODAL" });
export const setBoards = boards => ({ type: "SET_BOARDS", boards });
export const setDataBoard = data => ({ type: "SET_DATA_BOARD", data });

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

    case "SHOW_MODAL":
      return { ...newState, modal: action.modal };

    case "HIDE_MODAL":
      return { ...newState, modal: null };

    case "SET_BOARDS":
      return { ...newState, userBoards: action.boards };
    
    case "SET_DATA_BOARD":
      return { ...newState, boardData: action.data };

    default:
      return newState;
  }
};
