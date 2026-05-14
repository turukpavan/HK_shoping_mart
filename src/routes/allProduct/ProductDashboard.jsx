import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchproduct, setSearchProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://fakeapi.net/products?page=2&limit=10",
      );

      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Search Products on click
  const handleSearch = async () => {
    try {
      const filteredProducts = await axios.get(
        `https://fakeapi.net/products?search=${searchproduct}`,
      );

      setProducts(filteredProducts?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // handle debouncedSearch
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchproduct);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchproduct]);

  // fetch Search products
  useEffect(() => {
    const fetchSearchedProducts = async () => {
      try {
        // Empty search -> default products
        if (!debouncedSearch.trim()) {
          fetchProducts();
          return;
        }

        const response = await axios.get(
          `https://fakeapi.net/products?search=${debouncedSearch}`,
        );

        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSearchedProducts();
  }, [debouncedSearch]);

  // Filter By Category
  const handleCategoryFilter = async (category) => {
    setSelectedCategory(category);

    try {
      const response = await axios.get(
        `https://fakeapi.net/products?page=1&limit=10&category=${category}`,
      );

      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://fakeapi.net/products/categories",
        );

        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      {/* Search */}
      <div className="flex justify-between items-center px-3 md:px-10 mt-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
        >
          {showFilters ? <CloseIcon /> : <FilterListIcon />}
          {showFilters ? "Close" : "Filters"}
        </button>

        {/* Search Box */}
        <div className="w-[220px] sm:w-[300px] md:w-[400px] h-10 rounded overflow-hidden border border-gray-300 relative">
          <input
            value={searchproduct}
            onChange={(e) => setSearchProduct(e.target.value)}
            className="w-full h-full ps-4 pe-12 outline-none"
            placeholder="Search for products"
            type="text"
          />

          <button
            onClick={handleSearch}
            className="absolute top-1 right-2 text-gray-500"
          >
            <SearchIcon sx={{ fontSize: 30 }} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3 p-3">
        {/* Sidebar */}
        <section
          className={`
            col-span-12 md:col-span-3 lg:col-span-2
            border border-gray-300 rounded p-3 bg-white
            ${showFilters ? "block" : "hidden"}
            md:block
          `}
        >
          <h1 className="uppercase font-semibold border-b pb-2">Categories</h1>

          <div className="mt-4 space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="radio"
                  id={category}
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryFilter(category)}
                  className="h-4 w-4 accent-black"
                />

                <label
                  htmlFor={category}
                  className="ps-3 uppercase text-sm text-gray-700 cursor-pointer"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section
          className="
            col-span-12 md:col-span-9 lg:col-span-10
            border border-gray-300 rounded p-4
          "
        >
          <div
            className="
              grid grid-cols-1
              justify-items-center
              sm:grid-cols-2
              md:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-8
            "
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="
                  w-[220px]
                  shadow-lg
                  rounded-lg
                  overflow-hidden
                  relative
                  group
                  bg-white
                  transition-all
                  duration-300
                  hover:scale-105
                "
              >
                {/* Product Image */}
                <div className="h-[180px] flex justify-center items-center p-4 bg-gray-50">
                  <img
                    className="h-full object-contain"
                    src={product.image}
                    alt={product.title}
                  />
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h2 className="font-bold line-clamp-1 text-sm">
                    {product.title}
                  </h2>

                  <p className="text-gray-500 text-sm line-clamp-2 mt-1">
                    {product.description}
                  </p>

                  <p className="text-gray-500 text-sm mt-2">
                    Brand:
                    <span className="font-medium text-black ms-1">
                      {product.brand}
                    </span>
                  </p>

                  <p className="font-bold text-lg mt-3">₹ {product.price}</p>
                </div>

                {/* Hover Button */}
                <div
                  className="
                    absolute bottom-0 left-0 w-full
                    translate-y-full
                    group-hover:translate-y-0
                    transition-all duration-300
                  "
                >
                  <button className="w-full bg-black text-white py-3 hover:bg-gray-800">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductDashboard;
