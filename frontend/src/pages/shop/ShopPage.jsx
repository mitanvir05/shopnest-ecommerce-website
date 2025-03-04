import { useState } from "react";
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import LoadingSpinner from "../../utils/LoadingSpinner";

const filters = {
  categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  colors: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 and Above", min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const [filtersState, setFiltersState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const { category, color, priceRange } = filtersState;

  const [minPrice, maxPrice] = priceRange
    ? priceRange.split("-").map(Number)
    : [NaN, NaN];

  const {
    data: { products = [], totalPages = 1, totalProducts = 0 } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    limit: productsPerPage,
    page: currentPage,
  });

  const clearFilters = () => {
    setFiltersState({
      category: "all",
      color: "all",
      priceRange: "",
    });
    setCurrentPage(1);
  };

  const updateFilters = (newFilters) => {
    setFiltersState(newFilters);
    setCurrentPage(1);
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    const errorMessage =
      "data" in error ? error.data.message : "Error fetching products";
    return <div className="text-red-500 p-4">Error: {errorMessage}</div>;
  }

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header">Shop Page</h2>
        <p className="section__subheader">
          Welcome to our exclusive collection of fashion, accessories, and
          beauty essentials! Browse through a variety of trendy and high-quality
          products, handpicked just for you.
        </p>
      </section>

      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-4 gap-8">
          {/* Left side - Filters */}
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={updateFilters}
            clearFilters={clearFilters}
          />

          {/* Right side - Products & Pagination */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium">
                Available Products: {totalProducts}
              </h3>
              <div className="flex items-center gap-2">
                <label>Show:</label>
                <select
                  value={productsPerPage}
                  onChange={(e) => {
                    setProductsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border rounded p-1"
                >
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="36">36</option>
                </select>
              </div>
            </div>

            <ProductCards products={products} />

            {/* Pagination */}
            {totalProducts > 0 && (
              <div className="mt-6 flex justify-center">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2 disabled:opacity-50"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    className={`px-4 py-2 mx-1 ${
                      currentPage === index + 1
                        ? "text-white bg-blue-500"
                        : "bg-gray-300 text-gray-700"
                    } rounded-md`}
                    onClick={() => setCurrentPage(index + 1)}
                    aria-label={`Page ${index + 1}`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2 disabled:opacity-50"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
