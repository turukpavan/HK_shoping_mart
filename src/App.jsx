import { Route, Routes } from "react-router-dom";
import Checkout from "./routes/checkout/Checkout";
import Shop from "./routes/shop/Shop";
import Home from "./routes/Home/Home";
import ProtectedRoute from "./routes/protectedRoute/ProtectedRoute ";
import { Toaster } from "react-hot-toast";
import ProductDashboard from "./routes/Allproduct/ProductDashboard";
import CategoriesPreview from "./routes/categoriesPreview/CategoriesPreview";
import MainLayout from "./layout/MainLayout";

const App = () => {
  return (
    <div>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute />}>
            <Route path="/categories" element={<CategoriesPreview />} />
            <Route path="categories/shop/:category" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products" element={<ProductDashboard />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
