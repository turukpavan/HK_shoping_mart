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
import { clearCart } from "../../redux/actions/cartAction";

const CheckoutForm = ({ amount }) => {
  const userData = useSelector((state) => state.Users.userData);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePay = useCallback(async () => {
    if (loading) return;

    if (!userData?.uid) {
      toast.error("Please login to continue");
      return;
    }

    if (!stripe || !elements) {
      toast.error("Stripe is not ready");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "/.netlify/functions/createPaymentIntent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data?.paymentIntent?.client_secret) {
        console.error("Payment Intent Error:", data);
        toast.error(
          data?.message || "Failed to create payment intent"
        );
        return;
      }

      const cardElement =
        elements?.getElement(CardNumberElement);

      if (!cardElement) {
        toast.error("Card details not found");
        return;
      }

      const result = await stripe.confirmCardPayment(
        data.paymentIntent.client_secret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: userData?.name || "Guest",
            },
          },
        }
      );

      if (result?.error) {
        toast.error(result.error.message);
      } else if (
        result?.paymentIntent?.status === "succeeded"
      ) {
        dispatch(clearCart());
        toast.success("Payment Successful");
      }
    } catch (error) {
      toast.error(error?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  }, [stripe, elements, amount, userData, dispatch, loading]);

  return (
    <div className="w-full max-w-md p-5 border rounded">
      <h2 className="text-xl font-bold mb-4">
        Credit Card Payment
      </h2>

      <div className="border p-2 mb-2">
        <CardNumberElement />
      </div>

      <div className="flex gap-2">
        <div className="border p-2 w-1/2">
          <CardExpiryElement />
        </div>
        <div className="border p-2 w-1/2">
          <CardCvcElement />
        </div>
      </div>

      <button
        onClick={handlePay}
        disabled={!stripe || loading}
        className={`w-full mt-4 py-2 text-white rounded transition ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-black"
        }`}
      >
        {loading ? "Processing..." : "PAY NOW"}
      </button>
    </div>
  );
};

export default CheckoutForm;