import React from "react";
import { Route, Routes } from "react-router-dom";
import Checkout from "./routes/checkout/Checkout";
// import CartContext from "./context/cartContext/CartContext";
import Header from "./components/Header/Header";
import CategoriesPreview from "./routes/categories-preview/CategoriesPreview";
import Shop from "./routes/shop/Shop";
import Home from "./routes/Home/Home";
import ProtectedRoute from "./routes/protectedRoute/ProtectedRoute ";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";

const App = () => {

  

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  return (
    <div>

      {/* <UserProvider> */}
        {/* <CartContext> */}
          <Header />
      <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/categories" element={<CategoriesPreview />} />
              <Route path="categories/shop/:category" element={<Shop />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
          </Routes>
            </Elements>
        {/* </CartContext> */}
      {/* </UserProvider> */}

    </div>
  );
};

export default App;
