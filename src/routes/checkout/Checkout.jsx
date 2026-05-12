import React, { useEffect, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckoutForm from "../../components/checkoutform/CheckoutForm";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity, removeFromCart } from "../../actions/cartAction";

const Checkout = () => {
    const cartItems = useSelector(state=>state.Cart.cartItems);
    const dispatch = useDispatch()
    const totalPrice = useMemo(() =>
      cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
       0
       ),[cartItems]);
  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] md:w-[70%] mt-10">
        {/* heading */}
        <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] border-b pb-4 font-medium mb-5">
          <p>Product</p>
          <p>Description</p>
          <p className="text-center">Quantity</p>
          <p className="text-center">Price</p>
          <p className="text-center">Remove</p>
        </div>

        {/* product row */}
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center border-b pb-5 mb-5"
          >
            {/* image */}
            <div className="w-24 h-24">
              <img
                className="w-full h-full object-cover"
                src={item.imageUrl}
                alt=""
              />
            </div>

            {/* product name */}
            <p>{item.name}</p>

            {/* quantity */}
            <div className="flex justify-center items-center gap-3">
             <span
  onClick={() => dispatch(decreaseQuantity(item.id))}
  className="
    cursor-pointer
    w-8 h-8
    flex items-center justify-center
    border
    rounded-full
    text-lg
    hover:bg-gray-200
    transition
  "
>
  −
</span>

<span className="px-2">{item.quantity}</span>

<span
  onClick={() => dispatch(addToCart(item))}
  className="
    cursor-pointer
    w-8 h-8
    flex items-center justify-center
    border
    rounded-full
    text-lg
    hover:bg-gray-200
    transition
  "
>
  +
</span>
            </div>

            {/* price */}
            <p className="text-center">${item.price}</p>

            {/* remove */}
            <div
              onClick={() => dispatch(removeFromCart(item.id))}
              className="flex justify-center"
            >
              <CloseIcon className="cursor-pointer" />
            </div>
          </div>
        ))}

        {/* total */}
        <div className="flex justify-end mt-10">
          <div className="text-right border-t pt-5 w-full md:w-[300px]">
            <h2 className="text-xl font-semibold">Total: ${totalPrice}</h2>
          </div>
        </div>
        {/* pYMENT */}
        <CheckoutForm amount={totalPrice} />
      </div>
    </div>
  );
};

export default Checkout;
