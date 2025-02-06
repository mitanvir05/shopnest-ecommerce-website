import  { useState } from "react";
import ProductCards from "./ProductCards";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);


  const { data: { products = [] } = {}, error, isLoading } = useFetchAllProductsQuery({
    category: "",
    color: "",
    minPrice: "",
    maxPrice: "",
    limit: 50, 
    page: 1,   
  });

  const handleLoadMore = () => {
    setVisibleProducts((prevState) => prevState + 4);
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    const errorMessage =
      "data" in error ? error.data.message : "Error fetching products";
    return <div className="text-red-500 p-4">Error: {errorMessage}</div>;
  }

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader">
        Check out our most popular products of the season!
      </p>

      {/* Product Cards */}
      <div className="mt-12">
        <ProductCards products={products.slice(0, visibleProducts)} />
      </div>

      {/* Load More Button */}
      <div className="product__btn">
        {visibleProducts < products.length && (
          <button className="btn" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
