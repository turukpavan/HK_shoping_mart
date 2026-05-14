import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import CheckoutForm from "../../components/checkoutform/CheckoutForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/actions/cartAction";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import {
  selectCartTotal,
  selectUserCartItems,
} from "../../redux/selectors/cartSelectors";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectUserCartItems);
  const dispatch = useDispatch();
  const totalPrice = useSelector(selectCartTotal);
  const user = useSelector((state) => state.Users.userData);

  if (cartItems.length === 0) {
    return (
      <div className=" w-full min-h-[80vh] flex flex-col items-center justify-center gap-5">
        <div>
          <RemoveShoppingCartIcon sx={{ fontSize: 150 }} />
          <h1 className="uppercase font-bold mt-10">Your Cart is Empty!</h1>
        </div>
        <Button
          onClick={() => navigate("/categories")}
          className="w-[200px]"
          type="button"
          bg="bg-blue-500"
        >
          Shop Now
        </Button>
      </div>
    );
  }

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
              <button
                onClick={() =>
                  dispatch(decreaseQuantity({ id: item.id, uid: user.uid }))
                }
                className="cursor-pointer w-8 h-8 flex items-center justify-center border rounded-full text-lg hover:bg-gray-200 transition"
              >
                −
              </button>

              <span className="px-2">{item.quantity}</span>

              <button
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
              </button>
            </div>

            {/* price */}
            <p className="text-center">${item.price}</p>

            {/* remove */}
            <div
              onClick={() =>
                dispatch(removeFromCart({ id: item.id, uid: user.uid }))
              }
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
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={totalPrice} />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
