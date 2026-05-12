import React, { useContext, memo } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions/cartAction';

const ProductCard = ({products}) => {
  const dispatch = useDispatch();
  return (
<div className=" grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  justify-items-center ">
        {products?.items?.map((product) => (
          <div key={product.id} className="w-50 mb-5 relative group">
            <div className="w-[100%] h-50">
              <img
                className="h-[100%] w-[100%] align-middle"
                src={product.imageUrl}
                alt=""
              />
            </div>

            <div className="flex justify-between">
              <p>{product.name}</p>
              <p>{product.price}</p>
            </div>

            <div className=" cursor-pointer absolute border text-white bottom-10 right-8 h-10 w-35 text-center opacity-0 hover:bg-[#ffffff8c] hover:text-black group-hover:opacity-100 transition-opacity duration-300">
              <h1 onClick={()=>dispatch(addToCart(product))} className="pt-1">add to cart</h1>
            </div>
          </div>
        ))}
      </div>  )
}

export default memo(ProductCard);