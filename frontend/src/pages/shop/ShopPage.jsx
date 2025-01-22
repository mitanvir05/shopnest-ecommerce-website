import { useEffect, useState } from "react";
import productsData from "../../data/products.json";
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";
const filters = {
  categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  colors: ["all", "red", "green", "black", "blue"],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $10", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 and Above", min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const [products, setProducts] = useState(productsData);
  const [filtersState, setFiltersState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });
  //   filtering function
  const applyFilters = () => {
    let filteredProducts = productsData;
  
    // Filter by category
    if (filtersState.category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filtersState.category
      );
    }
  
    // Filter by color
    if (filtersState.color !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.color === filtersState.color
      );
    }
  
    // Filter by price range
    if (filtersState.priceRange) {
      const [min, max] = filtersState.priceRange.split("-").map(Number); // Parse min and max
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= min && product.price <= max
      );
    }
  
    setProducts(filteredProducts);
  };
  
  useEffect(() => {
    applyFilters();
  }, [filtersState]);

  //   handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltersState({ ...filtersState, [name]: value });
    applyFilters();
  };

  useEffect(() => {
    applyFilters();
  }, [filtersState]);
  //   clear filter
  const clearFilters = () => {
    setFiltersState({
      category: "all",
      color: "all",
      priceRange: "",
    });
    applyFilters();
  };

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header ">Shop Page</h2>
        <p className="section__subheader">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus,
          magni!
        </p>
      </section>
      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-4 gap-8">
          {/* left side */}
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />
          {/* right side */}
          <div>
            <h3 className="text-xl font-medium mb-4 ">
              Available Products :{products.length}
            </h3>
            <ProductCards products={products} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
