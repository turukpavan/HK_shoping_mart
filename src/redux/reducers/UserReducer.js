export const initialState = {
  userData: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        userData: action.payload,
      };

    case "LOGOUT_USER":
      return {
        ...state,
        userData: null,
      };

    default:
      return state;
  }
};
