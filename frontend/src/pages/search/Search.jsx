import { useState } from "react";
import productsData from "../../data/products.json";
import ProductCards from "../shop/ProductCards";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const handleSearch = (query) => {
    setFilteredProducts(
      productsData.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header ">Search for Products</h2>
        <p className="section__subheader">
          Find exactly what you're looking for! Browse through our wide
          selection of fashion, beauty, and lifestyle products with ease.
        </p>
      </section>
      <section className="section__container">
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            className="search-bar w-full max-w-4xl p-2 border rounded"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
          />
          <button
            className="search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded"
            onClick={() => handleSearch(searchQuery)}
          >
            Search
          </button>
        </div>
        {/* Check if there are no products */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products match your search. Please try again.
          </p>
        ) : (
          <ProductCards products={filteredProducts} />
        )}
      </section>
    </>
  );
};

export default Search;
