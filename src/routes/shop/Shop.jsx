import React, { useEffect, useMemo, useState } from "react";
import { SHOP_DATA } from "../../db/shopData";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/ProductCard";
const Shop = () => {
  const { category } = useParams();

  const products = useMemo(() => {
    return SHOP_DATA.find(
      (data) => data.title.toLowerCase() === category.toLowerCase(),
    );
  }, [category]);

  return (
    <div>
      <h1 className="text-center uppercase text-2xl my-5">{products.title}</h1>

      <ProductCard products={products} />
    </div>
  );
};

export default Shop;
