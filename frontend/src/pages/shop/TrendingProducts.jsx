/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ProductCards from "./ProductCards";
import products from "../../data/products.json";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(6); 

  const handleLoadMore = () => {
    setVisibleProducts((prevState) => prevState + 2);
  };

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit,
        cupiditate!
      </p>
      {/* Product Cards */}
      <div className="mt-12">
        <ProductCards products={products.slice(0, visibleProducts)} />
      </div>
      {/* btn */}
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
