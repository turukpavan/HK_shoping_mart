import { categoriesData } from "../../db/categoriesData";
const initialState = {
  categories: categoriesData,
};

export const categoriesReducer = (state = initialState, action) => {
  switch (action.payload) {
    case "GET_CATEGORIES":
      return {
        ...state,
      };

    default:
      return state;
  }
};
