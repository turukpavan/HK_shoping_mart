export const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};

export const removeFromCart = (id) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: id,
  };
};

export const decreaseQuantity = (id) => {
  return {
    type: "DECREASE_QUANTITY",
    payload: id,
  };
};

export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};