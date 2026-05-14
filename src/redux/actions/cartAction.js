export const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};

export const removeFromCart = (obj) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: obj,
  };
};

export const decreaseQuantity = (obj) => {
  return {
    type: "DECREASE_QUANTITY",
    payload: obj,
  };
};

export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};
