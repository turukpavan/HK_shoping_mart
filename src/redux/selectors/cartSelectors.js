
export const selectUserCartItems = (state) => {
  const user = state.Users.userData;
  const cartItems = state.Cart.cartItems;

  return (
    cartItems?.filter(
      (item) => item.uid === user?.uid
    ) || []
  );
};

export const selectCartTotal = (state) => {
  const items = selectUserCartItems(state);

  return items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );
};