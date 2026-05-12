const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    case "ADD_TO_CART": {
      const product = action.payload;

      const existing = state.cartItems.find((item) => item.id === product.id);

      if(existing) {
        return {
          ...state,cartItems: state.cartItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item),
        };
      }

      return {
        ...state,cartItems: [ ...state.cartItems, { ...product, quantity: 1 }],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,cartItems: state.cartItems.filter((item) => item.id !== action.payload)
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,cartItems: state.cartItems.map((item) => item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item)
          .filter((item) => item.quantity > 0),
      };

    case "CLEAR_CART":
      return {
         ...state,cartItems:[],
      };

    default:
      return state;
  }
};