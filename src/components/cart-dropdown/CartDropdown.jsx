import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { useSelector } from "react-redux";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const CartDropDown = () => {
   const user = useSelector(state=>state.Users.userData)
    const cartData = useSelector((state)=>state.Cart.cartItems);
    const cartItems = cartData.filter((cartitem)=>cartitem.uid == user?.uid)
  
  const navigate = useNavigate();

  return (
    <div
      className="
        absolute left-[-150px] z-20
         bg-white border shadow-2xl rounded-md p-3
        opacity-0 invisible
        group-hover:opacity-100 group-hover:visible
        transition-all duration-300
      "
    >
      {/* CART ITEMS */}
      <div
        className="
          max-h-48
          overflow-y-auto
          pr-2
        "
      >
        {cartItems.length ? (
          cartItems.map((pro) => (
            <div
              key={pro.id}
              className="flex items-center gap-3 mb-3 border-b pb-2"
            >
              <img
                className="w-10 h-10 object-cover rounded"
                src={pro.imageUrl}
                alt={pro.name}
              />

              <div className="text-xs">
                <p className="font-semibold">{pro.name}</p>
                <p>
                  {pro.quantity} × ${pro.price}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center">

           <RemoveShoppingCartIcon sx={{ fontSize: 50 }} />
          <p className="text-center text-gray-500 text-sm">
            Your cart is empty
          </p>
          </div>
        )}
      </div>

      {/* BUTTON */}
      <Button
        onClick={() => navigate("/checkout")}
        className="w-full h-10 text-[10px] mt-3"
      >
        GO TO CHECKOUT
      </Button>
    </div>
  );
};

export default memo(CartDropDown);