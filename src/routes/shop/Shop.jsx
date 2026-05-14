import { SHOP_DATA } from "../../db/shopData";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/productCard/ProductCard";
const Shop = () => {
  const { category } = useParams();

  const products =() => {
    return SHOP_DATA.find(
      (data) => data.title.toLowerCase() === category?.toLowerCase(),
    );
  };

  if (!products) {
  return (
    <h1 className="text-center mt-10 text-2xl">
      Category not found
    </h1>
  );
}

  return (
    <div>
      <h1 className="text-center uppercase text-2xl my-5">{products.title}</h1>

      <ProductCard products={products} />
    </div>
  );
};

export default Shop;
