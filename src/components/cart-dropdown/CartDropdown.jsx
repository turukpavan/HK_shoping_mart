import React, { useContext, memo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { useSelector } from "react-redux";

const CartDropDown = () => {
  const cartItems = useSelector(state=>state.Cart.cartItems);
  const navigate = useNavigate();
  return (
    <div className="absolute shadow-2xl h-60 w-50 left-[-150px] z-10 bg-white border p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
      <div className="overflow-scroll h-45">
       {cartItems.map((pro)=>(
         <div key={pro.id} className="flex justify-around shadow mb-3">
          <div className="w-[40px] h-[40px]">
            <img className="w-[100%] h-[100%]" src={pro.imageUrl} alt="" />
          </div>

          <div className=" text-xs">
            <p>{pro.name}</p>
            <p>{pro.quantity} X ${pro.price}</p>
          </div>
        </div>
       ))}
      </div>

      <div>
        <Button onClick={()=>navigate('/checkout')} className=" h-10 text-sm" >
        GO TO CHECKOUT

        </Button>
       
      </div>
    </div>
  );
};

export default memo(CartDropDown);
