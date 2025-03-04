import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import ProductCards from "../shop/ProductCards";
import LoadingSpinner from "../../utils/LoadingSpinner";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Use the Redux hook to fetch all products
  const { data, isLoading, error } = useFetchAllProductsQuery({
    category: categoryName.toLowerCase(),  
    limit: 50,                          
    page: 1,                             
  });

  useEffect(() => {
    
    if (data) {
      const filtered = data.products.filter(
        (product) => product.category === categoryName.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [data, categoryName]);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [categoryName]);

  if (isLoading) return <LoadingSpinner/>;
  if (error) return <div className="text-red-500 p-4">Error: {error.message || "Error fetching products"}</div>;

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header ">
          Products in {categoryName.toUpperCase()}
        </h2>
        <p className="section__subheader">
         Discover a stunning collection of elegant and stylish products to complete your look!
        </p>
      </section>

      {/* Product Cards */}
      <div className="section__container">
        <ProductCards products={filteredProducts} />
      </div>
    </>
  );
};

export default CategoryPage;
