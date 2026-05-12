import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";


const CheckoutForm = ({amount}) => {
  const cartItems = useSelector(state=>state.Cart.cartItems);
    const userData = useSelector((state)=>state.Users.userData) ;
    const dispatch = useDispatch()
  
 
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePay = useCallback(async () => {
       try {
    setLoading(true);

    // 1. CREATE PAYMENT INTENT
    const res = await fetch(
      "/.netlify/functions/createPaymentIntent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
        }),
      }
    );

    const data = await res.json();

    // 2. CONFIRM PAYMENT
    const result = await stripe.confirmCardPayment(
      data.paymentIntent.client_secret,
      {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: userData?.name 
          },
        },
      }
    );

    if (result.error) {
      toast.error(result.error)
    } else if (
      result.paymentIntent.status === "succeeded"
    ) {
      dispatch(clearCart());
      toast.success("Payment Successful ");
    }
  } catch (error) {
      toast.error(error.message)
  } finally {
    setLoading(false);
  }
}, [stripe, elements, userData,amount, dispatch]);
 

  return (
    <div className="w-full max-w-md p-5 border rounded">
      <h2 className="text-xl font-bold mb-4">
        Credit Card Payment
      </h2>

      {/* CARD NUMBER */}
      <div className="border p-2 mb-2">
        <CardNumberElement />
      </div>

      {/* EXPIRY + CVC */}
      <div className="flex gap-2">
        <div className="border p-2 w-1/2">
          <CardExpiryElement />
        </div>
        <div className="border p-2 w-1/2">
          <CardCvcElement />
        </div>
      </div>

      {/* PAY BUTTON */}
      <button
        onClick={handlePay}
        disabled={!stripe || loading}
        className="w-full mt-4 bg-black text-white py-2"
      >
        {loading ? "Processing..." : "PAY NOW"}
      </button>
    </div>
  );
};

export default CheckoutForm;