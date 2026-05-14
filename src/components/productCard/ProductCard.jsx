import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import toast from "react-hot-toast";

const ProductCard = ({ products }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Users.userData);

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  justify-items-center ">
      {products?.items?.map((product) => (
        <div key={product.id} className="w-50 mb-5 relative group">
          <div className="w-[100%] h-[200px] relative">
            <img
              className="h-[100%] w-[100%] align-middle"
              src={product.imageUrl}
              alt=""
            />
            <div className="cursor-pointer absolute border text-white bottom-5 right-8 h-10 w-35 text-center opacity-0 hover:bg-[#ffffff8c] hover:text-black group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => {
                  if (!user?.uid) {
                    toast.error("Please login first");
                    return;
                  }

                  dispatch(addToCart({ ...product, uid: user.uid }));

                  toast.success("Added To Cart");
                }}
                className="w-full h-full"
              >
                Add to cart
              </button>
            </div>
          </div>

          <div className="flex justify-between">
            <p>{product.name}</p>
            <p>${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(ProductCard);
